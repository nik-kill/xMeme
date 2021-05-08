import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';

import MemesList from "./components/memes.component";
import EditMeme from "./components/edit-meme.component";


import Board from "./components/board";
import Footer from "./components/footer";

import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component{
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <header className="App-header">
              <b><i>Your daily dose of FUN :</i></b>
              Did you hear about the guy whose whole left side got amputated? He’s all right now.
            </header>
            <Board />
            <br />
            <Route path="/" exact component={MemesList} />
            <Route path="/edit/:id" component={EditMeme} />
          </div>
          <Footer />
        </Router>
      </Provider>
    );
  }
  
}

export default App;