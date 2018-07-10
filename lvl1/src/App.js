import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>LIFEN</h1>
        </div>

        <input type="file"/>
        <button className="uploadFile">Upload</button>
      </div>
    );
  }
}

export default App;
