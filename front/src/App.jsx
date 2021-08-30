import Home from './components/home/index';
import Login from './components/login/index';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
 } from 'react-router-dom';
import './App.css';

function App(){
  return(
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <div className="homeMainContainer">
            <Home />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;