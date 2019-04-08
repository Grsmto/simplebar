import React from 'react';
import Select from 'react-select';

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
              options={[
                { value: 'auto', label: 'auto' },
                { value: '100%', label: '100%' },
                { value: '100px', label: '100px' }
              ]}
              value={this.state.width}
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
              options={[
                { value: 'auto', label: 'auto' },
                { value: '100%', label: '100%' },
                { value: '100px', label: '100px' }
              ]}
              value={this.state.height}
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
              options={[
                { value: 'ltr', label: 'LTR' },
                { value: 'rtl', label: 'RTL' }
              ]}
              value={this.state.direction}
            />
          </div>
        )}
      </div>
    );
  }
}
