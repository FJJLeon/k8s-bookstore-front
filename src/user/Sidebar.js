import React, { Component } from 'react';

import "./Sidebar.css";

class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                 <ul>
                    <li className="Catalog">Catalog</li>
                    <li>Fiction</li>
                    <li>Poetry</li> 
                    <li>Essay</li> 
                    <li>Theatre</li> 
                 </ul>
            </div>
        );
    }
}

export default Sidebar;