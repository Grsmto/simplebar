import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
        <div class="bar-container">
          <SimpleBar style={{ height: '320px' }}>
          {[...Array(50)].map((x, i) =>
            <p key={i} className="odd">This side bar is perfect</p>
          )}
        </SimpleBar>
        </div>

        const Tab = createBottomTabNavigator();
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen className= "TabNavigator" style={screen} name="Profile" component={Profile}/>
          </Tab.Navigator>
        </NavigationContainer>
        
      </div>
    );
  }
}

export default App;
