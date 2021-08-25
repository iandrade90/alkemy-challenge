import React from 'react';
import './index.css';

class Info extends React.Component {
  render(){
    return(
      <div className="infoContainer">
        <p className="lineOne">To keep connected with us, please</p>
        <p className="lineTwo">Login with your personal info</p>
      </div>
    );
  };
}

export default Info;
