import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Authentication/Store.js/auth-context';
import Cart from '../Cart/Cart';
import classes from './Header.css';
import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/bed72003a9bc40ab81e804361bda19ea/cart';

const Header = ({ size, cart, setShow, handleChange }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const handleButtonClick = () => {
    axios.get(API_URL)
      .then(response => {
        console.log('Cart items:', response.data);
        setShow(true); // Show the cart after fetching the data
      })
      .catch(error => {
        console.error('There was an error fetching the cart items!', error);
      });
  };

  return (
    <Fragment>
      <header className='header'>
        <div className='nav-links'>
          <Link to="/Home" className="nav-link"><h5>HOME</h5></Link>
          <Link to="/" className="nav-link"><h5>STORE</h5></Link>
          <Link to="/About" className="nav-link"><h5>ABOUT</h5></Link>
        </div>
        <nav className={classes.header}>
          <ul>
            {!isLoggedIn && (
              <li>
                <Link to="/Login" className="nav-link"><h5>Login</h5></Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to='/profile' className="nav-link"><h5>Profile</h5></Link>
              </li>
            )}
          </ul>
        </nav>
        <button onClick={handleButtonClick} className='cart-button'>
          <Cart size={size} cart={cart} handleChange={handleChange} />
        </button>
      </header>
      <div className='main'>
        <h1>The Generics</h1>
      </div>
    </Fragment>
  );
};

export default Header;
