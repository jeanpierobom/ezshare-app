import YouTubeConfig from './YouTubeConfig';

const endpointSearch = 'https://www.googleapis.com/youtube/v3/search/';
const endpointVideos = 'https://www.googleapis.com/youtube/v3/videos/';

const YouTubeSetup = {
  videosIdUrl: `${endpointSearch}?key=${YouTubeConfig.API_KEY}&channelId=${YouTubeConfig.CHANNEL_ID}&part=id&order=date&maxResults=${YouTubeConfig.MAX_RESULTS}`,
  videosUrl(videosId) {
    return `${endpointVideos}?key=${YouTubeConfig.API_KEY}&part=snippet,statistics&id=${videosId}&order=date`
  }
}

export default YouTubeSetup;


