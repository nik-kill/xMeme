import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Memes = props => (
    <tr>
        <td><b>{props.memes.username}</b> <br></br>
        {props.memes.caption} <br></br>
        <img src={props.memes.url} width="400px"></img></td>
        <td>
            <Link to={"/edit/" + props.memes._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMeme(props.memes._id) }}>delete</a>
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
        axios.get('http://localhost:5000/memes')
            .then(response => {
                this.setState({ memes: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    deleteMeme(id) {
        axios.delete('http://localhost:5000/memes/' + id)
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