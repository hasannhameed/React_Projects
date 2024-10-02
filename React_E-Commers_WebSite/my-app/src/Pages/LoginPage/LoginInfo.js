import React from 'react';

const LoginInfo = (props) => {
  return (
    <li>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <p>{props.password}</p>
    </li>
  );
};

export default LoginInfo;
