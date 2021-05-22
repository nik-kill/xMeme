import React, { Component } from 'react';
import Login from "./login";
import Register from "./register";
import CreateMeme from "./create-meme.component";
import Logout from "./logout";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Board extends Component {
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);

        this.state = { 
            isUser:true,
         };
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    handleToggle(e){
        this.setState({
            isUser: !this.state.isUser
        });
        // console.log(this.state.isUser);
    }
    
    render() {
        const { isAuthenticated, user } = this.props.auth;
        console.log(isAuthenticated);
        console.log(user);

        return (
            <div className="board">
                {user ? <div className="authUser">
                    <strong>Welcome {user.name}<br/></strong> <Logout />
                    </div>: ''}
                
                {isAuthenticated ? <CreateMeme /> : <div>
                    <button onClick={this.handleToggle} className="toggleButton">
                        Login / SignUp
                    </button>
                    {this.state.isUser ? <Login /> : <Register />}              
               </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(Board);

