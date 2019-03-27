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

export default class PostYouTube extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: [],
      postId: props.postId
    };
  }

  async componentDidMount() {
    const posts = await YouTubeFacade.getPosts();
    const currentPost = posts.filter(post => post.postId === this.state.postId)[0];
    this.setState({ isLoading: false, currentPost });
  }
  
  renderCurrentPost() {
    const { currentPost } = this.state;
    return (
      <div>
        <P>
          <Post key={Math.random()}
            thumbnail={currentPost.thumbnail}
            title={currentPost.title}
            content={currentPost.description}
            viewCount={currentPost.viewCount}
            likes={currentPost.likes}
            dislikes={currentPost.dislikes}
            date={currentPost.date}
            postLayout="video"
            source="youtube"
            renderYoutubeVideo={true}
            postId={currentPost.postId}
          />
        </P>
      </div>
    )
}

  render() {
    return (
      <Container>
        <h2>YouTube Video</h2>
        {!this.state.isLoading && this.renderCurrentPost()}
      </Container>
    );
  }
}