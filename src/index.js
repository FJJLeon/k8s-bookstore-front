import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import Admin from './admin/Admin.js';
import Main from './user/Main';
import Cart from './user/Cart.js'
import LoginApp from './login/LoginApp';
import SigninApp from './login/SigninApp';
import BrowserTable from './tmp/Table';
import UserHome from './userpage/UserHome';

import 'bootstrap/dist/css/bootstrap.css'

global.jQuery = require('jquery');
require('bootstrap');

//var history = createHashHistory();
/*
var data= [
    {Book:"The Lord of the Rings",                    Author:"J. R. R. Tolkien",         Language:"English", Published:"1954-1955", Sales:"150 million"},
    {Book:"Le Petit Prince (The Little Prince)",      Author:"Antoine de Saint-Exupéry", Language:"French",  Published:"1943",      Sales:"140 million"},
    {Book:"Harry Potter and the Philosopher's Stone", Author:"J. K. Rowling",            Language:"English", Published:"1997",      Sales:"107 million"},
    {Book:"And Then There Were None",                 Author:"Agatha Christie",          Language:"English", Published:"1939",      Sales:"100 million"},
    {Book:"Dream of the Red Chamber",                 Author:"Cao Xueqin",               Language:"Chinese", Published:"1754-1791", Sales:"100 million"},
    {Book:"The Hobbit",                               Author:"J. R. R. Tolkien",         Language:"English", Published:"1937",      Sales:"100 million"},
    {Book:"She: A History of Adventure",              Author:"H. Rider Haggard",         Language:"English", Published:"1887",      Sales:"100 million"},
]

ReactDOM.render(<BrowserTable data={data} />, document.getElementById('root'));
registerServiceWorker();
*/

/*
var headers = [
    "Book", "Author", "Language", "Published", "Sales"
]

var data= [
    ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 million"],
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],
    ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"],
    ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
    ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
]

ReactDOM.render(<Excel headers={headers} data={data}/>, document.getElementById('root'));
registerServiceWorker();



<Route exact path="/main" component={ExpressApp}/>
        <Route path="/contact" component={Contact}/>
*/

ReactDOM.render((
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={LoginApp}/>
        <Route exact path="/signin" component={SigninApp}/>
        <Route exact path="/" component={Main}/>
        <Route exact path="/main" component={Main}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/userhome" component={UserHome}/>
      </Switch>
    </HashRouter>
  ),
    document.getElementById('root')
  );
  registerServiceWorker();