import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Navbar from '../user/Navbar';
import { Modal,Button } from 'react-bootstrap';
import './Admin.css'

import $ from 'jquery'

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            title: '',

            showModal: false,
            userinfo: '',

            showBook: false,
            bookinfo: '',
            addStock: '新进货数',
        }
    }

    handleAccountChange (event) {
        this.setState({
            account: event.target.value
        })
    }

    handleTitleChange (event) {
        this.setState({
            title: event.target.value
        })
    }

    handleStockChange (event) {
        this.setState({
            addStock: event.target.value
        })
    }

    handleQueryUser () {
        this.serverRequest = $.post("http://212.129.139.54:32002/Mybk-iteration3/MybkServlet/queryUser",{username:this.state.account},function(data){
            console.log(data),
            this.setState({ userinfo : data});
            //alert(data)
            if (this.state.userinfo[0] !== 'U')
                this.setState({ showModal: true });
            else
                alert(this.state.userinfo);
        }.bind(this)); 
    }

    handleQueryBook () {
        this.serverRequest = $.post("http://212.129.139.54:32002/Mybk-iteration3/MybkServlet/queryBook",{title:this.state.title},function(data){
            console.log(data),
            //alert(data)
            this.setState({ bookinfo : data});

            if (this.state.userinfo[0] !== 'B')
                this.setState({ showBook: true });
            else
                alert(this.state.bookinfo);
        }.bind(this)); 
    }

    handleBan() {
        this.serverRequest = $.post("http://212.129.139.54:32002/Mybk-iteration3/MybkServlet/banUser",{username:this.state.account},function(data){
            console.log(data),
            alert(data)
        }.bind(this)); 
    }

    submitStock() {
        this.serverRequest = $.post("http://212.129.139.54:32002/Mybk-iteration3/MybkServlet/addStock",{title:this.state.title, addStock:this.state.addStock},function(data){
            console.log(data),
            alert(data)
        }.bind(this)); 

        this.setState({ addStock : "新进货数"});

    }

    Modalclose() {
        this.setState({ showModal: false });
    }

    Bookclose() {
        this.setState({ showBook: false });
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="wrapper">
                <div className='admin-field'>
                    <span className='admin-field-name'>用户名：</span>
                    <div className='admin-field-input'>
                        <input
                            value={this.state.account}
                            onChange={this.handleAccountChange.bind(this)} />
                    </div>
                </div>
                <div className='admin-field-button'>
                    <button
                        onClick={this.handleQueryUser.bind(this)}>
                        查询
                    </button>
                </div>
                <div className='admin-field'>
                    <span className='admin-field-name'>书名：</span>
                    <div className='admin-field-input'>
                        <input
                            value={this.state.title}
                            onChange={this.handleTitleChange.bind(this)} />
                    </div>
                </div>
                <div className='admin-field-button'>
                    <button
                        onClick={this.handleQueryBook.bind(this)}>
                        查询
                    </button>
                </div>
            </div>

            <Modal show={this.state.showModal} onHide={this.Modalclose.bind(this)}> 
                    <Modal.Header>
                        <Modal.Title>用户详情</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span> {this.state.userinfo} </span>
                        <br/>
                        <span>有问题？</span>
                        <Button 
                            onClick={this.handleBan.bind(this)}>
                        封禁
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.Modalclose.bind(this)}>back</Button>
                    </Modal.Footer>
            </Modal>
            <Modal show={this.state.showBook} onHide={this.Bookclose.bind(this)}> 
                    <Modal.Header>
                        <Modal.Title>书本详情</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span> {this.state.bookinfo} </span>
                        <br/>
                        <span>有新进货？</span>
                        <div className='admin-field-input'>
                            <input
                                value={this.state.addStock}
                                placeholder="新进货数"
                                onChange={this.handleStockChange.bind(this)} />
                            <Button
                                onClick={this.submitStock.bind(this)}>
                            提交
                            </Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.Bookclose.bind(this)}>back</Button>
                    </Modal.Footer>
            </Modal>
            </div>
        );
    }
}

export default Admin;