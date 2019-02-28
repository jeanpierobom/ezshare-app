import React, { Component, Fragment } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import $ from 'jquery';
import LoaderButton from "../components/LoaderButton";

class LoginModal extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: false,
          email: "",
          password: ""
        };
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
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
            $('#loginModal').modal('hide')
        } catch (e) {
            alert(e.message);
        }
    }
    
    render() { 
        return (
            <div className="modal fade" id="loginModal" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="Login">
                                <form onSubmit={this.handleSubmit}>
                                    <FormGroup controlId="email" bsSize="large">
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl
                                        autoFocus
                                        type="email"
                                        value={this.state.email}
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
                                    <LoaderButton
                                        className="btn btn-primary"
                                        disabled={!this.validateForm()}
                                        type="submit"
                                        block
                                        isLoading={this.state.isLoading}
                                        text="Login"
                                        loadingText="Logging in…"
                                    />
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="/signup" className="btn btn-outline-success" role="button">Create an Account</a>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginModal