import React, { useState } from 'react';
import './HelpAndSupport.css'; // Import a CSS file for styling

const HelpAndSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/submit-help-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form fields
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="help-support-container">
      <h1>Help & Support</h1>

      <div className="section">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul className="faq-list">
          <li>
            <h3>How do I reset my password?</h3>
            <p>To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions.</p>
          </li>
          <li>
            <h3>How do I contact support?</h3>
            <p>You can contact our support team by filling out the contact form below or emailing us at support@example.com.</p>
          </li>
          <li>
            <h3>How do I update my profile information?</h3>
            <p>To update your profile information, go to the 'Profile' section in your account settings.</p>
          </li>
          {/* Add more FAQs as needed */}
        </ul>
      </div>

      <div className="section">
        <h2>Contact Support</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4" 
            value={formData.message} 
            onChange={handleChange} 
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>

      <div className="section">
        <h2>Resource Center</h2>
        <p>For additional resources and documentation, visit our <a href="/resources">Resource Center</a>.</p>
      </div>
    </div>
  );
};

export default HelpAndSupport;


