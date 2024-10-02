import React from 'react'
import './Headerr.css'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import R from './R.png'




const Header = () => {
  
  
  return (
    <Fragment>
      <header className="header">
      <div className="nav-linksss">
        <Link to="/Home" className="nav-link"><h5>HOME</h5></Link>
        <Link to="/" className="nav-link"><h5>STORE</h5></Link>
        <Link to="/About" className="nav-link"><h5>ABOUT</h5></Link>
      </div>
      </header>
      <div className='main'>
        <h1>The Generics</h1>
      </div>
    <div  className='main-1'>
      <div className='main-2'>
        <button>Get Outer Letest Album</button>
      </div>

      <div className='main-3'>
        <img src={R} alt="" />
      </div>
    </div>
      
    </Fragment>
  )
}

export default Header;
