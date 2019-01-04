import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Excel from './Excel';
import Cart from './Cart.js'
import './Main.css';


var headers = [
    "Book", "Author", "Language", "Published", "Price", "Sales"
]

var data= [
    ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "1", "150 million"],
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "10", "140 million"],
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997","100", "107 million"],
    ["And Then There Were None", "Agatha Christie", "English", "1939", "1000", "100 million"],
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791","10000", "100 million"],
    ["The Hobbit", "J. R. R. Tolkien", "English", "1937","100000", "100 million"],
    ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "1000000", "100 million"],
]

/*
var cart = new Map([["The Lord of the Rings",0],
                    ["Le Petit Prince (The Little Prince)",0],
                    ["Harry Potter and the Philosopher's Stone",0],
                    ["And Then There Were None", 0],
                    ["Dream of the Red Chamber",0],
                    ["The Hobbit",0],
                    ["She: A History of Adventure",0],
                ]);

*/

/* cart : new Map([
                    {name : "The Lord of the Rings", price : 1, number : 0 },
                    {name : "Le Petit Prince (The Little Prince)",price : 10, number : 0},
                    {name : "Harry Potter and the Philosopher's Stone",price : 100, number :0},
                    {name : "And Then There Were None", price : 1000, number : 0},
                    {name : "Dream of the Red Chamber", price : 10000, number : 0},
                    {name : "The Hobbit", price : 100000, number : 0},
                    {name : "She: A History of Adventure", price : 1000000, number : 0},
                ])*/
class Main extends Component {
    static contextTypes = {
        // for router
        router: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            cart : [
                ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", 1, 0],
                ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", 10, 0],
                ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997",100, 0],
                ["And Then There Were None", "Agatha Christie", "English", "1939", 1000, 0],
                ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791",10000, 0],
                ["The Hobbit", "J. R. R. Tolkien", "English", "1937",100000, 0],
                ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", 1000000, 0],
            ],

            //Cname: this.props.location.state.Cname,  
        };
    }

    /*
    static propTypes = {
        cart : this.state.cart
    }
    */
    Addcart(row) {
        if (this.props.location.state){
            this.state.cart = this.props.location.state;
            console.log(this.cart);
        }
        let oldnum = this.state.cart[row][5];
        console.log(oldnum);
        this.state.cart[row][5] = oldnum + 1;
        console.log(this.state.cart[row]);
        alert("The book 《"+this.state.cart[row][0]+"》 is waiting for you in cart");
    }

    showCart(msg){
        if (this.props.location.state){
            this.state.cart = this.props.location.state;
            console.log(this.cart);
        }
        var data = this.state.cart;
        console.log("come in");
        console.log(data);
        this.props.history.push({
            pathname : '/cart',
            state: this.state.cart,
        });
    }

    render() {
        return (
            <div className="main">
                <Navbar/>
                <div className="container"> 
                    <div className="left">  
                    </div>
                    <div className="right">
                        <Excel headers={headers} data={data}
                            Addcart = {row => this.Addcart(row)}
                            showCart = {msg => this.showCart(msg)}/>
                    </div>
                </div>
            </div>
        );
    }
}

/*
var Ex = ReactDOM.render(
    React.createElement(Excel, {
        headers: headers,
        initialData: data
    }),
    document.getElementById("app")
);
*/
export default Main;