import React, { Component } from 'react';
import PopoverChart from '../components/PopoverChart';
var _ = require('lodash/core');

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            thumbnail: props.thumbnail,
            title: props.title,
            content: props.content,
            viewCount: props.viewCount,
            date: props.date,
            postLayout: props.postLayout || 'horizontal',
        }
    }

    componentDidMount() {
        const id = _.uniqueId('post_');
        this.setState({ id });
    }

    render() {        
        const { thumbnail, title, content, date, viewCount, postLayout} = this.state
        return (
            <div className={`post post-${postLayout}`}>
                <div className="post-image">
                    <img className="img-post" src={thumbnail} alt={title} />
                </div>
                <div className="post-body">
                    <h3 className="card-title">{title}</h3>
                    <small className="text-muted">{date}</small>
                    <p className="text-post">{content}</p>
                    <p className="card-text">{viewCount}</p>
                    <PopoverChart key={this.state.id} id={this.state.id} />
                </div>
            </div>
        )
    }
}

export default Post