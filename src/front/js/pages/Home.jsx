import { useState } from 'react'

import viteLogo from '/vite.svg'
import '../../styles/home.css'
import Logo from "../../img/icoLogin.svg"
import {Link} from "react-router-dom";

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
  const particles = generateParticles(800); //ajuste numero de particulas

  return (
    <div className="container">
      {particles.map((particle, index) => (
        <div 
          key={index} 
          className="particles" 
          style={{ top: particle.top, left: particle.left, right: particle.right }}
        ></div>
      ))}
      <h3>Welcome to Login Form</h3>

      <img src={Logo} alt="imgLogo" />

      <Link to="/Register">
        <button className='btnRegister'>Sign Up</button>
      </Link>
        
      

      <div className="separator-with-text">
        <span>OR</span>
      </div>

      <div className='form'>

        <input type="email" placeholder='Email' required/>

        <input type="password" placeholder='Password' required/>

        <button>Login</button>

      </div>
    </div>
  );

}

