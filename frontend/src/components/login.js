import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeUsername(e){
        console.log("username to be changed");
    }
    onChangePassword(e) {
        console.log("password to be changed");
    }
    onSubmit(e){
        console.log("Submit login");
    }
    
    render() {
        return (
            <form onSubmit={this.onSubmit} className="loginBoard">
                <h1>Login</h1>
                <div className="username">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="password">
                    <label>Password: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>

            </form>
        )
    }
}


