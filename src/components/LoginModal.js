import React, { Fragment } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { Auth } from "aws-amplify";
import LoginForm from './LoginForm'
import LoaderButton from "./LoaderButton";

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      modal: false,
      isLoading: false,
      email: "",
      password: ""
    };

  }
  
  hideModal() {
    this.setState(prevState => ({
      modal: false
    }));
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
  
    try {
      alert('1');
      await Auth.signIn(this.state.email, this.state.password);
      alert('2');
      this.props.userHasAuthenticated(true);
      alert('3');
      this.setState({ modal: false });
      alert('4');

    } catch (e) {
      alert(e.message);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <Fragment>
        <Button color="primary" outline onClick={this.toggleModal}>Login</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-lg">
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="email" placeholder="with a placeholder"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="password" placeholder="password placeholder"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <LoaderButton
                className="btn btn-primary"
                disabled={!this.validateForm()}
                type="submit"
                block
                isLoading={this.state.isLoading}
                text="Login"
                loadingText="Logging in…"
              />            
            </Form>
          </ModalBody>
          <ModalFooter>
            <a href="/signup" className="btn btn-outline-success" role="button">Create an Account</a>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

            <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>        
      </Fragment>
    );
  }
}