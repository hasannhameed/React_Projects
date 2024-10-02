import React from 'react';
import ExpensesList from './ExpensesList';
import { useSelector, useDispatch } from 'react-redux';
import './Expenses.css';
import Logout from '../Auth/Logout';
import { Link } from 'react-router-dom';
import { toggleAction } from '../../Redux/ThemsSlicer';

const Expenses = () => {
  const toggle = useSelector((state) => state.theme.toggletheme);
  const dispatch = useDispatch();
  return (
    <>
      <nav className='navbar'>
        <h3>Welcome to the Expense Tracker!!!</h3>
        <div>
          <p className="pclass">
            Your profile is incomplete <Link to="/User">Complete Now</Link>
          </p>
          <Logout />
        </div>
      </nav>
      <hr />
      <div
        className='Expenses'
        style={{
          backgroundColor: toggle ? 'grey' : '#f0f0f0',
          color: toggle ? 'white' : 'black',
        }}
      >
        <button onClick={() => dispatch(toggleAction.toggle())}>Change Theme</button>
        <h1>Track Your Expense</h1>
        <ExpensesList />
      </div>
    </>
  );
};

export default Expenses;
