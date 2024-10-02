import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMGEPT6_WQcPUgRPQu-lYfN6dO2K-rEv4",{
        method :'POST',
        body :JSON.stringify({
          email:email,
          password:password,
          returnSecureToken: true,
        }),
      }
    );

    if(response.ok){
      alert("Account successfully created.");
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/Login')
    }

    let data = await response.json();

    if(data.error){
      if(data.error.message === "EMAIL_EXIST"){
        alert(data.error.message)
      }
      console.log( data.error.message);
      alert(data.error.message)
    }
    
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='SignInContainer'>
      <div className='SignInFormWrapper'>

        <img 
        src="https://www.marcobehler.com/images/guides/undraw_unlock_24mb-d4759622.png" 
        alt="Unlock" 
        className='SignInImage' 
        />


        <form className='SignInForm' onSubmit={handleSubmitForm}>
          <h1>Sign Up</h1>
          <div className='SignIninput'>
            <label>Email:</label>
            <input
              type="email"
              className='input'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='SignIninput'>
            <label>Password:</label>
            <input
              type="password"
              className='input'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='SignIninput'>
            <label>Confirm Password:</label>
            <input
              type="password"
              className='input'
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <button type='submit'>Sign Up</button>
          <p>Already have an account? <Link to="/Login">Login here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
