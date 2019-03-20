import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { navigate } from '@reach/router';
import { Auth } from "aws-amplify";
import Header from './components/Header'
import Routes from "./Routes";
import Footer from './components/Footer'
import "./App.css";
import "./containers/Login.css";

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };
  }
  
  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    navigate("/");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Header
          isAuthenticated={this.state.isAuthenticated}
          handleLogout={this.handleLogout}
          showSignupForm={this.showSignupForm}
          userHasAuthenticated={this.userHasAuthenticated}
          childProps={childProps}
          history={this.props.history}
        />
        <Routes childProps={childProps} />
        <Footer />
      </div>
    );
  }

}

export default withRouter(App);
