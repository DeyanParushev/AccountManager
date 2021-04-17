import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { FormGroup, Form, Label, Col, Button, Input } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { Create } from '../../services/ApiService';
import { ExtractComponentFromRoute } from '../../utilityFunctions/RoutingFunctions';

const CreateFilterComponent = ({ match }) => {
  const context = useContext(UserContext);

  if (!context.user.id) {
    return <Redirect to='/Identity/Login' />
  }
  const onCreateSubmitHandler = (e) => {
    e.preventDefault();
    const componentName = ExtractComponentFromRoute(match.path);
    let filterObject = {
      name: e.target.name.value,
    };

    Create(context.user.id, componentName, filterObject, context.user.token)
      .then(response => {
        console.log(response);
      });
  }

  return (
    <Form onSubmit={onCreateSubmitHandler}>
      <FormGroup>
        <Label sm={2} for="name">Name</Label>
        <Col sm={10}>
          <Input type="text" id="name" name="name" />
        </Col>
      </FormGroup>

      <Col>
        <Button outline color="primary" >Create</Button>
      </Col>
    </Form>
  );
}

export default CreateFilterComponent;