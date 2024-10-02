import React, { useEffect } from 'react'
import './ExpensesList.css'
import ExpensesForm from './ExpensesForm'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ExpensesList = () => {
  const [expenses, setExpensesList] = useState({});
  const [isEditing, setIsEditing] = useState(null);
  const toggle = useSelector((state) => state.theme.toggletheme);
  
  const deleteHandle = async (key) => {
    try {
      const response = await fetch(`https://react-d64f8-default-rtdb.firebaseio.com/newExpenses/${key}.json`, {
        method: 'DELETE',
      })
      if (response.ok) {
        alert("deleted Expenses")
        handleExpensesList()
      }
    } catch (error) {
      alert(error.message)
    }

  }
  const handleExpensesList = async () => {
    try {
      const responses = await fetch('https://react-d64f8-default-rtdb.firebaseio.com/newExpenses.json', {
        method: 'GET',
      })
      if (responses.ok) {
        const data = await responses.json();
        setExpensesList(data || {});
      }

    } catch (error) {
      alert(error.message)
    }

  }
  useEffect(() => {
    handleExpensesList()
  }, [])

  const getTotalExpenses = () => {
    let total = 0;

    for (const key in expenses) {
      total += parseFloat(expenses[key].expenses || 0);
    }

    return total
  };

  const DownloadExpenses=()=>{
    const expenseText = Object.keys(expenses).map(key=>{
      return `Amount:${expenses[key].expenses},Description:${expenses[key].discription},Category:${expenses[key].category}`
    }).join('\n')
    const blob = new Blob([expenseText],{type:'text/plain'})
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob)
    link.download = 'expenses.txt';
    link.click();
  }


  return (
    <div className='ExpensesList' style={{
      backgroundColor: toggle ? 'grey' : '#f0f0f0',
      color: toggle ? 'white' : 'black'
    }}>

      <ExpensesForm isEditing={isEditing} setIsEditing={setIsEditing} />
      <ul>
        {Object.keys(expenses).map(key => (
          <h5 key={key}>
            <div id="list">
              <li>Amount: {expenses[key].expenses}</li>
              <li>Description: {expenses[key].discription}</li>
              <li>Category: {expenses[key].category}</li>
            </div>
            <div id='btn'>
              <button onClick={() => deleteHandle(key)}>dalete</button>
              <button onClick={() => setIsEditing({ key, ...expenses[key] })}>Edit</button>
            </div>
          </h5>
        ))}
      </ul>
      <div className='total'>
      <h2>Total Expenses: ${getTotalExpenses()}</h2>
        <button id='btm'  onClick={DownloadExpenses}>Download Expenses</button>
        
      </div>



    </div>
  )
}

export default ExpensesList
