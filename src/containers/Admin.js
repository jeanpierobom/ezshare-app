import React, { Component, Fragment } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import { API } from "aws-amplify";
import { Link, navigate } from '@reach/router';
import { NavItem } from 'reactstrap';
import LoaderButton from "../components/LoaderButton";
import Post from '../components/Post';

export default class Admin extends Component {
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
      console.log(posts);
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
          ? <Fragment>
              <Post
                thumbnail={'https://s3.amazonaws.com/ezshare-posts-uploads/public/' + post.attachment}
                title={post.content}
                content={post.content}
                date={post.createdAt}
                viewCount={0}
              />
              <NavItem>
                <Link to={`/posts/${post.postId}`} className="nav-link">Edit</Link>
              </NavItem>
              <NavItem>
                <Link to={`/posts/${post.postId}`} className="nav-link">Delete</Link>
              </NavItem>
              <LoaderButton
                block
                bsStyle="danger"
                bsSize="large"
                isLoading={this.state.isDeleting}
                onClick={this.handleDelete}
                text="Delete"
                loadingText="Deleting…"
              />



            </Fragment>

          : <NavItem>
              <Link to="/posts/new" className="nav-link">Create a New Post</Link>
            </NavItem>
    );
  }

  handleDelete = async event => {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    this.setState({ isDeleting: true });
  
    try {
      await this.deleteNote();
      navigate("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  deleteNote() {
    return API.del("community-posts", `/${this.props.id}`);
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