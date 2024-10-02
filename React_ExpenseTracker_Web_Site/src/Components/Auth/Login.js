import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAction } from '../../Redux/authSlicer';
import { useDispatch} from 'react-redux';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMGEPT6_WQcPUgRPQu-lYfN6dO2K-rEv4",{
        method :'POST',
        body:JSON.stringify({
          email:email,
          password:password,
          returnSecureToken: true,
        }),
      }
    );
    let data = await response.json();
    if(data.error) return console.log(data.error);
    else{
      console.log(data);
      dispatch(authAction.login());
    }
        alert("User login successful");
        navigate('/Expenses');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='LoginPage'>
      <div className='LoginContent'>
        
         <img 
          className='LoginImage' 
          src='https://www.marcobehler.com/images/guides/undraw_unlock_24mb-d4759622.png' 
          alt='Unlock'
        />
        <form className='LoginFormWrapper' onSubmit={handleLoginSubmit}>
        <h1>LogIn</h1>
          <div className='loginClass'>
            <label>Email</label>
            <input 
              type="email"
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='loginClass'>
            <label>Password</label>
            <input
              type="password"
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p> <Link to='/ChangePassword'>Forgot password</Link></p>
          <button type='submit'>Login</button>
          <p>Don't have an account? <Link to="/">SignUp here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
