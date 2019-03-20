import React from 'react';
import {
  Button,
  Collapse,
  Form,
  Input,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import LoginModal from './LoginModal'
import Logo from '../images/logo.png'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      isOpen: false,
      modal: false
    };
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
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src={Logo} className="logo" alt="Ez Share" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/youtube-videos">YouTube Videos</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/exclusive-videos">Exclusive Videos</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/community-posts">Community Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin">Admin</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/popover">Popover</NavLink>
              </NavItem>
              <NavItem>
                <Form inline>
                  <Input type="search" className="mr-3" placeholder="Search" />
                </Form>
              </NavItem>              
              <NavItem>
                {this.props.isAuthenticated
                    ? <Button color="secondary" outline onClick={this.props.handleLogout}>Logout</Button>
                    : <LoginModal
                        isAuthenticated={this.props.isAuthenticated}
                        showSignupForm={this.props.showSignupForm}
                        userHasAuthenticated={this.props.userHasAuthenticated}
                        history={this.props.history}
                      />
                  }
              </NavItem>              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}