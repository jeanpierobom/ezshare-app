import YouTubePostItem from "./YouTubePostItem";
import YouTubeSetup from '../util/YouTubeSetup';
import HttpClient from '../util/HttpClient';

class YouTubeFacade {

  constructor() {
    this.popularPost = null;
    this.lastPost = null;
    this.posts = [];
  }

  async fetchYouTubePosts() {
    // Retrieve a list of video IDs
    const jsonVideosId = await HttpClient.getJson(YouTubeSetup.videosIdUrl);

    // Store all IDs in an array
    const youtubeIdArray = []
    jsonVideosId.items.forEach(item => {
      youtubeIdArray.push(item.id.videoId)
    })
    
    // Retrieve information about videos given all Ids
    const youtubeIdString = await youtubeIdArray.toString();
    const videosUrl = await YouTubeSetup.videosUrl(youtubeIdString);
    const jsonVideos = await HttpClient.getJson(videosUrl);
    console.log('videosUrl: ' + videosUrl);

    // Identify the popular post
    let maxViewCount = 0;

    // Iterate over all videos
    const posts = [];
    await jsonVideos.items.forEach(post => {
      const newPost = new YouTubePostItem(
        post.snippet.title,
        post.snippet.thumbnails.maxres.url,
        post.snippet.description,
        post.statistics.viewCount,
        post.statistics.likeCount,
        post.statistics.dislikeCount,
        post.snippet.publishedAt
      );
      posts.push(newPost);

      // Identify the popular post
      try {
        let viewCount = parseInt(newPost.viewCount);

        if (!this.popularPost) {
          this.popularPost = newPost;
        }

        if (viewCount && viewCount > maxViewCount) {
          maxViewCount = viewCount;
          this.popularPost = newPost;
        }
      } catch (err) {
        //TODO error to identify the popular post
        console.log('//TODO error to identify the popular post');
      }

      // Store the last post
      if (!this.lastPost) {
        this.lastPost = newPost;
      }

    });
    return posts;
  }


  async getPosts() {
    this.posts = await this.fetchYouTubePosts();
    return this.posts;
  }

  getPopularPost() {
    return this.popularPost;
  }

  getLastPost() {
    return this.lastPost;
  }

}

const facade = new YouTubeFacade();
export default facade;