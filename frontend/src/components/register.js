import React, { Component,useState, useContext } from 'react';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRPassword = this.onChangeRPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            username: '',
            password: '',
            rpassword: ''
        }
    }

    onChangeName(e) {
        // console.log("name to be changed");
        this.setState({
            name: e.target.value
        });
    }
    onChangeUsername(e) {
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
    onChangeRPassword(e) {
        // console.log("password to be changed");
        this.setState({
            rpassword: e.target.value
        });
    }
    async onSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            rpassword: this.state.rpassword,
        };
        // console.log(user);
        const{username, password}= this.state;
        await axios.post('http://localhost:8081/user/register', user)
            .then(res => console.log(res.data));
        
        const loginResponse = await axios.post("http://localhost:8081/user/login",{
            username, password
        });
        // setUserData({
        //     token: loginResponse.data.token,
        //     user: loginResponse.data.user
        // });
        localStorage.setItem("auth-token", loginResponse.data.token);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="registerBoard">
                <h1>Register - Welcome to the Community !</h1><hr />
                <div className="name">
                    <label>Name: </label>
                    <input type="text"
                        required
                        className="signUpInput"
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />
                </div>
                <div className="username">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="signUpInput"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="password">
                    <label>Password: </label>
                    <input type="password"
                        required
                        className="signUpInput"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>
                <div className="password">
                    <label>Repeat Password: </label>
                    <input type="password"
                        required
                        className="signUpInput"
                        value={this.state.rpassword}
                        onChange={this.onChangeRPassword}
                    />
                </div>
                <div className="signUp">
                    <input type="submit" value="Sign Up" className="btn" />
                </div>

            </form>
        )
    }
}

