import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API, Storage } from "aws-amplify";

import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: []
    };
  }

  async componentDidMount() {
    try {
      const posts = await this.posts();
      if (posts) {
        for (let post of posts) {
          const { attachment } = post;
          if (attachment) {
            let attachmentURL = await Storage.get(attachment);
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
    return API.get("community-posts", "/community-posts");
  }

  renderPostsList(posts) {
    return [{}].concat(posts).map(
      (post, i) =>
        i !== 0
          ? <LinkContainer
            key={post.postId}
            to={`/posts/${post.postId}`}
          >
            <ListGroupItem header={post.content.trim().split("\n")[0]}>
              {"Created: " + new Date(post.createdAt).toLocaleString()}
              image here {post.attachment} <img src={post.attachmentURL}></img>
            </ListGroupItem>
          </LinkContainer>
          : <LinkContainer
              key="new"
              to="/posts/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new post
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  render() {
    return (
      <div className="Home">
        <div className="posts">
          <PageHeader>Your Posts</PageHeader>
          <ListGroup>
            {!this.state.isLoading && this.renderPostsList(this.state.posts)}
          </ListGroup>
        </div>
      </div>
    );
  }
}