import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import './App.css';
import Home from './components/HomePage'
import Post from './components/Post'
import Comment from './components/Comment'
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div  className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">My Readable</h1>
      </header>
      <Switch>
      <Route exact path='/' component={Home} />
	    <Route exact path='/post' component={Post} />
      <Route exact path='/comment' component={Comment} />
      <Route exact path='/comments/:commentId' component={Comment} />
      <Route exact path='/:category' component={Home} />
      <Route exact path='/:category/:postId' component={Post} />
      </Switch>
      </div>
    );
  }
}

export default App;
