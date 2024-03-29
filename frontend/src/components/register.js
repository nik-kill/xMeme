import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

class Register extends Component {
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
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
    };

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeRPassword(e) {
        this.setState({
            rpassword: e.target.value
        });
    }
    async onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            rpassword: this.state.rpassword,
        };
        this.props.register(newUser);

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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { register, clearErrors }
)(Register);