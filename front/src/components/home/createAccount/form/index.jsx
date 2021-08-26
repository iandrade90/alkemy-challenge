import { useState } from 'react';
import Axios from 'axios';
import './styles.css';

function Form(){
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = event => {
    event.preventDefault();
    setData({...data, [event.target.name]: event.target.value});
  }

  const submitData = async (event) => {
    event.preventDefault();

    if(data.password !== data.confirmPassword){
      alert('Password not confirmed');
    } else {

      console.log(data);

      /* Axios.post('http://192.168.0.41:8000/api/registration', {
	    username: username,
	    email: email,
	    password: password
      })
	    .then(res => {
	      console.log(res.data);
	      cleanData();
	    }).catch(err => {
	      console.log(err.message);
  	  }); */
    }
  }

  const cleanData = () => {
    setData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''});
  }

  return(
    <form className="form" onSubmit={submitData}>
      <label className="username" for="username">
        <input 
        type="text" id="username" name="username" 
        value={data.username} onChange={handleChange} 
        required placeholder="Username" />
      </label>
      <label className="email" for="email">
        <input 
        type="email" id="email" name="email" 
        value={data.email} onChange={handleChange} 
        required placeholder="Email" />
      </label>
      <label className="password" for="password">
        <input 
        type="password" id="password" name="password" 
        value={data.password} onChange={handleChange} 
        required placeholder="Password" />
      </label>
      <label className="confirmPassword" for="confirmPassword">
        <input 
          type="password" id="confirmPassword" name="confirmPassword" 
          value={data.confirmPassword} onChange={handleChange} 
          required placeHolder="Confirm your password" />
      </label>
      <button className="reg-btn"  type="submit">
        SIGN IN
      </button>
    </form>
  );
}

export default Form;
