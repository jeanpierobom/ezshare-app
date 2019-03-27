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
import Config from '../components/Config'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingYouTube: true,
      isLoadingExclusive: true,
      isLoadingCommunity: true,
      isLoadingAll: true,

      videoPosts: [],
      exclusivePosts: [],
      popularPost: null,
      lastYoutubePost: null,
      lastCommunityPost: null,

      communityPosts: [],
      youtubeIdList: [],
      youtubeVideos: [],
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

    // Retrieve exclusive posts
    try {
      await this.getExclusivePosts();
    } catch (e) {
      //TODO show notification
      alert(e);
    }

    this.setState({ isLoadingExclusive: false });
    
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

  getExclusivePosts() {
    var Vimeo = require('vimeo').Vimeo;
    const vimeoClient = new Vimeo(Config.VIMEO_CLIENT_ID, Config.VIMEO_CLIENT_SECRET, Config.VIMEO_ACCESS_TOKEN);
    
    vimeoClient.request(/*options*/{
        // This is the path for the videos contained within the staff picks
        // channels
        //path: '/channels/staffpicks/videos',
        path: '/channels/1442087/videos',
        // This adds the parameters to request page two, and 10 items per
        // page
        query: {
          page: 1,
          per_page: 6,
          fields: 'uri,name,description,duration,created_time,modified_time,pictures'
        }
      }, (error, body, status_code, headers) => {
      if (error) {
        console.log('error');
        console.log(error);
      } else {
        console.log('body');
        console.log(body);

        console.log(body.data);
        const items = []
        body.data.forEach(item => {
            items.push(item)
        })

        this.setState({
          exclusivePosts: items
        })

        const lastExclusivePost = items[0];
        this.setState({ lastExclusivePost });
        this.setState({ isLoadingExclusive: false });
      }
    });
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
    const { lastYoutubePost, lastCommunityPost, lastExclusivePost } = this.state;

    return (
      lastYoutubePost && lastCommunityPost && lastExclusivePost &&
      <Fragment>
        <Post key={Math.random()}
          thumbnail={lastYoutubePost.thumbnail}
          title={lastYoutubePost.title}
          content={lastYoutubePost.description}
          viewCount={lastYoutubePost.viewCount}
          likes={lastYoutubePost.likes}
          dislikes={lastYoutubePost.dislikes}
          date={lastYoutubePost.date}
          postLayout="vertical"
          source="youtube"
          postId={lastYoutubePost.postId}
          renderLinks={true}
        />

        <Post key={Math.random()}
          thumbnail={AwsConfig.s3.BUCKET_URL + lastCommunityPost.attachment}
          title={lastCommunityPost.content}
          content={lastCommunityPost.content}
          viewCount={lastCommunityPost.viewCount}
          date={lastCommunityPost.createdAt}
          source="community"
          postLayout="vertical"
          postId={lastCommunityPost.postId}
          renderLinks={true}
        />

        <Post key={Math.random()}
          thumbnail={lastExclusivePost.pictures.sizes[5].link}
          title={lastExclusivePost.name}
          content={lastExclusivePost.description}
          viewCount={lastExclusivePost.viewCount}
          date={lastExclusivePost.date}
          postLayout="vertical"
          renderLinks={true}
          postId={lastExclusivePost.uri.replace('/videos/', '')}
          source="exclusive"
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
        likes={post.likes}
        dislikes={post.dislikes}
        date={post.date}
        source="youtube"
        postId={post.postId}
        renderLinks={true}
      />
    )
  }

  renderVideoPosts() {
    return this.state.videoPosts.map(
      (post, i) => this.renderVideoPost(post)
    );
  }

  renderExclusivePosts() {
    return this.state.exclusivePosts.map(
      (post, i) => this.renderExclusivePost(post)
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
        likes={videoPost.likes}
        dislikes={videoPost.dislikes}
        date={videoPost.date}
        postLayout="video"
        postId={videoPost.postId}
        source="youtube"
        renderLinks={true}
      />
    )
  }

  renderExclusivePost(exclusivePost) {
    return (
      exclusivePost && 
      <Post key={Math.random()}
        thumbnail={exclusivePost.pictures.sizes[5].link}
        title={exclusivePost.name}
        content={exclusivePost.description}
        viewCount={exclusivePost.viewCount}
        likes={exclusivePost.likes}
        dislikes={exclusivePost.dislikes}
        date='date here'
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
      <CommunityPost key={Math.random()}
        thumbnail={AwsConfig.s3.BUCKET_URL + communityPost.attachment}
        title={communityPost.content}
        content={communityPost.content}
        date={communityPost.createdAt}
        postLayout="vertical"
        source="community"
      />
    )
  }

  render() {
    return (
      <div className="home">
        <section className="hero">
          <section className="popular-post">
            <h3 className="section-title">Trending</h3>
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
          <h3 className="section-title">Latest Posts</h3>
          {!this.state.isLoadingAll && this.renderLastPosts()}        
        </section>
        <section className="old-posts">
          <section className="old-posts-videos">
            <h3 className="section-title">Older Posts</h3>
            {!this.state.isLoadingYouTube && this.renderVideoPosts()}
            {/* {!this.state.isLoadingExclusive && this.renderExclusivePosts()} */}
          </section>

          <section className="old-posts-community">
            <h3 className="section-title">Community Posts</h3>
            {!this.state.isLoadingCommunity && this.renderCommunityPosts()}
          </section>
        </section>
      </div>
    );
  }
}