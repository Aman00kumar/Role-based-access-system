import React from 'react';
import './FAQs.css'; // Import the CSS file for styling

const FAQs = () => {
  return (
    <div className="faqs-container">
      <h1>Frequently Asked Questions (FAQs)</h1>

      <section className="faq-section">
        <h2>General Questions</h2>
        <div className="faq-item">
          <h3>What is the purpose of this application?</h3>
          <p>
            This application is designed to help manage and track various forms and
            provide role-based dashboards for different user roles such as employees,
            managers, supervisors, and superadmins.
          </p>
        </div>
        <div className="faq-item">
          <h3>How do I reset my password?</h3>
          <p>
            To reset your password, click on the "Forgot Password" link on the login
            page and follow the instructions provided.
          </p>
        </div>
      </section>

      <section className="faq-section">
        <h2>Technical Support</h2>
        <div className="faq-item">
          <h3>How do I report a bug?</h3>
          <p>
            You can report bugs by navigating to the "Contact Us" page and submitting
            your issue through the provided form.
          </p>
        </div>
        <div className="faq-item">
          <h3>Who can I contact for technical support?</h3>
          <p>
            For technical support, you can reach out to our support team via the "Contact Us"
            page or send an email to support@example.com.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
