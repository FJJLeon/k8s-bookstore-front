import React, { Component } from 'react';
import logo from './logo.svg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h1 className="Home-title">Welcome to React</h1>
        </header>
        <div className="container">
          <div className="center">
              <div className="wrap">
              main
              </div>
          </div>
          <div className="left">
            left
          </div>
          <div className="right">
            right
          </div>
        </div>
      </div>
    );
  }
}


export default Home;