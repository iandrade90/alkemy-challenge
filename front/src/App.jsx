import Home from './components/home/index';
import './App.css';

function App(){
  return(
    <div className="mainContainer">
      <div className="homeMainContainer">
        <Home className="home" />
      </div>
    </div>
  );
}

export default App;