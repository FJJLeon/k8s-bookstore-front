import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Navbar from '../user/Navbar';
import SigninInput from './SigninInput'
import './Signin.css'

import $ from 'jquery'

class SigninApp extends Component {
    static contextTypes = {
        // for router
        router: PropTypes.object
    }

    constructor () {
        super()
        this.state = {
            sign_account: '',
            phonenumber: '',
            emailaddress: '',
            sign_password: '',
            again_pwd: '',
            isValid: false, // if exist the username , false
        };
        
    }

    componentWillMount () {
        /*
        let signin = localStorage.getItem('signin')
        signin = JSON.parse(signin)
        if(signin != null)
            this.setState({ sign_account: signin.sign_account, 
                            phonenumber: signin.phonenumber,
                            emailaddress: signin.emailaddress,
                            sign_password: signin.sign_password,
                            again_pwd: signin.again_pwd})*/
    }

    _saveSignin (signin) {
        localStorage.setItem('signin', JSON.stringify(signin))
    }

    handleSubmitSignin (signin) {
        //console.log(signin);
        if(!signin.sign_account) return alert("请输入账号");
        if(!signin.phonenumber) return alert("请输入手机号");
        if(!signin.emailaddress) return alert("请输入邮箱地址");
        if(!signin.sign_password) return alert("请输入密码");
        if (signin.sign_password !== signin.again_pwd) return alert("输入的密码不一致");

        this.setState({ sign_account:signin.sign_account,
                        phonenumber:signin.phonenumber,
                        emailaddress:signin.emailaddress,
                        sign_password:signin.sign_password,
                        again_pwd:signin.again_pwd });
        //this._saveSignin(signin);
        console.log("before post" + 
                    " name:"+signin.sign_account +
                    " phone:"+signin.phonenumber+
                    " email:"+signin.emailaddress+
                    " pwd:"+signin.sign_password)
        this.serverRequest = $.post("http://212.129.139.54:32002/Mybk-iteration3/MybkServlet/register",
            {
                username:signin.sign_account, 
                phone:signin.phonenumber,
                email:signin.emailaddress,
                pwd:signin.sign_password
            },function(data){
                console.log(data),
                this.setState({
                isValid: JSON.parse(data),
            });
            console.log("add user "+this.state.isValid);
            if(this.state.isValid){
                alert("Register success"),
                this.props.history.push({  
                     pathname: '/login',  
                 })
             } 
             else{
                return alert("username already exist");
             }
         }.bind(this)); 
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className='wrapper'>
                    <SigninInput
                       onSubmit={this.handleSubmitSignin.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default SigninApp;