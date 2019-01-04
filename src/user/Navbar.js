import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import "./Navbar.css" ;

class Navbar extends Component {
    static contextTypes = {
        // for router
        router: PropTypes.object
    }

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    handleSignin() {
        alert("Sorry! Not Finished Yet");
    }

    handleUserHome() {
        this.context.router.history.push('/userhome');
    }

    handleLogin() {
        this.context.router.history.push('/login');
        //this.props.history.push('/login');
        document.getElementsByClassName("login-button").visibility="hidden";
        console.log(this.context.router.history)
    }

    render() {
        return (
            <div className="Navbar">
                <span className="Nav-title">Welcome To My Bookstore</span>
                <img src={require('./book.jpg')} className="Book-logo" alt="logo" />
                
                <button className="login-button"  
                    onClick={this.handleUserHome.bind(this)}>Home</button>   
                <button className="login-button"  
                    onClick={this.handleLogin.bind(this)}>Login</button>     
            </div>
        );
    }
}

export default Navbar;