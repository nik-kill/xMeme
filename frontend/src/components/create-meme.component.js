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
            <form onSubmit={this.onSubmit} className="createMemeBoard">
                <h3><i>Lets Share Some Memes</i></h3>
                <div className="name">
                    <label>Name: </label>
                    <input type="text"
                        required
                        className="memeInput"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="caption">
                    <label>Caption: </label>
                    <input type="text"
                        required
                        className="memeInput"
                        value={this.state.caption}
                        onChange={this.onChangeCaption}
                    />
                </div>
                <div className="url">
                    <label>URL: </label>
                    <input
                        type="text"
                        className="memeInput"
                        value={this.state.url}
                        onChange={this.onChangeURL}
                    />
                </div>

                <div className="share">
                    <input type="submit" value="Share" className="btn" />
                </div>
            </form>
        )
    }
}