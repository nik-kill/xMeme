import React, { Component } from 'react';
import axios from 'axios';



export default class CreateMeme extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onChangeURL = this.onChangeURL.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            caption: '',
            url: ''
        }
    }

    

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeCaption(e) {
        this.setState({
            caption: e.target.value
        });
    }

    onChangeURL(e) {
        this.setState({
            url: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const meme = {
            name: this.state.username,
            caption: this.state.caption,
            url: this.state.url,
        };

        console.log(meme);

        axios.post('https://x4meme.herokuapp.com/memes', meme)
            .then(res => console.log(res.data));

        // window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Lets Share Some Memes</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Caption: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.caption}
                            onChange={this.onChangeCaption}
                        />
                    </div>
                    <div className="form-group">
                        <label>URL: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.url}
                            onChange={this.onChangeURL}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Share" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}