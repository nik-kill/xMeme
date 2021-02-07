import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Memes = props => (
    <tr>
        <td><b>{props.memes.username}</b> <br></br>
        {props.memes.caption} <br></br>
        <img alt="memeImage" src={props.memes.url} width="600px"></img></td>
        <td>
            <button><Link to={"/edit/" + props.memes._id}>EDIT</Link></button> | <button onClick={() => { props.deleteMeme(props.memes._id) }}>DELETE</button>
        </td>
    </tr>
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
        return this.state.memes.map(currentmemes => {
            return <Memes memes={currentmemes} 
            deleteMeme={this.deleteMeme} key={currentmemes._id} />;
        })
    }
    render() {
        return (
            <div>
                <h3>x-Memes</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Lets see what we got !!</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.memesList()}
                    </tbody>
                </table>
            </div>
        )
    }
}