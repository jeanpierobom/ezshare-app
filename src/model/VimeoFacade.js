import VimeoConfig from '../util/VimeoConfig'

class VimeoFacade {

  constructor() {
    this.lastPost = null;
    this.posts = [];
  }

  async fetchVimeoPosts() {
    var Vimeo = require('vimeo').Vimeo;
    const vimeoClient = new Vimeo(VimeoConfig.VIMEO_CLIENT_ID, VimeoConfig.VIMEO_CLIENT_SECRET, VimeoConfig.VIMEO_ACCESS_TOKEN);
    let posts = null;
    await vimeoClient.request(/*options*/{
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
      }, async (error, body, status_code, headers) => {
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
        posts = items;
      }
    });
    return posts;
  }


  async getPosts() {
    this.posts = await this.fetchVimeoPosts();
    return this.posts;
  }

  getLastPost() {
    return this.lastPost;
  }
}

const facade = new VimeoFacade();
export default facade;