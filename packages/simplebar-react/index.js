import React from 'react';
import PropTypes from 'prop-types';
import 'simplebar';

export default function SimpleBar({ children, ...options }) {
  return (
    <div data-simplebar {...options}>
      <div className="simplebar-wrapper">
        <div className="simplebar-height-auto-observer-wrapper">
          <div className="simplebar-height-auto-observer"></div>
        </div>
        <div className="simplebar-mask">
          <div className="simplebar-offset">
            <div className="simplebar-content">
              {children}
            </div>
          </div>
        </div>
        <div className="simplebar-placeholder" />
      </div>
      <div className="simplebar-track horizontal">
        <div className="simplebar-scrollbar" />
      </div>
      <div className="simplebar-track vertical">
        <div className="simplebar-scrollbar" />
      </div>
    </div>
  );
}

SimpleBar.propTypes = {
  children: PropTypes.node
};
