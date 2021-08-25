import React from 'react';
import Home from './components/home/index';
import './App.css';

class App extends React.Component {
  render(){
    return(
      <div className="mainContainer">
        <div className="homeMainContainer">
      	  <Home className="home" />
        </div>
      </div>
    );
  }
}

export default App;