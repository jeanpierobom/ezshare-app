import React, { Component } from "react";
import posed from 'react-pose';
import { API } from "aws-amplify";
import Post from '../components/Post';
import AwsConfig from "../util/AwsConfig";

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const P = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

export default class PostYouTube extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: [],
      postId: props.postId
    };
  }

  getCommunityPosts() {
    return API.get("community-posts", "/community-posts");
  }

  async componentDidMount() {
    const communityPosts = await this.getCommunityPosts();
    this.setState({ communityPosts });
    const currentPost = communityPosts.filter(post => post.postId === this.state.postId)[0];
    this.setState({ isLoading: false, currentPost });
  }
  
  renderCurrentPost() {
    const { currentPost } = this.state;
    return (
      <div>
        <P>
          <Post key={Math.random()}
            thumbnail={AwsConfig.s3.BUCKET_URL + currentPost.attachment}
            title={currentPost.content}
            content={currentPost.content}
            viewCount={currentPost.viewCount}
            date={currentPost.createdAt}
            source="community"
            postLayout=""
            postId={currentPost.postId}
          />
        </P>
      </div>
    )
}

  render() {
    return (
      <Container>
        <h2>Community Post</h2>
        {!this.state.isLoading && this.renderCurrentPost()}
      </Container>
    );
  }
}