import React from 'react';
import './Home.css'; // Import a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Application!</h1>
      <p className="intro">
        This is the central hub of our application. From here, you can navigate to different sections of the app, stay updated with the latest news, and access resources to help you get the most out of your experience.
      </p>
      
      <div className="section">
        <h2>Application Overview</h2>
        <ul className="feature-list">
          <li>Access your personalized dashboard</li>
          <li>Manage and view reports</li>
          <li>Submit and track forms</li>
          <li>And much more...</li>
        </ul>
      </div>
      
      <div className="section">
        <h2>What's New</h2>
        <p>Check out the latest updates and features added to the application.</p>
        <ul className="updates-list">
          <li>New reporting module launched</li>
          <li>Improved dashboard analytics</li>
          <li>Upcoming webinar on using new features</li>
        </ul>
      </div>
      
      <div className="section">
        <h2>Quick Links</h2>
        <ul className="quick-links">
          <li><a href="/dashboard">Go to My Dashboard</a></li>
          <li><a href ="/manageforms">Manage Forms</a></li>
<li><a href ="/reportshome">View Reports</a></li>

           
          
          <li><a href="/help">Help & Support</a></li>
        </ul>
      </div>
       
      <div className="section">
        <h2>Resource Center</h2>
        <p>Need help? Visit our resource center for guides and FAQs.</p>
        <a className="resource-link" href="/resources">Go to Resource Center</a>
      </div>
      
      <div className="section">
        <h2>Today's Inspiration</h2>
        <p className="quote">"The only way to do great work is to love what you do." - Steve Jobs</p>
      </div>
    </div>
  );
};

export default Home;


