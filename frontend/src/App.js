import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import Navbar from "./components/navbar.component";
import MemesList from "./components/memes.component";
import EditMeme from "./components/edit-meme.component";
import CreateMeme from "./components/create-meme.component";

import Board from "./components/board";

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Navbar />
        <Board />
        <br />
        <Route path="/" exact component={MemesList} />
        <Route path="/edit/:id" component={EditMeme} />
        <Route path="/create" component={CreateMeme} />
      </div>
    </Router>
  );
}

export default App;