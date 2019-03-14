import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            thumbnail: props.thumbnail,
            title: props.title,
            content: props.content,
            viewCount: props.viewCount,
            date: props.date,
            postLayout: props.postLayout || 'horizontal'
        }
    }

    
    render() {        
        const { thumbnail, title, content, date, viewCount, postLayout } = this.state
        return (
            <div className={`post post-${postLayout}`}>
                <div>
                    <img className="card-img-top" src={thumbnail} alt={title} />
                </div>
                <div className="post-body">
                    <h3 className="card-title">{title}</h3>
                    <small className="text-muted">{date}</small>
                    <p className="card-text">{content}</p>
                    <p className="card-text">{viewCount}</p>
                </div>
            </div>
        )
    }
}

export default Post