import React, { Component, Fragment } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import { API } from "aws-amplify";
import { Button } from 'reactstrap';
import { navigate } from '@reach/router';
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
  
  handleNewPost = async event => {
    navigate('/posts/new')
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
                edit={true}
                postId={post.postId}
              />
            </Fragment>
          : <div><Button color="primary" onClick={this.handleNewPost}>Create a New Post</Button><br/><br/></div>
    );
  }

  renderPosts() {
    return (
      <div className="posts">
        <h2>Admin Area</h2>
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