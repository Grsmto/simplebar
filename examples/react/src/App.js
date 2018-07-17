import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import logo from './logo.svg';
import './App.css';

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
        <SimpleBar style={{ height: '300px' }}>
          {[...Array(50)].map((x, i) =>
            <p key={i} className="odd">Some content</p>
          )}
        </SimpleBar>
      </div>
    );
  }
}

export default App;
