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
            <button><Link to={"/edit/" + props.memes._id}>EDIT</Link></button> | <button onClick={() => { props.deleteMeme(props.memes._id) }}>DELETE</button>
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
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getMemes();
    }
    
    deleteMeme(id) {
        this.props.deleteMeme(id);
    };

    memesList() {
        const { memes }  = this.props.meme;
        console.log('comppp');
        console.log(memes);
        return memes.map(currentmemes => {
            return <Memes memes={currentmemes} 
            deleteMeme={this.deleteMeme} key={currentmemes._id} />;
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getMemes, deleteMeme }
)(MemesList);