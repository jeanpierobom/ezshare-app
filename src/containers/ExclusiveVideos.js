import React, { Component } from "react";
import Config from '../components/Config'
import Post from '../components/Post'

export default class ExclusiveVideos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: []
    };
  }

  componentDidMount() {
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
              data: items
          })
        }
      });
}
  
  render() {
    return (
        <div>
            <h2>Exclusive Videos</h2>
            {this.state.data.map(
                (item, i) =>
                <Post
                  thumbnail={item.pictures.sizes[5].link}
                  title={item.name}
                  content={item.description}
                  date='date here'
                />
            )}
        </div>
    )
  }
}