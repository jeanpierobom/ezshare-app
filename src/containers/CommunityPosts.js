import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API, Storage } from "aws-amplify";

import "./Home.css";

export default class CommunityPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: []
    };
  }

  async componentDidMount() {
    // if (!this.props.isAuthenticated) {
    //   return;
    // }
  
    try {
      const posts = await this.posts();
      console.log('posts: ' + posts);

      if (posts) {
        for (let post of posts) {
          const { attachment } = post;
          if (attachment) {
            let attachmentURL = await Storage.vault.get(attachment);
            post.attachmentURL = attachmentURL;
          }
        }
      }

      this.setState({ posts });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  posts() {
    console.log('Request Posts!')
    return API.get("community-posts", "/community-posts");
  }

  renderPostsList(posts) {
    return [{}].concat(posts).map(
      (post, i) =>
        i !== 0
          ? this.renderPost(post)
          : this.renderButton()
    );
  }

  renderButton() {
    return (
      <LinkContainer key="new" to="/posts/new">
        <ListGroupItem>
          <h4>
            <b>{"\uFF0B"}</b> Create a new post
          </h4>
        </ListGroupItem>
      </LinkContainer>      
    )
  }

  renderPost(post) {
    let attachmentURL;
    const { content, attachment } = post;


    return (
      <LinkContainer
        key={post.postId}
        to={`/posts/${post.postId}`}
      >
        <ListGroupItem header={post.content.trim().split("\n")[0]}>
          {"Created: " + new Date(post.createdAt).toLocaleString()}
          image here {post.attachment} <img src={post.attachmentURL}></img>
        </ListGroupItem>
      </LinkContainer>      
    )
  }

  renderPosts() {
    return (
      <div className="posts">
        <PageHeader>Your Posts</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderPostsList(this.state.posts)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.renderPosts()}
      </div>
    );
  }
}