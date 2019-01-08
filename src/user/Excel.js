import $ from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import { Modal,Button } from 'react-bootstrap';
import './Excel.css'

global.jQuery = require('jquery');
var headers = [
    "Book", "Author", "Language", "Published", "Price", "Sales"
]

class Excel extends Component {
    displayName = 'Excel'

    static contextTypes = {
        // for router
        router: PropTypes.object
    }

/*
    static propTypes = {
        headers: React.propTypes.arrayOf(
            React.propTypes.string
        ),
        initialData: React.propTypes.arrayOf(
            React.propTypes.arrayOf(
                React.propTypes.string
            )
        ),
    }
*/
    constructor(props) {
        super(props);
        this.state = {
            //data: this.props.data,
            data: [],
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index],
            search: false,
            header: headers,

            showModal: false,
            img_string: "",
        };
        this._sort = this._sort.bind(this);
        this._showEditor = this._showEditor.bind(this);
        this._save = this._save.bind(this);
        this._toggleSearch = this._toggleSearch.bind(this);
        this._search = this._search.bind(this);
        this.handleAddcart = this.handleAddcart.bind(this);
        this.showCart = this.showCart.bind(this);
    }

    _getBooks(event) {	          
        this.serverRequest = $.get("http://212.129.139.54:32002/MybkServlet/BookManager",function(data){
           this.setState({
              data: JSON.parse(data),
           });
        }.bind(this));
     }

    _sort(event) {
        var column = event.target.cellIndex;
        var data = this.state.data.slice();
        var descending = this.state.sortby === column && !this.state.descending;
        console.log(descending===true?"yes":"no");
        data.sort(function(a,b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });
        this.setState({
            data: data,
            sortby: column, 
            descending: descending, 
        });
    }

    _showEditor(event) {
        this.setState({
            edit: {
                row : parseInt(event.target.dataset.row, 10),
                cell:　event.target.cellIndex,
            }
        });
    }

    _save(event) {
        event.preventDefault(); 
        var input = event.target.firstChild; 
        var data = this.state.data.slice(); 
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({ 
            edit: null,
            data: data, 
        });
    }

    _preSearchData = null

    _toggleSearch() {
        if (this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: false,
            });
            this._preSearchData = null;
        }
        else {
            this._preSearchData = this.state.data;
            this.setState({
                search: true,
            });
        }
        console.log(this.state.search ? "toggle open" : "toggle close"); 
    }

    _search(event) {
        var needle = event.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this._preSearchData})
            return;
        }
        var idx = event.target.dataset.idx;
        var searchdata = this._preSearchData.filter(
            function(row) {
                return row[idx].toString().toLowerCase().indexOf(needle) > -1 ;
            });
        this.setState({data : searchdata});
    }

    _download(format, event) {
        var contents = format === 'json'
            ?JSON.stringify(this.state.data)
            :this.state.data.reduce(function(result, row) {
                return result
                    + row.reduce(function(rowresult,cell,idx){
                        return rowresult  
                            + '"'
                            + cell.replace(/"/g,'""')
                            + '"'
                            + (idx < row.length - 1 ? ',': '');
                    }, '')
                    + "\n";
            }, '');
            var URL = window.URL || window.webkitURL;
            var blob = new Blob([contents], {type: 'type/' + format});
            event.target.href = URL.createObjectURL(blob);
            event.target.download = 'data.' + format;
    }

    showCart(msg){
        this.props.showCart(msg);
    }

    handleAddcart(event) {
        //this.props.Addcart("The Lord of the Rings");
        event = event.nativeEvent;
        const tr = event.target.parentNode;
        console.log("order" + tr);
        for (var row=0; row<this.props.data.length; row++){
            var book = tr.cells[0].innerText;
            if (this.props.data[row][0] === book){// ???so only this books?
                this.props.Addcart(row);  
            }   
        }
    }

    handleView(event) {
        event = event.nativeEvent;
        const tr = event.target.parentNode;
        console.log("view" + tr);
        var bookName = tr.cells[0].innerText;

        /*for (var row=0; row<this.props.data.length; row++){
            var book = tr.cells[0].innerText;
            if (this.props.data[row][0] === book){// ???so only this books?
                  
            } 
        }*/
        this.setState({showModal:true});

        this.serverRequest = $.post("/MongoServer",{filename:bookName},function(data){
            console.log("back" + data),
            this.setState({
                img_string: data,
            })
        }.bind(this));
    }

    Modalclose() {
        this.setState({ showModal: false });
    }

    render() { 
        return ( 
            <div> 
                {this._renderToolbar()}
                {this._renderTable()} 
            </div> 
        );        
    }

    _renderToolbar() { 
        var tmp = this.state.img_string
        return (      
            <div className="toolbar"> 
                <button onClick={this._getBooks.bind(this)} className="button round blue">
                    Get Books</button>
                <button onClick={this._toggleSearch.bind(this)} className="button round blue">
                    Search</button> 
                <button onClick={this.showCart} className="button round blue">
                    Shopping Cart</button>
                <a onClick={this._download.bind(this, 'json')} 
                   href="data.json"
                   className="button green">
                    Export JSON 
                </a> 
                <a onClick={this._download.bind(this, 'csv')}
                   href="data.csv"
                   className="button green"> 
                    Export CSV
                </a>
                <Modal show={this.state.showModal} onHide={this.Modalclose.bind(this)}> 
                    <Modal.Header>
                        <Modal.Title>书本详情</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        书本封面
                        <br/>
                        <img src={"data:image/png;base64,"+this.state.img_string}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.Modalclose.bind(this)}>back</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    _renderSearch() { 
        if (!this.state.search) {
            if (this.state.search === true)
                console.log("research something wrong")     
            return null; 
        }   
        return (         
            <tr onChange={this._search}>             
                {this.props.headers.map(function(_ignore, idx) { 
                    return <td key={idx}> <input type="text" data-idx={idx}/> </td>;        
                })}            
            </tr> 
        );        
    }

    _renderTable() { 
        return (
            <table className="table">
                <thead onClick={this._sort}>
                <tr>{
                    this.props.headers.map(function(title, idx){
                        if (this.state.sortby === idx) {
                            title += this.state.descending ? ' \u2191' : ' \u2193'; 
                        }
                        return <th key={idx}>{title}</th>; 
                    }, this)
                } 
                </tr>
                </thead>
                <tbody onDoubleClick={this._showEditor}> 
                  {this._renderSearch()} 
                  {this.state.data.map(function(row, rowidx) { 
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
                                <td onClick={this.handleView.bind(this)}>View</td> 
                                <td onClick={this.handleAddcart.bind(this)}>Order</td>
                            </tr>
                        );
                    },this)}
                </tbody>
            </table>
        );
    }

}

export default Excel;