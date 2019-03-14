import YouTubePostItem from "./YouTubePostItem";
import YouTubeSetup from '../util/YouTubeSetup';
import HttpClient from '../util/HttpClient';

class YouTubeFacade {

  constructor() {
    this.popularPost = null;
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

    // Iterate over all videos
    const posts = [];
    await jsonVideos.items.forEach(post => {
      const post4 = new YouTubePostItem(
        post.snippet.title,
        post.snippet.thumbnails.high.url,
        post.snippet.description,
        post.statistics.viewCount,
        post.snippet.publishedAt
      );
      posts.push(post4);
    });
    return posts;
  }


  async getPosts() {
    this.posts = await this.fetchYouTubePosts();
    return this.posts;
  }

  getPopularPost() {
    if (this.posts == null) {
      return null;
    }

    let max = 0;
    this.posts.forEach(post => {
      if (post.viewCount && post.viewCount >= max) {
        max = post.viewCount;
        this.popularPost = post;
      }
    });

    return this.popularPost;
  }

}

const facade = new YouTubeFacade();
export default facade;