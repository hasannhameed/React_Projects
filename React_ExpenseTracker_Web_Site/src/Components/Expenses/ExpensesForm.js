import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './ExpensesForm.css';


const ExpensesForm = ({ isEditing, setIsEditing }) => {
  const [expenses, setExpenses] = useState('');
  const [discription, setDiscription] = useState('');
  const [category, setCategory] = useState('Food');
  const toggle = useSelector((state)=>state.theme.toggletheme);


  useEffect(() => {
    if (isEditing) {
      setExpenses(isEditing.expenses);
      setDiscription(isEditing.discription);
      setCategory(isEditing.category);
    }
  }, [isEditing]);
  const updateExpenseHandler = async (expenseObj) => {
    try {
      const response = await fetch(`https://react-d64f8-default-rtdb.firebaseio.com/newExpenses/${isEditing.key}.json`, {
        method: 'PUT',
        body: JSON.stringify(expenseObj),
      });

      if (response.ok) {
        alert('Expenses Updated');
        clearForm();
      }
    }
    catch (error) {
      alert(error.message);
    }
  };

  const addExpenseHandler = async (expenseObj) => {
    try {
      const response = await fetch('https://react-d64f8-default-rtdb.firebaseio.com/newExpenses.json', {
        method: 'POST',
        body: JSON.stringify(expenseObj),
      });


      if (response.ok) {
        alert('Expenses added successfully');
        clearForm();

      }
    }

    catch (error) {
      alert(error.message);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const expenseObj = {
      expenses,
      discription,
      category,
    };

    if (isEditing) {
      updateExpenseHandler(expenseObj);
    } else {
      addExpenseHandler(expenseObj);
    }
  };

  const clearForm = () => {
    setExpenses('');
    setDiscription('');
    setCategory('Food');
    setIsEditing(null);
  };

  return (
    <div  style={{
      backgroundColor: toggle ? 'grey' : '#f0f0f0',
      color: toggle ? 'white' : 'black'
    }}>
      <form className='ExpensesForm' onSubmit={handleFormSubmit}>


        <div className='ExpensesFormInput'>
          <label>Money spent</label>
          <input
          required
            type='number'
            placeholder='Enter Amount'
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
        </div>


        <div className='ExpensesFormInput'>
          <label>Description</label>
          <input
           required
            type='text'
            placeholder='Enter Description'
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
        </div>


        <div className='ExpensesFormInput'>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
             required>
            <option value='food'>Food</option>
            <option value='petrol'>Petrol</option>
            <option value='salary'>Salary</option>
            <option value='utilities'>Utilities</option>
          </select>
        </div>


        <button type='submit'>{isEditing ? 'Update' : 'Add Expense'}</button>
        {isEditing && <button type='button' onClick={clearForm}>Cancel</button>}


      </form>
    </div>
  );
};

export default ExpensesForm;
