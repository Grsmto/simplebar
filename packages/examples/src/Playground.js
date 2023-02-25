import React, { useState } from 'react';

import './Playground.css';

const widthOptions = [
  { value: 'auto', label: 'auto' },
  { value: '100%', label: '100%' },
  { value: '100px', label: '100px' },
];

const heightOptions = [
  { value: 'auto', label: 'auto' },
  { value: '100%', label: '100%' },
  { value: '100px', label: '100px' },
];

const directionOptions = [
  { value: 'ltr', label: 'LTR' },
  { value: 'rtl', label: 'RTL' },
];

const Playground = ({ width, height, direction, children }) => {
  const [state, setState] = useState({
    height: '100%',
    width: '100%',
    direction: 'ltr',
  });

  const onSelectChange = (type) => (e) => {
    setState({
      ...state,
      [type]: e.currentTarget.value,
    });
  };

  return (
    <div className="playground">
      <div className="playground__content">{children(state)}</div>
      <div className="playground__config">
        {width && (
          <div>
            <label>Width:</label>
            <select
              onChange={onSelectChange('width')}
              value={
                widthOptions.find((option) => option.value === state.width)
                  .value
              }
            >
              {widthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {height && (
          <div>
            <label>Height:</label>
            <select
              onChange={onSelectChange('height')}
              value={
                heightOptions.find((option) => option.value === state.height)
                  .value
              }
            >
              {heightOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {direction && (
          <div>
            <label>Direction:</label>
            <select
              onChange={onSelectChange('direction')}
              value={
                directionOptions.find(
                  (option) => option.value === state.direction
                ).value
              }
            >
              {directionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playground;
