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

// const AnimatedCard = posed.div({
//   visible: {
//     x: 0,
//     y: 0,
//     scale: 1,
//     opacity: 1,
//     transition: {
//       x: {
//         type: 'spring',
//         // speed of drop
//         stiffness: 100,
//         // force of drop
//         damping: 5,
//         // the amount of moving element
//         mass: 0.4
//       },
//       opacity: { ease: "easeOut", duration: 300 },
//       default: { ease: "linear", duration: 500 }
//     }
//   },
//   hidden: { x: -100, y: -100, scale: 0, opacity: 0 }
// });

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.getModalTitle = this.getModalTitle.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
    this.showSignupForm = this.showSignupForm.bind(this);
    this.showConfirmationForm = this.showConfirmationForm.bind(this);

    this.state = {
      modal: false,
      isLoading: false,
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,

      currentForm: 'login'
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

  getModalTitle() {
    switch (this.state.currentForm) {
      case 'login':
        return 'Login';
      case 'signup':
        return 'Sign Up';
      case 'confirmation':
        return 'Confirmation';
      default:
        return '';
    }
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
    this.setState({ currentForm: 'signup' });
  }

  showConfirmationForm() {
    this.setState({ currentForm: 'confirmation' });
  }

  renderLoginForm() {
    return (
      <Zoom collapse delayIn={1000} when={this.state.currentForm === 'login'} mountOnEnter={true} unmountOnExit={true}>
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
          <NavLink onClick={this.showSignupForm}>Create an account</NavLink>
        </Form>
      </Zoom >
    )
  }

  renderSignupForm() {
    return (
      <Zoom collapse delayIn={1000} when={this.state.currentForm === 'signup'} mountOnEnter={true} unmountOnExit={true}>
        <Form onSubmit={this.handleLoginSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nickname">Nickname</Label>
            <Input type="nickname" name="nickname" id="nickname" placeholder="Nickname"
                value={this.state.nickname}
                onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LoaderButton
            className="btn btn-primary"
            block
            bsSize="large"
            disabled={!this.validateFormSignup()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Signup"
            loadingText="Signing up…"
          />
          <NavLink onClick={this.showLoginForm}>Already Registered</NavLink>
        </Form>
      </Zoom >
    )
  }

  renderConfirmationForm() {
    return (
      <Zoom collapse delayIn={1000} when={this.state.currentForm === 'confirmation'} mountOnEnter={true} unmountOnExit={true}>
        <Form onSubmit={this.handleConfirmationSubmit}>
          <label>Confirmation</label>
          <FormGroup>
            <Label for="confirmationCode">Confirmation Code</Label>
            <Input type="text" name="confirmationCode" id="confirmationCode" placeholder="with a placeholder"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
            />
            Please check your email for the code.
          </FormGroup>
          <LoaderButton
            className="btn btn-primary"
            disabled={!this.validateConfirmationForm()}
            type="submit"
            block
            isLoading={this.state.isLoading}
            text="Verify"
            loadingText="Verifying…"
          />            
        </Form>
      </Zoom >
    )
  }

  render() {
    return (
      <Fragment>
        <Button color="primary" outline onClick={this.toggleModal}>Login</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-lg">
          <ModalHeader toggle={this.toggleModal}>
            {this.getModalTitle()}            
          </ModalHeader>
          <ModalBody>

            {this.renderLoginForm()}

            {this.renderSignupForm()}

            {this.renderConfirmationForm()}

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.showSignupForm}>Create an Account</Button>{' '}
            <Button color="primary" onClick={this.showLoginForm}>Login Form</Button>{' '}
            <Button color="primary" onClick={this.showConfirmationForm}>Confirmation Form</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>        
      </Fragment>
    );
  }
}