import React, { Component, Fragment } from "react";
import { API } from "aws-amplify";
import Post from '../components/Post';
import YouTubeFacade from "../model/YouTubeFacade";
import LogoYouTube from '../images/youtube.png'
import LogoTwitch from '../images/twitch.png'
import LogoFacebook from '../images/facebook.png'
import LogoInstagram from '../images/instagram.jpg'
import LogoTwitter from '../images/twitter.png'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingYouTube: true,
      youtubePosts: [],
      popularPost: null,

      posts: [],
      youtubeIdList: [],
      youtubeVideos: []
    };
  }

  async componentDidMount() {
    try {
      const youtubePosts = await YouTubeFacade.getPosts();
      this.setState({ youtubePosts });

      const posts = await this.posts();
      this.setState({ posts });

      const popularPost = await YouTubeFacade.getPopularPost();
      this.setState({ popularPost });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoadingYouTube: false });
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
      <Post key={Math.random()}
        thumbnail={'https://s3.amazonaws.com/ezshare-posts-uploads/public/' + post.attachment}
        title={post.content}
        content={post.content}
        date={post.createdAt}
      />
    )
  }

  renderLastPosts() {
    const post = this.state.popularPost;
    return (
      post &&
      <Fragment>
        <Post key={Math.random()}
          thumbnail={post.thumbnail}
          title={post.title}
          content={post.description}
          viewCount={post.viewCount}
          date={post.date}
          postLayout="vertical"
        />

        <Post key={Math.random()}
          thumbnail={post.thumbnail}
          title={post.title}
          content={post.description}
          viewCount={post.viewCount}
          date={post.date}
          postLayout="vertical"
        />

        <Post key={Math.random()}
          thumbnail={post.thumbnail}
          title={post.title}
          content={post.description}
          viewCount={post.viewCount}
          date={post.date}
          postLayout="vertical"
        />
      </Fragment> 
    )
  }

  renderPopularPost() {
    const post = this.state.popularPost;
    return (
      post && 
      <Post key={Math.random()}
        thumbnail={post.thumbnail}
        title={post.title}
        content={post.description}
        viewCount={post.viewCount}
        date={post.date}
      />
    )
  }

  renderYouTubePosts() {
    return this.state.youtubePosts.map(
      (post, i) => this.renderYouTubePost(post)
    );
  }

  renderYouTubePost(youTubePost) {
    return (
      this.state.popularPost.title !== youTubePost.title && 
      <Post key={Math.random()}
        thumbnail={youTubePost.thumbnail}
        title={youTubePost.title}
        content={youTubePost.description}
        viewCount={youTubePost.viewCount}
        date={youTubePost.date}
      />
    )
  }

  render() {
    return (
      <div className="home">
        <section className="hero">
          <section className="popular-post">
            {!this.state.isLoadingYouTube && this.renderPopularPost()}
          </section>
          <section className="social">
            <div class="social-box">
              <img src={LogoYouTube} className="logo-social" alt="YouTube" />
              <span class="social-button">SUBSCRIBE 322K</span>
            </div>
            <div class="social-box">
              <img src={LogoTwitch} className="logo-social" alt="Twitch" />
              <span class="social-button">WATCH 299K</span>
            </div>
            <div class="social-box">
              <img src={LogoFacebook} className="logo-social" alt="Facebook" />
              <span class="social-button">LIKE 59K</span>
            </div>
            <div class="social-box">
              <img src={LogoInstagram} className="logo-social" alt="Instagram" />
              <span class="social-button">FOLLOW 156K</span>
            </div>
            <div class="social-box">
              <img src={LogoTwitter} className="logo-social" alt="Twitter" />
              <span class="social-button">FOLLOW 81K</span>
            </div>
          </section>
        </section>
        <section className="last-posts ">
          {!this.state.isLoadingYouTube && this.renderLastPosts()}        
        </section>
        <section className="old-posts bg-danger">
          <h2>YouTube Posts TEST</h2>
          {!this.state.isLoadingYouTube && this.renderYouTubePosts()}
        </section>
        <section className="last-posts bg-danger">Exclusive Posts TEST</section>
        <section className="older-posts bg-info">Older Posts</section>
        <section className="community-posts bg-light">
          <h2>Community Posts</h2>
          {/* {!this.state.isLoadingYouTube && this.renderPostsList(this.state.posts)} */}
        </section>
      </div>
    );
  }
}