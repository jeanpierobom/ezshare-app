import React, { Component } from "react";
import posed from 'react-pose';
import YouTubeFacade from "../model/YouTubeFacade";
import Post from '../components/Post'

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const P = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

export default class YouTubeVideos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: []
    };
  }

  async componentDidMount() {
    const posts = await YouTubeFacade.getPosts();
    this.setState({ isLoading: false, posts });
  }
  
  renderPosts() {
    return (
      <div>
          {this.state.posts.map(
              (post, i) =>
              <P key={Math.random()}>
                <Post
                  thumbnail={post.thumbnail}
                  title={post.title}
                  content={post.description}
                  viewCount={post.viewCount}
                  likes={post.likes}
                  dislikes={post.dislikes}
                  date={post.date}
                  postLayout="video"
                  source="youtube"
                  postId={post.postId}
                  renderLinks={true}
                />
              </P>
          )}
      </div>
    )
}

  render() {
    return (
      <Container>
        <h2>YouTube Videos</h2>
        {!this.state.isLoading && this.renderPosts()}
      </Container>
    );
  }
}