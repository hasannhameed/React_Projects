import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';

const Cards = ({ item, handleClick }) => {
  const { id, title, price, imageUrl, quantity } = item;

  return (
    <div className='cards'>
      <div>
        {/* Wrap the image with Link to navigate to product detail page when clicked */}
        <Link to={`/product/${id}`} state={{ item }}>
          <img src={imageUrl} alt={title} />
        </Link>
      </div>
      <section>
        <p className="title">{title}</p>
        <p className="price">Rs.{price}</p>
        <p className="quantity">Quantity: {quantity}</p>
        <button onClick={() => handleClick(item)}>Add to Cart</button>
      </section>
    </div>
  );
};

export default Cards;
