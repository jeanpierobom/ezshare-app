import React, { Component } from "react";
import { ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Post from '../components/Post'

import "./Home.css";

const apiKey = 'AIzaSyBfYeyN-_gdDYb_vcnZPeXGCHU_KM_OssE'
//const channelId = 'UCQzdMyuz0Lf4zo4uGcEujFw'
const channelId = 'UCDEccmAmLulgzeLOm9zDljQ'
const results = 6


export default class YouTubeVideos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: []
    };
  }

  async componentDidMount() {
    let url = `https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${results}`
    console.log(url)
    // TODO convert to await
    fetch(url)
      .then(response => response.json())
      .then(json => {
          const posts = []
          json.items.forEach(post => {
            posts.push(post)
          })
          this.setState({ posts })
          //TODO avoid repetition
          this.setState({ isLoading: false });
        })
      .catch(error => {
          console.error(error)
          //TODO avoid repetition
          this.setState({ isLoading: false });
        })

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

  renderPosts() {
    return (
      <div>
          {this.state.posts.map(
              (item, i) =>
              <Post
                thumbnail={item.snippet.thumbnails.high.url}
                title={item.snippet.title}
                content={item.snippet.description}
                date='date here'
              />
          )}
      </div>
    )
}

  render() {
    return (
      <div>
        <h2>YouTube Videos</h2>
        {!this.state.isLoading && this.renderPosts()}
      </div>
    );
  }
}