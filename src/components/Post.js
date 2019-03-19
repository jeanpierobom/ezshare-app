import React, { Component, Fragment } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PopoverChart from '../components/PopoverChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DateUtil from '../util/DateUtil'; 
var _ = require('lodash/core');

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            thumbnail: props.thumbnail,
            title: props.title,
            content: props.content,
            viewCount: props.viewCount || 0,
            likes: props.likes || 0,
            dislikes: props.dislikes || 0,
            date: props.date,
            postLayout: props.postLayout || 'horizontal',
        }
    }

    componentDidMount() {
        const id = _.uniqueId('post_');
        this.setState({ id });
    }

    render() {        
        const { thumbnail, title, content, date, viewCount, likes, dislikes, postLayout} = this.state
        var d = new Date(Date.parse(date));
        d.toString(); // => Wed Jan 11 2012 15:49:59 GMT-0500 (EST)
        d.getTime(); // => 1326314999415
        const dateAsString = DateUtil.age(d);
        return (
            <div className={`post post-${postLayout}`}>
                <div className="post-image">
                    <img className="img-post" src={thumbnail} alt={title} />
                </div>
                <div className="post-body">
                    <h3 className="card-title">{title}</h3>
                    <Button className="mr-1" color="light">
                        <FontAwesomeIcon icon="eye"/> {viewCount}
                    </Button>
                    <Button className="mr-1" color="light">
                        <FontAwesomeIcon icon="thumbs-up"/> {likes}
                    </Button>
                    <Button className="mr-1" color="light">
                        <FontAwesomeIcon icon="thumbs-down"/> {dislikes}
                    </Button>
                    {likes > 0 || dislikes > 0
                        ? <PopoverChart key={this.state.id} id={this.state.id} likes={likes} dislikes={dislikes} />
                        : <Fragment />
                    }<br/>
                    <small className="text-muted">{dateAsString}</small>
                    <p className="text-post">{content}</p>
                </div>
            </div>
        )
    }
}

export default Post