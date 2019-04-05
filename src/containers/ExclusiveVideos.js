import React, { Component } from "react";
import posed from 'react-pose';
import Config from '../components/Config'
import Post from '../components/Post'

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const P = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

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
    
    vimeoClient.request({
        path: '/channels/1442087/videos',
        //path: '/me/videos',
        query: {
          fields: 'uri,name,description,duration,created_time,modified_time,pictures,metadata,stats'
          // fields: 'uri,name,metadata'
        }
      }, (error, body, status_code, headers) => {
      if (error) {
        console.log(error);
      } else {
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
      <Container>
        <h2>Exclusive Videos</h2>
        {this.state.data.map(
            (item, i) =>
            <P key={Math.random()}>
              <Post
                thumbnail={item.pictures.sizes[5].link}
                title={item.name}
                content={item.description}
                date={item.created_time}
                source="exclusive"
                renderLinks={true}
                viewCount={4}
                postId={item.uri.replace('/videos/', '')}
              />
            </P>
        )}
      </Container>
    )
  }
}