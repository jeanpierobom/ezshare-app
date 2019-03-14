import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Location } from '@reach/router';
import { navigate } from "@reach/router"
import posed, { PoseGroup } from 'react-pose';
import { Auth } from "aws-amplify";
import {
  Button,
  Collapse,
  Form,
  Input,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AwsSetup from './util/AwsSetup';
import IconSetup from './util/IconSetup';

import Admin from "./containers/Admin";
import All from "./containers/All";
import CommunityPosts from "./containers/CommunityPosts";
import ExclusiveVideos from "./containers/ExclusiveVideos";
import Home from "./containers/Home";
import NewPost from "./containers/NewPost";
import Posts from "./containers/Posts";
import Signup from "./containers/Signup";
import YouTubeVideos from "./containers/YouTubeVideos";
  
import LoginModal from './components/LoginModal'
import Logo from './images/logo.png'
  
import About from './pages/about';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import Contact from './pages/contact';

import './css/styles.css';


const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: 300 },
  exit: { opacity: 0 }
});

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

AwsSetup.setup();
IconSetup.setup();

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      isOpen: false,
      modal: false
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
    navigate('/')
  }

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
        <div id="site-container">
        <header>
          <Navbar color="light" light expand="md">
            <Link to="/">
              <img src={Logo} className="logo" alt="Ez Share" />
            </Link>
            <NavbarToggler onClick={this.toggleMenu} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/all" className="nav-link">All Posts</Link>
                </NavItem>
                <NavItem>
                  <Link to="/youtube-videos" className="nav-link">YouTube Videos</Link>
                </NavItem>
                <NavItem>
                  <Link to="/exclusive-videos" className="nav-link">Exclusive Videos</Link>
                </NavItem>
                <NavItem>
                  <Link to="/community-posts" className="nav-link">Community Posts</Link>
                </NavItem>
                <NavItem>
                  <Form inline>
                    <Input type="search" className="mr-3" placeholder="Search" />
                  </Form>
                </NavItem>              
                <NavItem>
                  {this.state.isAuthenticated
                      ? <Button color="secondary" outline onClick={this.handleLogout}>Logout</Button>
                      : <LoginModal
                          isAuthenticated={this.isAuthenticated}
                          showSignupForm={this.showSignupForm}
                          userHasAuthenticated={this.userHasAuthenticated}
                          history={this.history}
                        />
                    }
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </header>

        <div id="content-container">
          <PosedRouter>
            <Home path="/" />
            <About path="/about" />
            <All path="/all" props={childProps} />
            <YouTubeVideos path="/youtube-videos" />
            <ExclusiveVideos path="/exclusive-videos" />
            <CommunityPosts path="/community-posts" />
            <Admin path="/admin" />
            <Signup path="/signup" />
            <NewPost path="/posts/new" />
            <Posts path="/posts/:id" />

            <Terms path="/terms" />
            <Privacy path="/privacy" />
            <Contact path="/contact" />

          </PosedRouter>
        </div>

        <footer>
          <Nav>
            <NavItem>
              <Link to="/terms">Terms and Conditions</Link>
            </NavItem>
            <NavItem>
              <Link to="/privacy">Privacy</Link>
            </NavItem>
            <NavItem>
              <Link to="/contact">Contact Us</Link>
            </NavItem>
            <NavItem>
              <FontAwesomeIcon icon="copyright"/>
              Copyright 2019
            </NavItem>
          </Nav>
          
        </footer>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
