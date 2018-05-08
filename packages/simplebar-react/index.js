import React from 'react';
import PropTypes from 'prop-types';
import 'simplebar';

export default function SimpleBar({ children, ...options }) {
  return (
    <div data-simplebar {...options}>
      <div className="simplebar-scroll-content">
        <div className="simplebar-content">
          {children}
        </div>
      </div>
    </div>
  )
}

SimpleBar.propTypes = {
  children: PropTypes.node
};