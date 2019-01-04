import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import './Login.css'

class LoginInput extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor (props) {
        super(props)
        this.state = {
            account: '',
            password: '',
            register: false
        }
    }

    handleaccountChange (event) {
        this.setState({
            account: event.target.value
        })
    }

    handlepasswordChange (event) {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit () {
        if(!this.state.account) return alert("请输入账号");
        if (!this.state.password) return alert('请输入密码');

        if (this.state.register){// admin
            this.context.router.history.push('/admin');
            return;
        }
        else {
            if (this.props.onSubmit) {
                const { account, password, register } = this.state
                this.props.onSubmit({account, password, register})
            }
        }
        this.setState({ account:'', password: '', register:false })
    }

    handleSignin () {
        //this.props.history.push('/signin')
        this.context.router.history.push('/signin');
    }

    handlerCheckbox() {
        this.state.register = !this.state.register;
        console.log(this.state.register);
    }

    render() {
        return (
            <div className='login-input'>
                <div className='login-field'>
                    <span className='login-field-name'>账号：</span>
                    <div className='login-field-input'>
                        <input
                            value={this.state.account}
                            onChange={this.handleaccountChange.bind(this)} />
                    </div>
                </div>
                <div className='login-field' >
                    <span className='login-field-name'>密码：</span>
                    <div className='login-field-input'>
                        <input
                            value={this.state.password}
                            onChange={this.handlepasswordChange.bind(this)} 
                            type="password"/>
                    </div>
                </div>
                <div>
                    <input type="checkbox"  id={"checkbox"} 
                        onChange={this.handlerCheckbox.bind(this)}>
                    </input> 
                    <label htmlFor={"checkbox"}>以管理员身份登录</label>
                </div>
                <div className='login-field-button'>
                    <button
                        onClick={this.handleSubmit.bind(this)}>
                        登陆
                    </button>
                </div>
                <div className='login-field-button'>
                    <span className='login-field-span'>没有账号？</span>
                    <button
                        onClick={this.handleSignin.bind(this)}>
                        注册
                    </button>
                </div>
            </div>
        )
    }
}

export default LoginInput;
