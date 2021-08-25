import React from 'react'
import Login from './login/index';
import CreateAccount from './createAccount/index';
import './index.css';

class Home extends React.Component {
  render(){
    return(
      <div className="homeContainer">
        <Login className="login" />
        <CreateAccount className="createAccount" />
      </div>
    );
  }
}

export default Home;
