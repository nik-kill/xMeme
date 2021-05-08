import React, { Component } from 'react';

import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            msg: null
        }
    }
    static propTypes = {
        login: PropTypes.func.isRequired,
    };

    

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const credentials = {
            username: this.state.username,
            password: this.state.password,
        };

        this.props.login(credentials);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="loginBoard">
                <h1>Login - Already a member.</h1>
                <hr />
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(Login);