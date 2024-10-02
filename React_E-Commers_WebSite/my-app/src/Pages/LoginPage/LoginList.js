import React from 'react';
import LoginInfo from './LoginInfo';

const LoginList = (props) => {
  return (
    <ul className=''>
      {props.logins.map((login) => (
        <LoginInfo
          key={login.id}
          name={login.name}
          email={login.email}
          password={login.password}
        />
      ))}
    </ul>
  );
};

export default LoginList;
