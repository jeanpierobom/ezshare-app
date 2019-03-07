import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
// import MainMenu from './components/MainMenu'
import Header from './components/Header'
import Routes from "./Routes";
// import LoginModal from './components/LoginModal';
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
    this.props.history.push("/");
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
          userHasAuthenticated={this.userHasAuthenticated}
          childProps={childProps} 
        />
        {/* <MainMenu
          isAuthenticated={this.state.isAuthenticated}
          handleLogout={this.handleLogout}
          childProps={childProps} 
        /> */}
        <Routes childProps={childProps} />
        <Footer />
        {/* <LoginModal
          isAuthenticated={this.state.isAuthenticated}
          userHasAuthenticated={this.userHasAuthenticated}
          childProps={childProps} 
        /> */}
      </div>
    );
  }

}

export default withRouter(App);
