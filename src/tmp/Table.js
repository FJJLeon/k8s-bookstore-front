import React, { Component } from 'react';

var headers = new Array(
    "Book", "Author", "Language", "Published", "Sales"
);

var data= [
    {Book:"The Lord of the Rings",                    Author:"J. R. R. Tolkien",         Language:"English", Published:"1954-1955", Sales:"150 million"},
    {Book:"Le Petit Prince (The Little Prince)",      Author:"Antoine de Saint-Exupéry", Language:"French",  Published:"1943",      Sales:"140 million"},
    {Book:"Harry Potter and the Philosopher's Stone", Author:"J. K. Rowling",            Language:"English", Published:"1997",      Sales:"107 million"},
    {Book:"And Then There Were None",                 Author:"Agatha Christie",          Language:"English", Published:"1939",      Sales:"100 million"},
    {Book:"Dream of the Red Chamber",                 Author:"Cao Xueqin",               Language:"Chinese", Published:"1754-1791", Sales:"100 million"},
    {Book:"The Hobbit",                               Author:"J. R. R. Tolkien",         Language:"English", Published:"1937",      Sales:"100 million"},
    {Book:"She: A History of Adventure",              Author:"H. Rider Haggard",         Language:"English", Published:"1887",      Sales:"100 million"},
]

class BookRow extends Component {
    render() {
        const record = this.props.record;
        const name = record.Book;
        return (
            <tr>
                <td>{name}</td>
                <td>{record.Author}</td>
                <td>{record.Language}</td>
                <td>{record.Published}</td>
                <td>{record.Sales}</td>
            </tr>
        );
    }
}

class BookTable extends Component {


    render() {
        const rows = [];
        //let lastRecord = null;
        /*
        this.props.data.map((record) => {   // also ok
            rows.push(
                <BookRow
                record={record}
                key={record.Book}/>
            );
        });
*/
        this.props.data.map(function(record){
            rows.push(
                <BookRow record={record} key={record.Book}/>
            )
        }, this);

        return (
            <table>
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Author</th>
                        <th>Language</th>
                        <th>Published</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..."/>
                <p>
                    <input type="checkbox" />
                    {' '}
                    Only show products instock // no use
                </p>
            </form>
        )
    }
}


class BrowserTable extends Component {

    render() {
        return (
            <div>
                <SearchBar />
                <BookTable data={this.props.data} />
            </div>
        );
    }
}

export default BrowserTable;
/*
ReactDOM.render(
    <BrowserTable data={data} />,
    document.getElementById('root')
);
*/