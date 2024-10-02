import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../About/Header';
import './Product.css';
import AuthContext from '../../Authentication/Store.js/auth-context';

const Product = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const { isLoggedIn } = useContext(AuthContext); // Get the isLoggedIn state from AuthContext
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (item) {
      fetchComments(item.id);
    }
  }, [item]);

  const fetchComments = async (productId) => {
    try {
      const response = await fetch(`https://react-d64f8-default-rtdb.firebaseio.com/comments/${productId}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      if (data) {
        setComments(prevComments => ({
          ...prevComments,
          [productId]: Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }))
        }));
      } else {
        setComments(prevComments => ({
          ...prevComments,
          [productId]: []
        }));
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      alert('Error fetching comments:', error.message);
    }
  };

  const handleCommentSubmit = async (event, productId) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://react-d64f8-default-rtdb.firebaseio.com/comments/${productId}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: productId,
          text: newComment,
          createdAt: new Date().toISOString()
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      setNewComment('');
      fetchComments(productId);
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment:', error.message);
    }
  };


  if (!isLoggedIn) {
    return <h1>You need to login to view this page</h1>;
  }

  if (!item) {
    return <h1>No product data available</h1>;
  }
  const addToCart =(()=>{
      alert("item added");
  })
  return (
    <Fragment>
      <Header />
      <div className="product-page">
        <div className="product-container">
          <img src={item.imageUrl} alt={item.title} className="product-image" />
          <div className="product-details">
            <h2 className="product-title">{item.title}</h2>
            <p className="product-price">Price: Rs.{item.price}</p>
            <p className="product-quantity">Quantity: {item.quantity}</p>
             {/* Button to trigger addToCart function */}
             <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
        <div className="comment-section">
          <h3>Comments</h3>
          <form onSubmit={(e) => handleCommentSubmit(e, item.id)}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a review..."
              required
            />
            <button type="submit">Submit</button>
          </form>
          <ul>
            {comments[item.id] && comments[item.id].map((comment) => (
              <li key={comment.id}>
                <p>{comment.text}</p>
                <p>Posted on: {new Date(comment.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
