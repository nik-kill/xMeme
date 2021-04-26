import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
export default class MemesList extends Component {
    constructor(props) {
        super(props);
        this.deleteMeme = this.deleteMeme.bind(this);
        this.state = { memes: [] };
    }
    componentDidMount() {
        axios.get('https://x4meme.herokuapp.com/memes')
            .then(response => {
                this.setState({ memes: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    deleteMeme(id) {
        axios.delete('https://x4meme.herokuapp.com/memes/' + id)
            .then(res => console.log(res.data));
        this.setState({
            memes: this.state.memes.filter(el => el._id !== id)
        })
    }
    memesList() {
        return this.state.memes.reverse().map(currentmemes => {
            return <Memes memes={currentmemes} 
            deleteMeme={this.deleteMeme} key={currentmemes._id} />;
        })
    }
    render() {
        return (
            <div className="memeBox">
                {this.memesList()}
            </div>
        )
    }
}