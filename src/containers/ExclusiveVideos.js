import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import PostItemVimeo from '../components/PostItemVimeo'
import Config from '../components/Config'


import "./Home.css";

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
        path: '/channels/staffpicks/videos',
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
       
        console.log('status code');
        console.log(status_code);
        console.log('headers');
        console.log(headers);
      });
}
  
  renderPosts() {
    return (
      <div className="posts">
        <PageHeader>Your Posts</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderPostsList(this.state.posts)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
        <div className="card-columns">
            {this.state.data.map(
                (item, i) =>
                <PostItemVimeo key={i} item={item}/>
            )}
        </div>
    )
  }
}