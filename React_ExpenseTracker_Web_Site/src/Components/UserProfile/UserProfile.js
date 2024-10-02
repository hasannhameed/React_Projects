import React, { Fragment, useState,useEffect } from 'react';
import { auth } from '../Auth/firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './UserProfile.css'

const UserProfile = () => {
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [list, setList] = useState({});
  const user = auth.currentUser;
  const toggle = useSelector((state)=>state.theme.togglethem)

  const handleUserDetail = async (e) => {
    e.preventDefault();

    const obj = {
      name,
      imgUrl
    };
    try {
      const response = await fetch(`https://react-d64f8-default-rtdb.firebaseio.com/user/${user.uid}.json`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('User details updated');
        cancelSubmission()
      } else {
        alert('Failed to update user details');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const displayUserDetails = async () => {
    try {
      const response = await fetch(`https://react-d64f8-default-rtdb.firebaseio.com/user/${user.uid}.json`, {
        method: 'GET'
      });
      if (response.ok) {
        const data = await response.json();
        setList(data || {});
      } else {
        alert('Failed to fetch user details');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const cancelSubmission = () => {
    setName('')
    setImgUrl('')
  }

  const deleteUserdetails = async (key) => {
    try {
      const response = await fetch(`https://react-d64f8-default-rtdb.firebaseio.com/user/${user.uid}/${key}.json`, {
        method: 'DELETE'
      })
      if (response.ok) {
        alert('deleted')
      }
    } catch (error) {
      alert(error.message)
    }
  }
  useEffect(()=>{
    cancelSubmission() 
  },[]) 
  
  

  return (
    <Fragment style={{
      backGroundColor: toggle?'grey': '#f0f0f0',
      color :toggle?'white': 'black'
    }}>
      <nav>
        <div className='strongtext'>
          <h3>Winner never quite, Qutter never win !!!</h3>
        </div>
        <div className='ptext'>
          <p>your profile is 64% completed. A complete profile <br />
            hava higher chance if landing job
            <Link to='User'>Complete now</Link>
          </p>
        </div>

      </nav>
      <hr />
      <div className='UserProfile'>
        <div className='UserDataForm'>
          <button onClick={cancelSubmission}>Cancel</button>
          <form className='UserDataForm' onSubmit={handleUserDetail}>

            <div className='UserDataInput'>
              <img
                src="https://pngimg.com/uploads/github/github_PNG40.png"
                alt="GitHub icon"
                style={{ width: '24px', height: '24px', marginRight: '10px' }}
              />
              <label>Name :</label>
              <input
                value={name}
                type="text"
                placeholder='Full Name'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='UserDataInput'>
              <img src="https://cdn0.iconfinder.com/data/icons/simple-outlines-1/100/Globe-512.png" 
              alt="GitHub icon"
              style={{ width: '24px', height: '24px', marginRight: '10px' }}/>
              <label>Profile Photo URL:</label>
              <input
                value={imgUrl}
                type="url"
                placeholder='Image URL'
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </div>
            <button type='submit'>Update </button>
          </form>
        </div>

        <div className='userInfolist'>
        <button onClick={displayUserDetails}>previous User Details</button>
          <ul>
            {list && Object.keys(list).map(key => (
              <li key={key}>

                <p>Fullname: {list[key].name}</p>
                <p>Profile Photo URL: {list[key].imgUrl}</p>
                <button onClick={() => deleteUserdetails(key)}>delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default UserProfile;
