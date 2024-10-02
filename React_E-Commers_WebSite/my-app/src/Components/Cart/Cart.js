import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ size, cart, handleChange }) => {
  const [amount, setAmount] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice += item.amount * item.price;
      });
      setAmount(totalPrice);
    };

    calculateTotalPrice();
  }, [cart]);

  const handleBuy = () => {
    // Handle the buy functionality here, e.g., redirect to checkout or finalize purchase
    console.log('Buying items:', cart);
    alert('Items bought successfully!');
    // Additional logic for checkout or finalizing purchase can be added here
  };

  return (
    <>
      <button className='button' onClick={toggleCart}>
        <span className='icon'>Cart</span>
        <span className='badge'>{size}</span>
      </button>

      {showCart && (
        <div className='cart-overlay'>
          <div className='cart'>
            <header>
              <h2>Your Cart</h2>
              <button className='close-btn' onClick={toggleCart}>Close Cart</button>
            </header>
            <article>
              {cart.map((item) => (
                <div className='cart-box' key={item.id}>
                  <div className='cart_img'>
                    <img src={item.imageUrl} alt={item.title} />
                    <p>{item.title}</p>
                    <span>Rs.{item.price}</span>
                  </div>
                  <div className='cart_controls'>
                    <button onClick={() => handleChange(item.id, "increment")}>+</button>
                    <span>{item.amount}</span>
                    <button onClick={() => handleChange(item.id, "decrement")}>-</button>
                  </div>
                  <div>
                    <button onClick={() => handleChange(item.id, "remove")}>Remove</button>
                  </div>
                </div>
              ))}
              <div className='cart-footer'>
                <span>Total Price</span>
                <span>Rs - {amount}</span>
              </div>
              <button  className='close-btn' onClick={handleBuy}>Buy</button>
            </article>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
