import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMemes, deleteMeme } from '../actions/memeActions';
import PropTypes from 'prop-types';

const Memes = props => (
    <div className="meme">
        <img alt="memeImage" src={props.memes.url} height="400px"></img>
        <div className="memeData">
            <b>Username: </b> {props.memes.name} <br></br>
            <b>Caption: </b> {props.memes.caption} <br></br>
            {props.isAuth && props.user && (props.user.username==props.memes.name) ?
            <div>
                <button><Link to={"/edit/" + props.memes._id}>EDIT</Link></button> | 
                <button onClick={() => { props.deleteMeme(props.memes._id) }}>DELETE</button>
            </div>
            : ' ' }
            
        </div>
    </div>
)
class MemesList extends Component {
    constructor(props) {
        super(props);
        this.deleteMeme = this.deleteMeme.bind(this);
    };

    static propTypes = {
        getMemes : PropTypes.func.isRequired,
        meme : PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getMemes();
    }
    
    deleteMeme(id) {
        this.props.deleteMeme(id);
    };

    memesList() {
        const { isAuthenticated, user } = this.props.auth;
        const { memes }  = this.props.meme;
        console.log(memes);
        console.log(user);
        return memes.map(currentmemes => {
            return <Memes memes={currentmemes} 
            deleteMeme={this.deleteMeme} key={currentmemes._id} isAuth={ isAuthenticated } user={user}/>;
        });
    };
    render() {
        return (
            <div className="memeBox">
                {this.memesList()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    meme: state.meme,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getMemes, deleteMeme }
)(MemesList);