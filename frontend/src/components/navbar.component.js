import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar">
                <div className="navbarItem">
                    <Link to="/create" className="nav-link">Share Your Meme</Link>
                </div>
            </nav>
        );
    }
}