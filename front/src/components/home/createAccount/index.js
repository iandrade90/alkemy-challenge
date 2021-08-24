import React from 'react';
import Title from './title/index';
import Form from './form/index';

class CreateAccount extends React.Component{
  render(){
    return(
      <div>
        <Title />
        <Form />
      </div>
    );
  }
}

export default CreateAccount;