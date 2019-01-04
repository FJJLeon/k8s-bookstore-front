import $ from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import { Modal,Button } from 'react-bootstrap';

import Navbar from '../user/Navbar';

import './UserHome.css'

class UserHome extends Component {

	constructor(props){
		super(props);

		let Cuser = localStorage.getItem('Cuser')
        Cuser = JSON.parse(Cuser)
        var Cname = Cuser.account

		this.state = {

			userName : Cname,
			//showOrder : false,
			showModify : false,

			userO : [],
			phonenumber: '',
			emailaddress:'',
			password: '',
			again_pwd: '',
		}
	}


	handleUserOrder() {
		this.serverRequest = $.post("/UserQueryOrder",{userName:this.state.userName},function(data){
            console.log(data),
            alert(data)
        }.bind(this));
	}


	handleModifyView() {
		this.serverRequest = $.post("/UserQueryUser",{userName:this.state.userName},function(user){
            console.log(user),
            //alert(user),
           	this.setState({
           		userO : user,
           		//phonenumber: this.setState.userO[1],         failed
           		//emailaddress: this.setState.userO[2],
           		//password: this.setState.userO[3],
           	})
           	console.log(this.state.phonenumber)
        }.bind(this));

        this.setState({ showModify : true});
	}

	Modifyclose() {
        this.setState({ showModify : false });
    }

    SubmitModify() {
    	if(!this.state.phonenumber) return alert("请输入手机号");
        if(!this.state.emailaddress) return alert("请输入邮箱地址");
        if(!this.state.password) return alert("请输入密码");
    	if (this.state.password != this.state.again_pwd) return alert("输入的密码不一致");

    	console.log("before post" + 
                    " name:"+this.state.userName +
                    " phone:"+this.state.phonenumber+
                    " email:"+this.state.emailaddress+
                    " pwd:"+this.state.password)

    	this.serverRequest = $.post("/UserModify",
            {
                username:this.state.userName, 
                phone:this.state.phonenumber,
                email:this.state.emailaddress,
                pwd:this.state.password
            },function(data){
                console.log(data),
                this.setState({
                isValid: JSON.parse(data),
            });
            console.log("modify user "+this.state.isValid);
            if(this.state.isValid){
                alert("Modify success"),
                this.props.history.push({  
                     pathname: '/login',  
                 })
             } 
             else{
                return alert("something wrong");
             }
         }.bind(this)); 
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
            password: event.target.value
        })
    }

    handleagain_pwdChange (event) {
        this.setState({
            again_pwd: event.target.value
        })
    }

	render() {

		return (
			<div>
				<Navbar/>
				<div className="wrapper">
					<span className='user-field-name'>我的用户名：{this.state.userName}</span>
					<br/>
					<div className='user-field-button'>
						<button
							onClick={this.handleUserOrder.bind(this)}>
						查询我的订单
						</button>
					</div>
					<div className='user-field-button'>
						<button
							onClick={this.handleModifyView.bind(this)}>
						修改您的个人信息
						</button>
					</div>

					<Modal show={this.state.showModify} onHide={this.Modifyclose.bind(this)}> 
                    	<Modal.Header>
                        	<Modal.Title>您的个人信息</Modal.Title>
                    	</Modal.Header>
                    	<Modal.Body>
                    		<span classNmae='user-field-name'>若要修改账户信息，请输入修改</span>
                    		<br/>
                       		<div className='user-field'>
                    			<span className='user-field-name'>账号：{this.state.userName}</span>
                			</div>
                			<div className='user-field'>
                    			<span className='user-field-name'>修改手机号：</span>
                    			<div className='user-field-input'>
                        			<input
                            			value={this.state.phonenumber}
                            			placeholder={this.state.phonenumber}
                            			onChange={this.handlephonenumberChange.bind(this)} />
                    			</div>
                			</div>
                			<div className='user-field'>
                    			<span className='user-field-name'>修改邮箱地址：</span>
                    			<div className='user-field-input'>
                        			<input
                            			value={this.state.emailaddress}
                            			placeholder={this.state.emailaddress}
                            			onChange={this.handleemailaddressChange.bind(this)} />
                    			</div>
                			</div>
                			<div className='user-field'>
                    			<span className='user-field-name'>请输入密码：</span>
                    			<div className='user-field-input'>
                        			<input
                            			value={this.state.password}
                            			placeholder={this.state.password}
                            			onChange={this.handlesign_passwordChange.bind(this)}
                            			type="password" />
                    			</div>
                			</div>
                			<div className='user-field'>
                    			<span className='user-field-name'>再次输入密码：</span>
                    			<div className='user-field-input'>
                        			<input
                            			value={this.state.again_pwd}
                            			placeholder={this.state.again_pwd}
                            			onChange={this.handleagain_pwdChange.bind(this)}
                            			type="password" />
                    			</div>
                			</div>                      
                    	</Modal.Body>
                    	<Modal.Footer>
                        	<Button onClick={this.Modifyclose.bind(this)}>Back</Button>
                        	<Button onClick={this.SubmitModify.bind(this)}>确认</Button>
                    	</Modal.Footer>

                	</Modal>
				</div>
			</div>
		)
	}

} 

export default UserHome;