import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API, Storage } from "aws-amplify";
import Post from '../components/Post';

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
    return posts.map(
      (post, i) => this.renderPost(post)
    );
  }

  renderPost(post) {
    return (
      <Post
        thumbnail={'https://s3.amazonaws.com/ezshare-posts-uploads/public/' + post.attachment}
        title={post.content}
        content={post.content}
        date={post.createdAt}
      />
    )
  }

  render() {
    return (
      <div>
        <h2>Community Posts</h2>
        {!this.state.isLoading && this.renderPostsList(this.state.posts)}
      </div>
    );
  }
}