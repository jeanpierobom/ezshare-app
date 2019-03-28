import React, { Component, Fragment } from "react";
import { API } from "aws-amplify";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import { Card, CardHeader, CardColumns, CardBody } from 'reactstrap';
import classnames from 'classnames';
import YouTubeFacade from "../model/YouTubeFacade";
import Config from '../components/Config'
import PieChartLikes from '../components/PieChartLikes';
import { navigate } from '@reach/router';
import Chart from "react-google-charts";
import Post from '../components/Post';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isLoading: true,
      communityPosts: [],
      activeTab: '2',
      youtubePostsCount: 0,
      exclusivePostsCount: 0,
      communityPostsCount: 0,
      youtubePostsLength: 0,
      exclusivePostsLength: 0,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  async componentDidMount() {
    try {
      // Retrieve YouTube posts
      const youtubePosts = await YouTubeFacade.getPosts();
      const youtubePostsCount = youtubePosts ? youtubePosts.length : 0;
      let youtubePostsLength = 0;
      const calendarArray = []
      calendarArray.push([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }])
      calendarArray.push([new Date(2019, 11, 31), 0]);
      if (youtubePosts) {
        youtubePosts.forEach(youtubePost => {
          //let date = new Date(youtubePost.date)
          //console.log(new Date(date.getYear(), date.getMonth(), date.getDay()));
          youtubePostsLength += youtubePost.lengthInMinutes;
          calendarArray.push([new Date(youtubePost.date), 1]);
        })
      }

      // Retrieve Exclusive posts
      const exclusivePosts = [];
      let exclusivePostsLength = 0;
      var Vimeo = require('vimeo').Vimeo;
      const vimeoClient = new Vimeo(Config.VIMEO_CLIENT_ID, Config.VIMEO_CLIENT_SECRET, Config.VIMEO_ACCESS_TOKEN);
      vimeoClient.request({
          path: '/channels/1442087/videos',
          query: { page: 1, per_page: 6, fields: 'uri,name,description,duration,created_time,modified_time,pictures' }
        }, (error, body, status_code, headers) => {
        if (error) {
          console.log(error);
        } else {
          body.data.forEach(item => {
            exclusivePostsLength += item.duration;
            exclusivePosts.push(item)
            calendarArray.push([new Date(item.created_time), 1]);
          })
          const exclusivePostsCount = exclusivePosts.length;
          exclusivePostsLength = exclusivePostsLength < 60 ? 1 : exclusivePostsLength / 60;
          this.setState({ exclusivePosts, exclusivePostsCount, exclusivePostsLength })
        }
      });
  
      const communityPosts = await this.getCommunityPosts();
      const communityPostsCount = communityPosts ? communityPosts.length : 0;
      this.setState({ youtubePosts, youtubePostsCount, youtubePostsLength, communityPosts, communityPostsCount });

      // Iterate over community posts
      if (communityPosts) {
        communityPosts.forEach(communityPost => {
          calendarArray.push([new Date(communityPost.createdAt), 1]);
        })
      }
      this.setState({ calendarArray });

    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  handleNewPost = async event => {
    navigate('/posts/new')
  }

  getCommunityPosts() {
    return API.get("community-posts", "/community-posts");
  }

  renderPostsList(posts) {
    return [{}].concat(posts).map(
      (post, i) =>
        i !== 0
          ? <Fragment>
              <Post
                thumbnail={'https://s3.amazonaws.com/ezshare-posts-uploads/public/' + post.attachment}
                title={post.content}
                content={post.content}
                date={post.createdAt}
                viewCount={0}
                edit={true}
                postId={post.postId}
              />
            </Fragment>
          : <div><Button color="primary" onClick={this.handleNewPost}>Create a New Post</Button><br/><br/></div>
    );
  }

  renderPosts() {
    return (
      <div className="posts">
        {/* <h2>Community Posts</h2> */}
        {!this.state.isLoading && this.renderPostsList(this.state.communityPosts)}
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Community Posts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Dashboard
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <br/>
                  {this.renderPosts()}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <br/>
                  Dashboard

                  <CardColumns>
                    <Card style={{width: '100%'}}>
                      <CardHeader>
                        <div>Posts per Platform</div>
                        <small>Amount of posts created in 2019</small>
                      </CardHeader>
                      <CardBody>
                        <Chart
                          chartType="Bar"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ['Year', 'YouTube', 'Exclusive', 'Community'],
                            ['2019', this.state.youtubePostsCount, this.state.exclusivePostsCount, this.state.communityPostsCount]
                          ]}
                        />
                      </CardBody>
                    </Card>

                    <Card style={{width: '100%'}}>
                      <CardHeader>
                        <div>Video Time</div>
                        <small>Length of videos (in minutes) posted in 2019</small>
                      </CardHeader>
                      <CardBody>
                        <Chart
                          chartType="Bar"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ['Year', 'YouTube', 'Exclusive'],
                            ['2019', this.state.youtubePostsLength, this.state.exclusivePostsLength]
                          ]}
                        />
                      </CardBody>
                    </Card>

                    <Card style={{width: '100%'}}>
                      <CardHeader>
                        <div>User Feedback on YouTube Videos</div>
                        <small>Amount of likes and dislikes in 2019</small>
                      </CardHeader>
                      <CardBody>
                        <PieChartLikes
                          id='youtube-admin-chart'
                          likes={10}
                          dislikes={20}
                        /> 
                      </CardBody>
                    </Card>
                  </CardColumns>

                  {/* <CardColumns> */}
                    <Card style={{width: '100%'}}>
                      <CardHeader>
                        <div>Productivity</div>
                        <small>Posts created in 2019</small>
                      </CardHeader>
                      <CardBody>
                        <Chart
                          chartType="Calendar"
                          loader={<div>Loading Chart</div>}
                          data={ this.state.calendarArray }
                          options={{
                            title: 'Posts Created',
                          }}
                          rootProps={{ 'data-testid': '1' }}
                        />
                      </CardBody>
                    </Card>
                  {/* </CardColumns> */}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}