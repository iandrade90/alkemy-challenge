import Title from './title/index';
import Form from './form/index';
import './index.css';

function CreateAccount(){
  return(
    <div className="mainCreateAccountContainer">
      <Title className="title" />
      <Form className="form" />
    </div>
  );
}

export default CreateAccount;