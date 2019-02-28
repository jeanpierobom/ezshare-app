import React, { Component } from 'react';
import "./Post.css";

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            thumbnail: props.thumbnail,
            title: props.title,
            content: props.content,
        }
    }

    render() {
        const { thumbnail, title, content, date } = this.state
        return (
            <div className="post">
                <img className="card-img-top" src={thumbnail} alt={title} />
                <div class="post-body">
                    <h3 className="card-title">Title {title}</h3>
                    <small className="text-muted">Last updated 3 mins ago date {date}</small>
                    <p className="card-text">This content is a little bit longer. {content}</p>
                </div>
            </div>
        )
    }
}

export default Post