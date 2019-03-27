import React, { Component } from "react";
import posed from 'react-pose';
import { API } from "aws-amplify";
import Post from '../components/Post';

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const P = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

export default class CommunityPosts extends Component {
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
      <P>
        <Post
          thumbnail={'https://s3.amazonaws.com/ezshare-posts-uploads/public/' + post.attachment}
          title={post.content}
          content={post.content}
          date={post.createdAt}
          viewCount={0}
          source="community"
        />
      </P>
    )
  }

  render() {
    return (
      <Container>
        <h2>Community Posts</h2>
        {!this.state.isLoading && this.renderPostsList(this.state.posts)}
      </Container>
    );
  }
}