import React, { Component } from 'react';
import Login from "./login";
import Register from "./register";

export default class Board extends Component {
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);

        this.state = { 
            isUser:true
         };
    }
    
    handleToggle(e){
        this.setState({
            isUser: !this.state.isUser
        });
        // console.log(this.state.isUser);
    }

    render() {
        return (
            <div className="board">
                <button onClick={this.handleToggle} className="toggleButton"> 
                Login / SignUp
                </button>
                {this.state.isUser ? <Login /> : <Register />}
            </div>
        )
    }
}


