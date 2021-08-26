import Login from './login/index';
import CreateAccount from './createAccount/index';
import './index.css';

function Home(){
  return(
    <div className="homeContainer">
      <Login className="login" />
      <CreateAccount className="createAccount" />
    </div>
  );
}

export default Home;
