import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand" >X-Meme</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Show Creativity</Link>
                        </li>
                        
                    </ul>
                    <ul>
                        <li className="navbar-item">
                            <a href="https://nik-kill.github.io/" target="_blank"> Portfolio </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}