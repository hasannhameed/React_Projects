import React,{useRef} from 'react';
import './AddLogin.css';
import person from './person.png';
import em from './email.png';
import pass from './password.png';


  function AddLogin(props) {
    const NameRef = useRef('');
    const EmailRef = useRef('');
    const PasswordRef = useRef('');
  
    function submitHandler(event) {
      event.preventDefault();
  
      // could add validation here...
  
      const form = {
        Name: NameRef.current.value,
        Email: EmailRef.current.value,
        Password: PasswordRef.current.value,
      };
  
      props.onAddLogin(form);
    }
  return (
    <div>
    <form onSubmit={submitHandler}>
    <div className="body">
    <div className='containerrr'>
      <div className='headerrr'>
        <div className='text'>SignUp</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={person} alt="Person Icon" />
          <label htmlFor='Name'>Name</label>
          <input type='text' id='name' ref={NameRef} />
        </div>
        <div className='input'>
          <img src={em} alt="Email Icon" />
          <label htmlFor='Email'>Email</label>
          <input type='email' id='email' ref={EmailRef} />
        </div>
        <div className='input'>
          <img src={pass} alt="Password Icon" />
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' ref={PasswordRef} />
        </div>
      </div>
      <div className='forgot-password'>Lost Password <span>Click here</span></div>
      <div className='submit-container'>
        <button className='submit'>Sign Up</button>
        <button className='submit'>Login</button>
      </div>
    </div>
    </div>
    </form>
    </div>
  );
}

export default AddLogin;
