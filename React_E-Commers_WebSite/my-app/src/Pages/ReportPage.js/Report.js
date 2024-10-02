import React, { useRef, useState } from 'react';
import './Report.css'; // Import the CSS file

function Complaint() {
  const requestTypeRef = useRef('');
  const summaryRef = useRef('');
  const descriptionRef = useRef('');
  const complaintRef = useRef('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  async function submitHandler(event) {
    event.preventDefault();

    const requestType = requestTypeRef.current.value;
    const summary = summaryRef.current.value;
    const description = descriptionRef.current.value;
    const text = complaintRef.current.value;

    if (!requestType || !summary || !description || !text || !image) {
      setMessage('All fields are mandatory.');
      return;
    }

    const complaint = {
      requestType,
      summary,
      description,
      text,
      image: null,
    };

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset
      const imageResponse = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', { // Replace with your Cloudinary URL
        method: 'POST',
        body: formData,
      });

      if (!imageResponse.ok) {
        throw new Error('Failed to upload image.');
      }

      const imageData = await imageResponse.json();
      complaint.image = imageData.secure_url;

      const response = await fetch('https://react-d64f8-default-rtdb.firebaseio.com/complaints.json', {
        method: 'POST',
        body: JSON.stringify(complaint),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint.');
      }

      setMessage('Complaint submitted successfully!');
      requestTypeRef.current.value = '';
      summaryRef.current.value = '';
      descriptionRef.current.value = '';
      complaintRef.current.value = '';
      setImage(null);
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleImageChange(event) {
    setImage(event.target.files[0]);
  }

  return (
    <div className='complaint-container'>
      <div className='complaint-header'>
        <h1>Query Form</h1>
      </div>
      
      <form onSubmit={submitHandler} className='complaint-form'>
        <div className='form-group request-type'>
          <label htmlFor="requestType">Request Type:</label>
          <select id="requestType" ref={requestTypeRef} required>
            <option value="">Select Request Type</option>
            <option value="Report a Bug">Report a Bug</option>
            <option value="Suggest New Feature">Suggest New Feature</option>
            <option value="Licensing and Billing Issue">Licensing and Billing Issue</option>
            <option value="Other Questions">Other Questions</option>
          </select>
        </div>
        <div className='form-group summary'>
          <label htmlFor="summary">Summary:</label>
          <input type="text" id="summary" ref={summaryRef} required />
        </div>
        <div className='form-group description'>
          <label htmlFor="description">Description:</label>
          <textarea id="description" ref={descriptionRef} required></textarea>
        </div>
        <div className='form-group complaint'>
          <label htmlFor="complaint">Complaint:</label>
          <input type="text" id="complaint" ref={complaintRef} required />
        </div>
        <div className='form-group upload-image'>
          <label htmlFor="image">Upload Images:</label>
          <input type="file" id="image" onChange={handleImageChange} required />
        </div>
        <button className='submit-button' type="submit">Submit</button>
      </form>
      {message && <p className='response-message'>{message}</p>}
    </div>
  );
}

export default Complaint;
