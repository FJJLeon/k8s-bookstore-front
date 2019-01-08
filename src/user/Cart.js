import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';

import Navbar from './Navbar';
import "./Cart.css";

import $ from 'jquery'

var headers = [
    "Book", "Price", "Number"
]

class Cart extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            headers : [
                "Book", "Author", "Language", "Published", "Price", "Order"
            ],
            data : this.props.location.state,
            totalCost: 0,
        };

        this.handleOrder=this.handleOrder.bind(this);
        this.handleBack=this.handleBack.bind(this);
    }

    handleBack(){
        var data = this.state.data;
        // refresh state make it able to add cost correctly
        this.props.history.push({
            pathname : '/main',
            state: data,
            });
    }

    handleOrder(){           
        alert("Order has been received");
        console.log("from order submit");
        console.log(this.state.data);
        var jsonCart = JSON.stringify(this.state.data);
        console.log("json cart："+ jsonCart);

        let Cuser = localStorage.getItem('login')
        Cuser = JSON.parse(Cuser)
        if(Cuser != null)
            var Cname = Cuser.account
        else
            return alert("login name sth wrong");

        console.log("current user:"+Cname);
        this.serverRequest = $.post("http://212.129.139.54:32002/Mybk-iteration3/MybkServlet/submitOrder",
            {
                Cname: Cname,
                cart: jsonCart
            },function(res){
                console.log(res)
                this.props.history.push({
                    pathname: '/main',  
                })
            }.bind(this)); 
    }

    handleDelete(event) {
        event = event.nativeEvent;
        const tr = event.target.parentNode;
        const book = tr.cells[0].innerText;
        console.log(tr);
        var tmp = this.state.data;
        //var tmpCost = this.state.totalCost;
        for (var row=0; row<tmp.length; row++){
            
            if (tmp[row][0] === book){
                tmp[row][5] -= 1;
                console.log(parseInt(tmp[row][4],10));
                this.state.totalCost -= parseInt(tmp[row][4],10);
            }
        }
        this.setState({data:tmp});
        //this.setState({totalCost:tmpCost});
    }
    render() { 
        return ( 
            <div> 
                <Navbar/>
                <div className="container">
                    <div className="left"/>
                    <div className="right">
                        <span className="cart-title">ShoppingCart</span>
                        {this._renderTable()}
                        <span className="cart-cost"> Total Cost is: {this.state.totalCost}</span>
                        <button className="cart-button blue"
                                onClick={this.handleOrder.bind(this)}>Order</button>
                        <button className="cart-button blue"
                                onClick={this.handleBack.bind(this)}>Back</button>
                    </div>
                </div>
            </div> 
        );        
    }

    _renderTable() { 
        this.state.totalCost = 0;
        return (
            <table className="table">
                <thead onClick={this._sort}>
                <tr>{
                    this.state.headers.map(function(title, idx){
                        if (this.state.sortby === idx) {
                            title += this.state.descending ? ' \u2191' : ' \u2193'; 
                        }
                        return <th key={idx}>{title}</th>; 
                    }, this)
                } 
                </tr>
                </thead>
                <tbody onDoubleClick={this._showEditor}> 
                    {this.state.data.map(function(row, rowidx) { 
                        if (row[5] !== 0){
                            this.state.totalCost += parseInt(row[5],10)*parseInt(row[4],10);
                            return (  
                                <tr key={rowidx}>{
                                    row.map(function(cell, idx) {   
                                        var content = cell; 
                                        var edit = this.state.edit;     
                                        if (edit && edit.row === rowidx && edit.cell === idx) {        
                                        content = ( 
                                            <form onSubmit={this._save.bind(this)}> 
                                                <input type="text" defaultValue={cell} /> 
                                            </form>    
                                            );   
                                        }
                                        return <td key={idx} data-row={rowidx}>{content}</td>;
                                    },this)}
                                    <td onClick={this.handleDelete.bind(this)}>delete</td>
                                </tr>
                            );
                        }  
                    },this)}
                </tbody>
            </table>
        );
    }


}

export default Cart;