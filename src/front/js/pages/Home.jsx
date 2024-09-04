import React, { useState, useContext } from "react";
import '../../styles/home.css';
import Logo from "../../img/icoLogin.svg";
import { Link, useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
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

export const Home = () => {
  const { store, actions } = useContext(Context); // Usa el contexto de Flux
  const [email, setEmail] = useState(""); // Estado local para el email
  const [password, setPassword] = useState(""); // Estado local para el password
  const navigate = useNavigate(); // Para redirigir después del login
  const particles = generateParticles(800); // ajuste numero de particulas

  // Manejador del formulario de login
  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await actions.logIn(email, password);
    
    if (success) {
      // Redirigir a una página protegida o dashboard si el login fue exitoso
      navigate("/dashboard");
    } else {
      alert("Error al iniciar sesión. Verifica tus credenciales.");
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
      <h3>Welcome to Login Form</h3>

      <div>
        <IoLogInOutline className="Logo" />
      </div>

      <Link to="/Register">
        <button className='btnRegister'>Sign Up</button>
      </Link>
        
      <div className="separator-with-text">
        <span>OR</span>
      </div>

      <div className='form'>
        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
