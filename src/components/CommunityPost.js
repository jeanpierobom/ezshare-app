import React, { Component } from 'react';

class CommunityPost extends Component {
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
        const { thumbnail, title, date, viewCount, postLayout } = this.state
        return (
            <div className={`post community-post post-${postLayout}`}>
                <div>
                    <img className="img-post" src={thumbnail} alt={title} />
                </div>
                <div className="post-body">
                    <small className="text-muted">Community</small>
                    <small className="text-muted">{date}</small>
                    <small className="text-muted">{viewCount}</small>
                </div>
            </div>
        )
    }
}

export default CommunityPost