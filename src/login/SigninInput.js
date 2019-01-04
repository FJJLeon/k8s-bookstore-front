import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import './Signin.css'

class SigninInput extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor () {
        super()
        this.state = {
            sign_account: '',
            phonenumber: '',
            emailaddress: '',
            sign_password: '',
            again_pwd: ''
        }
    }

    handlesign_accountChange (event) {
        this.setState({
            sign_account: event.target.value
        })
    }

    handlephonenumberChange (event) {
        this.setState({
            phonenumber: event.target.value
        })
    }

    handleemailaddressChange (event) {
        this.setState({
            emailaddress: event.target.value
        })
    }
    
    handlesign_passwordChange (event) {
        this.setState({
            sign_password: event.target.value
        })
    }

    handleagain_pwdChange (event) {
        this.setState({
            again_pwd: event.target.value
        })
    }

    handleSubmit () {
        if (this.state.sign_password !== this.state.again_pwd) return alert("输入的密码不一致");

        if (this.props.onSubmit) {
            const { sign_account,phonenumber, emailaddress,sign_password, again_pwd } = this.state
            console.log("from input" + " name:"+sign_account +" phone:"+phonenumber+" email:"+emailaddress+" pwd:"+sign_password,)
            this.props.onSubmit({sign_account,phonenumber,emailaddress, sign_password, again_pwd})
        }
        this.setState({ sign_account:'',phonenumber:'',emailaddress:'' , sign_password: '', again_pwd: ''})
    }

    render() {
        return (
            <div className='login-input'>
                <span className='signin-field-title'>
                        注册
                </span>
                <div className='login-field'>
                    <span className='login-field-name'>请输入账号：</span>
                    <div className='login-field-input'>
                        <input
                            value={this.state.sign_account}
                            onChange={this.handlesign_accountChange.bind(this)} />
                    </div>
                </div>
                <div className='login-field'>
                    <span className='login-field-name'>手机号：</span>
                    <div className='login-field-input'>
                        <input
                            value={this.state.phonenumber}
                            onChange={this.handlephonenumberChange.bind(this)} />
                    </div>
                </div>
                <div className='login-field'>
                    <span className='login-field-name'>邮箱地址：</span>
                    <div className='login-field-input'>
                        <input
                            value={this.state.emailaddress}
                            onChange={this.handleemailaddressChange.bind(this)} />
                    </div>
                </div>
                <div className='login-field'>
                    <span className='login-field-name'>请输入密码：</span>
                    <div className='login-field-input'>
                        <input
                            value={this.state.sign_password}
                            onChange={this.handlesign_passwordChange.bind(this)} 
                            type="password"/>
                    </div>
                </div>
                <div className='login-field'>
                    <span className='login-field-name'>再次输入密码：</span>
                    <div className='login-field-input'>
                        <input
                            value={this.state.again_pwd}
                            onChange={this.handleagain_pwdChange.bind(this)} 
                            type="password"/>
                    </div>
                </div>
                <div className='login-field-button'>
                    <button
                        onClick={this.handleSubmit.bind(this)}>
                        注册
                    </button>
                </div>
            </div>
        )
    }
}

export default SigninInput