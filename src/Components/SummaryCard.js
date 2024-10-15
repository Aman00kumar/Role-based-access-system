import React from 'react';
import PropTypes from 'prop-types';
import './SummaryCard.css';

const SummaryCard = ({ title, value }) => {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default SummaryCard;

