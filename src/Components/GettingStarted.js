import React from 'react';
import './GettingStarted.css'; // Import a CSS file for styling (if needed)

const GettingStarted = () => {
  
  return (
    <div className="getting-started-container">
      <h1>Getting Started</h1>
      <p>Welcome to the Getting Started guide! Here, you will find all the essential information to help you begin using our application effectively.</p>

      <section>
        <h2>Overview</h2>
        <p>Our application provides a range of features designed to make your experience smooth and efficient. In this section, you’ll learn the basics of how to use the key features.</p>
      </section>

      <section>
        <h2>Setup Instructions</h2>
        <p>Follow these steps to get up and running:</p>
        <ol>
          <li>Download and install the application.</li>
          <li>Configure your settings as per the instructions provided in the setup wizard.</li>
          <li>Explore the main dashboard and familiarize yourself with the available tools.</li>
        </ol>
      </section>

      <section>
        <h2>Quick Tips</h2>
        <ul>
          <li>Use the search bar to quickly find what you need.</li>
          <li>Check out our tutorials for a deeper dive into specific features.</li>
          <li>Don’t hesitate to reach out to support if you have any questions.</li>
        </ul>
      </section>

      <section>
        <h2>Resources</h2>
        <p>For more detailed information, visit our <a href="/documentation/overview">Documentation</a> or check out our <a href="/guides/advanced-tips">Advanced Tips</a>.</p>
      </section>
    </div>
  );
};

export default GettingStarted;
