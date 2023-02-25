import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';

import 'simplebar-react/dist/simplebar.min.css';
import logo from './logo.svg';
import './App.css';
import Playground from './Playground';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Playground width height direction>
          {({ height, width }) => (
            <div style={{ width: '200px', height: '200px' }}>
              <SimpleBar style={{ height, width }}>
                {[...Array(50)].map((x, i) => (
                  <p key={i} className="odd">
                    Some content
                  </p>
                ))}
              </SimpleBar>
            </div>
          )}
        </Playground>
      </div>
    );
  }
}

export default App;
