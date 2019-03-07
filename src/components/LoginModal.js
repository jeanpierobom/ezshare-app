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
  ModalFooter,
  NavLink
} from 'reactstrap';
import { Auth } from "aws-amplify"
import LoaderButton from "./LoaderButton";

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.showSignupForm = this.showSignupForm.bind(this);

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

  validateFormLogin() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleLoginSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.toggleModal();
    } catch (e) {
      alert(e.message);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  validateFormSignup() {
    return (
      this.state.email.length > 0 &&
      this.state.nickname.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleSubmitSignup = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
            nickname: this.state.nickname
        }
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }
  
    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);  
      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  showLoginForm() {
    this.setState({ currentForm: 'login' });
  }

  showSignupForm() {
    this.toggleModal();
    this.props.history.push("/signup");
  }

  render() {
    return (
      <Fragment>
        <Button color="primary" outline onClick={this.toggleModal}>Login</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-lg">
          <ModalHeader toggle={this.toggleModal}>
            Login
          </ModalHeader>
          <ModalBody>
          <Form onSubmit={this.handleLoginSubmit}>
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
              disabled={!this.validateFormLogin()}
              type="submit"
              block
              isLoading={this.state.isLoading}
              text="Login"
              loadingText="Logging in…"
            />
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" outline onClick={this.showSignupForm}>Create an Account</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>        
      </Fragment>
    );
  }
}