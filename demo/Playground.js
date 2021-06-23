import React from 'react';
import Select from 'react-select';

const widthOptions = [
  { value: 'auto', label: 'auto' },
  { value: '100%', label: '100%' },
  { value: '100px', label: '100px' }
];

const heightOptions = [
  { value: 'auto', label: 'auto' },
  { value: '100%', label: '100%' },
  { value: '100px', label: '100px' }
];

const directionOptions = [
  { value: 'ltr', label: 'LTR' },
  { value: 'rtl', label: 'RTL' }
];

export default class Playground extends React.PureComponent {
  state = {
    height: '100%',
    width: '100%',
    direction: 'ltr'
  };

  render() {
    const { width, height, direction } = this.props;

    return (
      <div className="playground">
        <div className="playground__content">
          {this.props.children(this.state)}
        </div>
        {width && (
          <div>
            <label>Width:</label>
            <Select
              onChange={option =>
                this.setState({
                  width: option.value
                })
              }
              options={widthOptions}
              value={widthOptions.find(
                option => option.value === this.state.width
              )}
            />
          </div>
        )}
        {height && (
          <div>
            <label>Height:</label>
            <Select
              onChange={option =>
                this.setState({
                  height: option.value
                })
              }
              options={heightOptions}
              value={heightOptions.find(
                option => option.value === this.state.height
              )}
            />
          </div>
        )}
        {direction && (
          <div>
            <label>Direction:</label>
            <Select
              onChange={option =>
                this.setState({
                  direction: option.value
                })
              }
              options={directionOptions}
              value={directionOptions.find(
                option => option.value === this.state.direction
              )}
            />
          </div>
        )}
      </div>
    );
  }
}
