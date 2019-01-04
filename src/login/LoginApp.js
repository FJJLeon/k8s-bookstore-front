import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Navbar from '../user/Navbar';
import LoginInput from './LoginInput'
import './Login.css'

import $ from 'jquery'
class LoginApp extends Component {
    static contextTypes = {
        // for router
        router: PropTypes.object
    }

    constructor () {
        super()
        this.state = {
            account: '',
            password: '',
            isValid: false,
        }
    }

    componentWillMount () {
        /*
        let login = localStorage.getItem('login')
        login = JSON.parse(login)
        if(login != null)
            this.setState({ account:login.account, password:login.password })*/
    }

    _saveLogin (login) {
        localStorage.setItem('login', JSON.stringify(login))
    }

    handleSubmitLogin (login) {
        console.log(login)
        if(!login.account) return alert("请输入账号");
        if (!login.password) return alert('请输入密码');
        this.setState({ account:login.account, password:login.password })
        this._saveLogin(login)

        /* back end servlet */ 
        this.serverRequest = $.post("/MybkServlet/checkuser",{name:login.account, pwd:login.password},function(data){
            console.log(data),
            this.setState({
               isValid: JSON.parse(data),
            });
            console.log("0.0"+this.state.isValid);

            if(this.state.isValid){
                console.log();
                localStorage.setItem('Cuser', JSON.stringify(login))

                this.props.history.push({  
                     pathname: '/main',
                 })
             } 
             else{
                 return alert("Login failed");
             }
         }.bind(this)); 
/*
        this.props.history.push({
                pathname:'/main',
                //state : login.register,
            });*/
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className='wrapper'>
                    <LoginInput
                       onSubmit={this.handleSubmitLogin.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default LoginApp;