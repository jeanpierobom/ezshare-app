import React, { Component, Fragment } from "react";
import { API } from "aws-amplify";
import Post from '../components/Post';
import CommunityPost from '../components/CommunityPost';
import YouTubeFacade from "../model/YouTubeFacade";
import LogoYouTube from '../images/youtube.png'
import LogoTwitch from '../images/twitch.png'
import LogoFacebook from '../images/facebook.png'
import LogoInstagram from '../images/instagram.jpg'
import LogoTwitter from '../images/twitter.png'
import AwsConfig from "../util/AwsConfig";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingYouTube: true,
      isLoadingExclusive: true,
      isLoadingCommunity: true,
      isLoadingAll: true,

      videoPosts: [],
      popularPost: null,
      lastYoutubePost: null,
      lastCommunityPost: null,

      communityPosts: [],
      youtubeIdList: [],
      youtubeVideos: []
    };
  }

  async componentDidMount() {
    try {
      const videoPosts = await YouTubeFacade.getPosts();
      this.setState({ videoPosts });

      const popularPost = await YouTubeFacade.getPopularPost();
      this.setState({ popularPost });

      const lastYoutubePost = await YouTubeFacade.getLastPost();
      this.setState({ lastYoutubePost });

      this.setState({ isLoadingYouTube: false });
    } catch (e) {
      //TODO show notification
      alert(e);
    }

    // Retrieve community posts
    try {
      const communityPosts = await this.getCommunityPosts();
      this.setState({ communityPosts });
    } catch (e) {
      //TODO show notification
      alert(e);
    }

    // Retrieve the last community post
    try {
      const lastCommunityPost = await this.state.communityPosts[0];
      this.setState({ lastCommunityPost });
    } catch (e) {
      //TODO show notification
      alert(e);
    }

    this.setState({ isLoadingCommunity: false });
    this.setState({ isLoadingAll: false });
  }
  
  getCommunityPosts() {
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
        thumbnail={AwsConfig.s3.BUCKET_URL + post.attachment}
        title={post.content}
        content={post.content}
        date={post.createdAt}
      />
    )
  }

  renderLastPosts() {
    const post = this.state.popularPost;
    const lastYoutubePost = this.state.lastYoutubePost;
    const lastCommunityPost = this.state.lastCommunityPost;
    return (
      lastYoutubePost && lastCommunityPost && post &&
      <Fragment>
        <Post key={Math.random()}
          thumbnail={lastYoutubePost.thumbnail}
          title={lastYoutubePost.title}
          content={lastYoutubePost.description}
          viewCount={lastYoutubePost.viewCount}
          date={lastYoutubePost.date}
          postLayout="vertical"
        />

        <Post key={Math.random()}
          thumbnail={AwsConfig.s3.BUCKET_URL + lastCommunityPost.attachment}
          title={lastCommunityPost.content}
          content={lastCommunityPost.content}
          date={lastCommunityPost.createdAt}
          viewCount={-1}
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

  renderVideoPosts() {
    return this.state.videoPosts.map(
      (post, i) => this.renderVideoPost(post)
    );
  }

  renderVideoPost(videoPost) {
    return (
      (!this.state.popularPost || (this.state.popularPost && this.state.popularPost.title !== videoPost.title)) && 
      <Post key={Math.random()}
        thumbnail={videoPost.thumbnail}
        title={videoPost.title}
        content={videoPost.description}
        viewCount={videoPost.viewCount}
        date={videoPost.date}
        postLayout="video"
      />
    )
  }

  renderCommunityPosts() {
    return this.state.communityPosts.map(
      (post, i) => this.renderCommunityPost(post)
    );
  }

  renderCommunityPost(communityPost) {
    return (      
      <CommunityPost
        thumbnail={AwsConfig.s3.BUCKET_URL + communityPost.attachment}
        title={communityPost.content}
        content={communityPost.content}
        date={communityPost.createdAt}
        postLayout="vertical"
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
            <div className="social-box">
              <img src={LogoYouTube} className="logo-social" alt="YouTube" />
              <span className="social-button">SUBSCRIBE 322K</span>
            </div>
            <div className="social-box">
              <img src={LogoTwitch} className="logo-social" alt="Twitch" />
              <span className="social-button">WATCH 299K</span>
            </div>
            <div className="social-box">
              <img src={LogoFacebook} className="logo-social" alt="Facebook" />
              <span className="social-button">LIKE 59K</span>
            </div>
            <div className="social-box">
              <img src={LogoInstagram} className="logo-social" alt="Instagram" />
              <span className="social-button">FOLLOW 156K</span>
            </div>
            <div className="social-box">
              <img src={LogoTwitter} className="logo-social" alt="Twitter" />
              <span className="social-button">FOLLOW 81K</span>
            </div>
          </section>
        </section>
        <section className="last-posts">
          {!this.state.isLoadingAll && this.renderLastPosts()}        
        </section>
        <section className="old-posts">
          <section className="old-posts-videos">
            {!this.state.isLoadingYouTube && this.renderVideoPosts()}
          </section>

          <section className="old-posts-community">
            {!this.state.isLoadingCommunity && this.renderCommunityPosts()}
          </section>
        </section>
      </div>
    );
  }
}