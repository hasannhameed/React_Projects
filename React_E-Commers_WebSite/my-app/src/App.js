import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/bed72003a9bc40ab81e804361bda19ea';

function App() {
  const [cart, setCart] = useState([]);

  const handleClick = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) {
        isPresent = true;
      }
    });
    if (isPresent) {
      alert("Item already added");
      return;
    }
    const newItem = { ...item, amount: 1 };
    setCart([...cart, newItem]);

    axios.post(`${API_URL}/cart`, newItem)
      .then(response => {
        console.log('Item added to cart:', response.data);
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
      });
  };

  const handleChange = (id, action) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, amount: action === "increment" ? cartItem.amount + 1 : cartItem.amount - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.amount > 0)
    );

    const updatedItem = cart.find(cartItem => cartItem.id === id);
    const newAmount = action === "increment" ? updatedItem.amount + 1 : updatedItem.amount - 1;

    if (newAmount <= 0) {
      axios.delete(`${API_URL}/cart/${id}`)
        .then(response => {
          console.log('Item deleted from cart:', response.data);
        })
        .catch(error => {
          console.error('There was an error deleting the item!', error);
        });
    } else {
      axios.post(`${API_URL}/cart/${id}`, { ...updatedItem, amount: newAmount })
        .then(response => {
          console.log('Cart item updated:', response.data);
        })
        .catch(error => {
          console.error('There was an error updating the item!', error);
        });
    }
  };

  return (
    <>
      <Header size={cart.length} cart={cart} setShow={() => {}} handleChange={handleChange} />
      <Body handleClick={handleClick} />
      <Footer />
    </>
  );
}

export default App;
