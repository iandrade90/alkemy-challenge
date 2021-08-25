import React from 'react';
import Axios from 'axios';
import './styles.css';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value});
  }

  submitData = async (event) => {
    event.preventDefault();
    const {username, email, password, confirmPassword} = this.state;

    if(password !== confirmPassword){
      alert('Password not confirmed');
    } else {

      Axios.post('http://192.168.0.41:8000/api/registration', {
	    username: username,
	    email: email,
	    password: password
      })
	    .then(res => {
	      console.log(res.data);
	      this.cleanData();
	    }).catch(err => {
	      console.log(err.message);
  	  });
    }
  }

  cleanData = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''});
  }

  render(){
    
    const {username, email, password, confirmPassword} = this.state;
    const {handleChange, submitData} = this;

    return(
      <form className="form" onSubmit={submitData}>
	      <label className="username" for="username">
	        <input 
          type="text" id="username" name="username" 
          value={username} onChange={handleChange} 
          required placeholder="Username" />
	      </label>
	      <label className="email" for="email">
	        <input 
          type="email" id="email" name="email" 
          value={email} onChange={handleChange} 
          required placeholder="Email" />
	      </label>
	      <label className="password" for="password">
	        <input 
          type="password" id="password" name="password" 
          value={password} onChange={handleChange} 
          required placeholder="Password" />
	      </label>
	      <label className="confirmPassword" for="confirmPassword">
	        <input 
            type="password" id="confirmPassword" name="confirmPassword" 
            value={confirmPassword} onChange={handleChange} 
            required placeHolder="Confirm your password" />
	      </label>
	      <button className="reg-btn"  type="submit">
	        SIGN IN
	      </button>
      </form>
    );
  };
}

export default Form;
