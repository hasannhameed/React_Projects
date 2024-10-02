import React from 'react'
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../../Redux/authSlicer';
import { useDispatch } from 'react-redux';
import './Logout.css'


const Logout = () => {
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const handleLagout= async (e)=>{
        e.preventDefault();
        try{
           await auth.signOut();
           alert("lagout success")
           dispatch(authAction.logout())
           navigate('/');
        }catch(error){
            alert(error.message)
        }
    }
  return (
    <div className='logoutbutton'>
      <button onClick={handleLagout}>Lagout</button>
    </div>
  )
}

export default Logout
