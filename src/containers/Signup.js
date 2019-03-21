import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import LoaderButton from "../components/LoaderButton";
import { navigate } from "@reach/router";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
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

  handleCancel = event => {
    navigate('/');
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
      navigate("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <Card>
          <CardHeader>
            <h2>Confirmation</h2>    
          </CardHeader>
          <CardBody>
            <CardText>
              <FormGroup controlId="confirmationCode" bsSize="large">
                <ControlLabel>Confirmation Code</ControlLabel>
                <FormControl
                  autoFocus
                  type="tel"
                  value={this.state.confirmationCode}
                  onChange={this.handleChange}
                />
                <HelpBlock>Please check your email for the code.</HelpBlock>
              </FormGroup>
              <LoaderButton
                className="btn btn-primary"
                block
                bsSize="large"
                disabled={!this.validateConfirmationForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Verify"
                loadingText="Verifying…"
              />
            </CardText>
          </CardBody>
          <CardFooter>
            <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
          </CardFooter>
        </Card>
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardHeader>
            <h2>Sign Up</h2>    
          </CardHeader>
          <CardBody>
            <CardText>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="nickname" bsSize="large">
                <ControlLabel>Nickname</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.nickname}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <FormGroup controlId="confirmPassword" bsSize="large">
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <LoaderButton
                className="btn btn-primary"
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Signup"
                loadingText="Signing up…"
              />
            </CardText>
          </CardBody>
          <CardFooter>
            <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
          </CardFooter>
        </Card>
      </form>
    );
  }

  render() {
    return (
      <div className="form-signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}