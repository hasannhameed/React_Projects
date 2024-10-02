import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const ChangePasswordHandler = async (e) => {
    e.preventDefault();
     

    const response = await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDMGEPT6_WQcPUgRPQu-lYfN6dO2K-rEv4',{
      method:'POST',
      body:JSON.stringify({
        requestType:"PASSWORD_RESET",
        email:email,
      })
    })
    
    let data = await response.json();
    if (data.error)return alert(data.error) 
      else{
    alert("please check your email")
    console.log(data);
    navigate('/Login');

    }
  }

  return (
    <div className='ChangePasswordContainer'>
      <div className='ChangePasswordFormWrapper'>
        <img
          className='ChangePasswordImage'
          src='https://www.marcobehler.com/images/guides/undraw_unlock_24mb-d4759622.png'
          alt='Unlock'
        />
        <form className='ChangePasswordForm' onSubmit={ChangePasswordHandler}>
          <h1>Change Password</h1>
          <div className='ChangePasswordInput'>
            <label>Enter email to change password</label>
            <input
              value={email}
              type="email"
              className="input"
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type='submit'>Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
