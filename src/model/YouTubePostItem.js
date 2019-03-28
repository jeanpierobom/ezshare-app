class YouTubePostItem {

  constructor(postId, title, thumbnail, description, viewCount, likes, dislikes, date, lengthInMinutes) {
    this.postId = postId;
    this.title = title;
    this.thumbnail = thumbnail;
    this.description = description;
    this.viewCount = viewCount;
    this.likes = likes;
    this.dislikes = dislikes;
    this.date = date;
    this.lengthInMinutes = lengthInMinutes;
  }

}

export default YouTubePostItem;