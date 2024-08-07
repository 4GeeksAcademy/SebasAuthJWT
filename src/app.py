"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db,User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "HiperSecret"  # ¡Cambia las palabras "super-secret" por otra cosa!
jwt = JWTManager(app)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api)

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify({'users': 'hola'}), 200



@app.route('/signup', methods=['POST'])
def create_users():
    request_body = request.json
    user_query = User.query.filter_by(email = request_body["email"], password = request_body["password"], is_active = request_body["is_active"]).first()
    if user_query is None:
        create_user = User(email = request_body["email"], password = request_body["password"], is_active = request_body["is_active"])
        db.session.add(create_user)
        db.session.commit()
        return jsonify({"msg": "User created successfuly"}),200
    else:
        return jsonify({"msg": "User already exist"}),404

@app.route('/login', methods=['POST'])
def login_users():
    request_body = request.json
    email = request_body.get("email")
    password = request_body.get("password")
    user_login = User.query.filter_by(email = email).first()
    if user_login is None:
        return jsonify({"msg": "User doesnt exists"}),404
    elif password != user_login.password:
        return jsonify({"msg":"Password incorrect"}),404
    else:
        access_token = create_access_token(identity = user_login.id)
        return jsonify({"token": access_token})



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
