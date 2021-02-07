import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditMeme extends Component {
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

    componentDidMount() {
        axios.get('http://localhost:5000/memes/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    caption: response.data.caption,
                    url: response.data.url
                })
                
            })
            .catch(function (error) {
                console.log(error);
            })

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
            username: this.state.username,
            caption: this.state.caption,
            url: this.state.url,
        };

        console.log(meme);

        axios.post('http://localhost:5000/memes/update/' + this.props.match.params.id, meme)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Meme</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User: </label>
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