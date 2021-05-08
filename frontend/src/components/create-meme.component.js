import React, { Component } from 'react';

import { connect } from 'react-redux';
import { addMeme } from '../actions/memeActions';
import PropTypes from 'prop-types';

class CreateMeme extends Component {
    constructor(props) {
        super(props);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onChangeURL = this.onChangeURL.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            caption: '',
            url: ''
        }
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };


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
        const { user } = this.props.auth;

        const meme = {
            name: user.username,
            caption: this.state.caption,
            url: this.state.url,
        };

        console.log(meme);
        this.props.addMeme(meme);
        // axios.post('https://x4meme.herokuapp.com/memes', meme)
        //     .then(res => console.log(res.data));

        // window.location = '/';
    }

    render() {
        
        return (
            <form onSubmit={this.onSubmit} className="createMemeBoard">
                <h3><i>Lets Share Some Memes</i></h3>
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

const mapStateToProps = state => ({
    meme: state.meme,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { addMeme }
)(CreateMeme);