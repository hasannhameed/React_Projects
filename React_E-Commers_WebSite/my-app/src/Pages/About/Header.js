import React from 'react'
import './Header.css'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'




const Header = () => {
  
  
  return (
    <Fragment>
      <header className='header'>
        <div className='nav-linkss'>
        <Link to="/Home" className="nav-link"><h5>HOME</h5></Link>
        <Link to="/" className="nav-link"><h5>STORE</h5></Link>
        <Link to="/About" className="nav-link"><h5>ABOUT</h5></Link>
        </div>
      </header>
      <div className='main'>
        <h1>The Generics</h1>
      </div>
    </Fragment>
  )
}

export default Header;
