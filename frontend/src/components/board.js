import React, { Component } from 'react';
import Login from "./login";
import Register from "./register";
import CreateMeme from "./create-meme.component";

export default class Board extends Component {
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
        this.handleAuth = this.handleAuth.bind(this);

        this.state = { 
            isUser:true,
            isAuth:false
         };
    }
    
    handleToggle(e){
        this.setState({
            isUser: !this.state.isUser
        });
        // console.log(this.state.isUser);
    }
    handleAuth(e) {
        this.setState({
            isAuth: !this.state.isUser
        });
        // console.log(this.state.isAuth);
    }

    render() {
        return (
            <div className="board">
                {this.state.isAuth ? <CreateMeme /> : <div>
                    <button onClick={this.handleToggle} className="toggleButton">
                        Login / SignUp
                    </button>
                    {this.state.isUser ? <Login /> : <Register />}              
               </div>}
            </div>
        )
    }
}


