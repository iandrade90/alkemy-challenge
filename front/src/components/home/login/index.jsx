import Title from './title/index';
import Info from './info/index';
import Button from './button/index';
import './index.css';

function Login(){
  return (
    <div className="lgnMainContainer">
      <Title className="titleContainer" />
      <Info className="infoContainer" />
      <Button className="btnContainer" />
    </div>
  );
}

export default Login;
