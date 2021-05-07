import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import './App.css';

import Navbar from "./components/navbar.component";
import MemesList from "./components/memes.component";
import EditMeme from "./components/edit-meme.component";


import Board from "./components/board";
import Footer from "./components/footer";

function App() {
  const [ userData, setUserData] = useState({
    token:undefined,
    user: undefined
  });

  useEffect( () => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token==null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post('http://localhost:8081/user/tokenIsValid', null,
      {headers: {"x-auth-token": token}});

      if(tokenResponse.data) {
        const userRes = await axios.get("http://localhost:8081/user/", {
          headers: { "x-auth-token": token},
        });
    setUserData({
      token,
      user: userRes.data,
    });
    }
  }
  checkLoggedIn();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <b><i>Your daily dose of FUN :</i></b>
          Did you hear about the guy whose whole left side got amputated? He’s all right now.
          </header>
        <Navbar />
        <Board />
        <br />
        <Route path="/" exact component={MemesList} />
        <Route path="/edit/:id" component={EditMeme} /> 
      </div>
      <Footer />
    </Router>
  );
}

export default App;