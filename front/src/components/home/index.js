import React from 'react'
import Login from './login/index';
import CreateAccount from './createAccount/index';

class Home extends React.Component {
  render(){
    return(
      <div>
        <Login />
        <CreateAccount />
      </div>
    );
  }
}

export default Home;
