import React, { Component } from "react";
import posed from 'react-pose';
import Post from '../components/Post'
import Config from '../components/Config'

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
    // Retrieve Exclusive posts
    const exclusivePosts = [];
    var Vimeo = require('vimeo').Vimeo;
    const vimeoClient = new Vimeo(Config.VIMEO_CLIENT_ID, Config.VIMEO_CLIENT_SECRET, Config.VIMEO_ACCESS_TOKEN);
    await vimeoClient.request({
        path: '/channels/1442087/videos',
        query: { page: 1, per_page: 6, fields: 'uri,name,description,duration,created_time,modified_time,pictures' }
      }, (error, body, status_code, headers) => {
      if (error) {
        console.log(error);
      } else {
        body.data.forEach(item => {
          exclusivePosts.push(item)
        })
        this.setState({ exclusivePosts })
        const currentPost = this.state.exclusivePosts.filter(post => post.uri.replace('/videos/', '') === this.state.postId)[0];
        this.setState({ isLoading: false, currentPost });
      }
    });

  }
  
  renderCurrentPost() {
    const { currentPost } = this.state;
    return (
      <div>
        <P>
          <Post key={Math.random()}
            thumbnail={currentPost.pictures.sizes[5].link}
            title={currentPost.name}
            content={currentPost.description}
            viewCount={currentPost.viewCount}
            date={currentPost.created_time}
            source="exclusive"
            viewCount={4}
            postId={currentPost.uri.replace('/videos/', '')}
            renderExclusiveVideo={true}  
          />
        </P>
      </div>
    )
}

  render() {
    return (
      <Container>
        <h2>Exclusive Video</h2>
        {!this.state.isLoading && this.renderCurrentPost()}
      </Container>
    );
  }
}