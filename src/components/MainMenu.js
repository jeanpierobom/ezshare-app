import React, { Component } from 'react'
import Logo from '../images/logo.png'

class MainMenu extends Component {
      
    render() {
        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
            <img src={Logo} className="logo" alt="Ez Share" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/all">
                  <i className="fas fa-th-list"></i> 
                  All Posts<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/youtube-videos">
                  <i className="fab fa-youtube"></i> 
                  YouTube Videos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/exclusive-videos">
                  <i className="fas fa-video"></i>
                  Exclusive Videos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/community-posts">
                  <i className="fas fa-users"></i>
                  Community Posts</a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search..." aria-label="Search" />
              </form>
              <ul className="navbar-nav mr-auto">
              {this.props.isAuthenticated
                  ? <li className="nav-item">
                      <a className="nav-link" onClick={this.props.handleLogout}>Logout</a>
                    </li>
                  : <li className="nav-item">
                        <a className="nav-link" href="/login">Sign In</a>
                    </li>
                }
              </ul>
            </div>
          </nav>
        )
    }

}

export default MainMenu