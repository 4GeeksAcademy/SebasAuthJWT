import React from "react"
import '../App.css'
import LogoRegister from "../assets/icoRegister.svg"
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

const Register = () =>{
    const particles = generateParticles(800);
    

    return(
        <div className="container">
      {particles.map((particle, index) => (
        <div 
          key={index} 
          className="particles" 
          style={{ top: particle.top, left: particle.left, right: particle.right }}
        ></div>
      ))}
      <h3>Welcome to Sign Up Form</h3>

      <img src={LogoRegister} alt="imgLogo" />
        
      

      <div className="separator-with-text">
        <span>Sign Up</span>
      </div>

      <div className='form'>

        <input type="text" placeholder='Name' required/>

        <input type="email" placeholder='Email' required/>

        <input type="password" placeholder='Password' required/>

        <Link to="/">
            <button>Create Account</button>
        </Link>
        
      </div>
      
    </div>
    );

}

export default Register