import React, { Component } from 'react';
import axios from 'axios';


export default class EditMeme extends Component {
    constructor(props) {
        super(props);

        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onChangeURL = this.onChangeURL.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            caption: '',
            url: ''
        }
    }

    componentDidMount() {
        axios.get('https://x4meme.herokuapp.com/memes/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.name,
                    caption: response.data.caption,
                    url: response.data.url
                })
                
            })
            .catch(function (error) {
                console.log(error);
            })

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

        axios.post('https://x4meme.herokuapp.com/memes/update/' + this.props.match.params.id, meme)
            .then(res => console.log(res.data));

        // window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Meme</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h1>{this.state.username}</h1>
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
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.url}
                            onChange={this.onChangeURL}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Meme" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}