import React, { useState, useContext } from "react";
import '../../styles/home.css';
import LogoRegister from "../../img/icoRegister.svg";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Importa el contexto para usar el store

const generateParticles = (numParticles) => {
    const particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
        });
    }
    return particles;
}

export const Register = () => {
    const { store, actions } = useContext(Context); // Conecta el componente al store
    const [email, setEmail] = useState(""); // Estado local para el email
    const [password, setPassword] = useState(""); // Estado local para el password
    const [isActive, setIsActive] = useState(true); // Estado para el is_active (puedes cambiar según tu lógica)
    const navigate = useNavigate(); // Para redirigir después del registro
    const particles = generateParticles(800);

    // Manejador para el formulario de registro
    const handleRegister = async (e) => {
        e.preventDefault();
        const success = await actions.signUp(email, password, isActive);

        if (success) {
            // Mostrar un alert si el registro fue exitoso
            alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
            // Redirigir a la página de login después de registrarse
            navigate("/");
        } else {
            // Mostrar un alert en caso de error
            alert("Error al crear la cuenta. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="container">
            {particles.map((particle, index) => (
                <div
                    key={index}
                    className="particles"
                    style={{ top: particle.top, left: particle.left }}
                ></div>
            ))}
            <h3>Welcome to Sign Up Form</h3>

            <img src={LogoRegister} alt="imgLogo" />

            <div className="separator-with-text">
                <Link to="/">Go Login</Link>
            </div>

            <div className='form'>
                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
}
