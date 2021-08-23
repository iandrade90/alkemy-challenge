import React from 'react';
import Title from './title/index';
import Info from './info/index';
import Button from './button/index';

class Login extends React.Component {
  render(){
    return (
      <div>
	<Title />
	<Info />
	<Button />
      </div>
    );
  }
}

export default Login;
