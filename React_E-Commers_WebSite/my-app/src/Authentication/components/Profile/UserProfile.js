import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import MainNavigation from '../Layout/MainNavigation';
import { Fragment } from 'react';

const UserProfile = () => {
  return (
    <Fragment >
      <MainNavigation/>
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
    </Fragment>
  );
};

export default UserProfile;
