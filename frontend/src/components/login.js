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
        // console.log("username to be changed");
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        // console.log("password to be changed");
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e){
        console.log("Submit login");
        console.log(this.state);
    }
    
    render() {
        return (
            <form onSubmit={this.onSubmit} className="loginBoard">
                <h1>Login</h1><hr />
                <div className="username">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="loginInput"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="password">
                    <label>Password: </label>
                    <input type="password"
                        required
                        className="loginInput"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>
                <div className="login">
                    <input type="submit" value="Login" className="btn" />
                </div>

            </form>
        )
    }
}


