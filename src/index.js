import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Location } from '@reach/router';
import { navigate } from "@reach/router"
import posed, { PoseGroup } from 'react-pose';
import { Auth } from "aws-amplify";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AwsSetup from './util/AwsSetup';
import IconSetup from './util/IconSetup';
import Admin from "./containers/Admin";
import CommunityPosts from "./containers/CommunityPosts";
import ExclusiveVideos from "./containers/ExclusiveVideos";
import Home from "./containers/Home";
import NewPost from "./containers/NewPost";
import Posts from "./containers/Posts";
import Signup from "./containers/Signup";
import YouTubeVideos from "./containers/YouTubeVideos";
import LoginModal from './components/LoginModal'
import PostYouTube from "./containers/PostYouTube";
import PostExclusive from "./containers/PostExclusive";
import PostCommunity from "./containers/PostCommunity";
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

    this.closeMenu = this.closeMenu.bind(this);
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

      // Verify if the user has access to the admin resource
      //TODO implement it with roles in the future 
      try {
        const userInfo = await Auth.currentUserInfo();
        const { attributes } = userInfo;
        if (attributes.email === 'ezgameplays2k19@gmail.com') {
          this.setState({ adminAccess: true });
        }
      } catch (e) {
        alert(e.message);
      }
    } catch(e) {
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
    this.closeMenu()
    navigate('/')
  }

  handleAdminButton = async event => {
    this.closeMenu()
    navigate('/admin')
  }

  closeMenu() {
    this.setState({ isOpen: false });
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
    return (
      !this.state.isAuthenticating &&
      <Fragment>
      <header className="bg-light">
        <div className="headerContainer">
        <Navbar color="light" light expand="md">
          <Link to="/">
            <img src={Logo} className="logo" alt="Ez Share" />
          </Link>
          <NavbarToggler onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/youtube-videos" className="nav-link" onClick={this.closeMenu}>
                  <FontAwesomeIcon icon={['fab', 'youtube']}/>&nbsp;
                  YouTube Videos
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/exclusive-videos" className="nav-link" onClick={this.closeMenu}>
                  <FontAwesomeIcon icon="video"/>&nbsp;
                  Exclusive Videos
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/community-posts" className="nav-link" onClick={this.closeMenu}>
                  <FontAwesomeIcon icon="users"/>&nbsp;
                  Community Posts
                </Link>
              </NavItem>
              <NavItem>
                {this.state.isAuthenticated
                    ? <Fragment>
                        {this.state.adminAccess ? <Button color="primary" onClick={this.handleAdminButton}>Admin Area</Button> : null }
                        { " " }
                        <Button color="secondary" outline onClick={this.handleLogout}>Logout</Button>
                      </Fragment>
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
        </div>
      </header>

      <div id="site-container">

        <div id="content-container">
          <PosedRouter>
            <Home path="/" />
            <About path="/about" />
            <YouTubeVideos path="/youtube-videos" />
            <ExclusiveVideos path="/exclusive-videos" />
            <CommunityPosts path="/community-posts" />
            <PostYouTube path="/post-youtube/:postId" />
            <PostCommunity path="/post-community/:postId" />
            <PostExclusive path="/post-exclusive/:postId" />
            <Admin path="/admin" />
            <Signup
              path="/signup"
              isAuthenticated={this.isAuthenticated}
              userHasAuthenticated={this.userHasAuthenticated}
            />
            <NewPost path="/posts/new" />
            <Posts path="/posts/:id" />
            <Terms path="/terms" />
            <Privacy path="/privacy" />
            <Contact path="/contact" />

          </PosedRouter>
        </div>

        <footer>
          <div className="footerContainer">
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
                <FontAwesomeIcon icon="copyright"/>&nbsp;
                Copyright 2019
              </NavItem>
            </Nav>
          </div>
        </footer>
      </div>
      </Fragment>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
