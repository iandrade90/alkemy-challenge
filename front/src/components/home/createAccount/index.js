import React from 'react';
import Title from './title/index';
import Form from './form/index';
import './index.css';

class CreateAccount extends React.Component{
  render(){
    return(
      <div className="mainCreateAccountContainer">
        <Title className="title" />
        <Form className="form" />
      </div>
    );
  }
}

export default CreateAccount;