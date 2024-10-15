// Components/ResourceCenter.js
import React from 'react';
import './ResourceCenter.css'; // Ensure you have a CSS file for styling

const ResourceCenter = () => {
  return (
    <div className="resource-center">
      <h1>Resource Center</h1>
      <p>Welcome to the Resource Center. Here you'll find various resources and helpful information to assist you.</p>

      <div className="resource-list">
        <h2>Available Resources:</h2>
        <ul>
          <li>
            <h3>Getting Started</h3>
            <p>Learn the basics of getting started with our platform.</p>
          </li>
          <li>
            <h3>Advanced Tips</h3>
            <p>Explore advanced features and tips for making the most of our platform.</p>
          </li>
          <li>
            <h3>Troubleshooting</h3>
            <p>Find solutions to common issues and troubleshooting steps.</p>
          </li>
          <li>
            <h3>FAQs</h3>
            <p>Find answers to frequently asked questions.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResourceCenter;


