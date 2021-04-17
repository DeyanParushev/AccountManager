import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { FormGroup, Form, Label, Col, Button, Input } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { Create } from '../../services/ApiService';
import { ExtractComponentFromRoute } from '../../utilityFunctions/RoutingFunctions';

const CreateFilterComponent = ({ match, history }) => {
  const context = useContext(UserContext);
  const [createSucessfull, setCreateSuccessfull] = useState();
  const [error, setError] = useState('');

  if (!context.user.id) {
    return <Redirect to='/Identity/Login' />
  }
  const onCreateSubmitHandler = async (e) => {
    e.preventDefault();
    const componentName = ExtractComponentFromRoute(match.path);
    let filterObject = {
      name: e.target.name.value,
    };

    const response = await Create(context.user.id, componentName, filterObject, context.user.token)
    if(response.status === 200) {
      setCreateSuccessfull(true);
      history.push('/');
    } else {
      setCreateSuccessfull(false);
      const responseError = await response.json();
      setError(responseError.errors.Name[0]);
    }
  }

  return (
    <Form onSubmit={onCreateSubmitHandler}>
      <FormGroup>
        <h3 style={{textAlign: 'center', margin: 20}}>Create item</h3>
        <Label sm={2} for="name">Item Name</Label>
        <Col sm={10}>
          <Input type="text" id="name" name="name" />
        </Col>
        {createSucessfull ? <span style={{color: 'lightgreen'}}><b>Success</b></span> : <span style={{color: 'red'}}><b>{error}</b></span>}
      </FormGroup>

      <Col>
        <Button outline color="primary" >Create</Button>
      </Col>
    </Form>
  );
}

export default CreateFilterComponent;