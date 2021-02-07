import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import MemesList from "./components/memes.component";
import EditMeme from "./components/edit-meme.component";
import CreateMeme from "./components/create-meme.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={MemesList} />
        <Route path="/edit/:id" component={EditMeme} />
        <Route path="/create" component={CreateMeme} />
        
      </div>
    </Router>
  );
}

export default App;