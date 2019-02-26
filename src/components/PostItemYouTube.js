import React, { Component } from 'react';

class PostListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: props.item
        }
    }

    render() {
        const { item } = this.state
        return (
            <div className="card">
                <img src={item.snippet.thumbnails.high.url} className="card-img-top" alt={item.snippet.title}/>
                <div className="card-body">
                    <h5 className="card-title">{item.snippet.title}</h5>
                    <p className="card-text">{item.snippet.description}</p>
                    <a href="#" className="btn btn-danger">
                        <i class="fab fa-youtube"></i> Watch on YouTube
                    </a>

                </div>
            </div>            
        )
    }
}

export default PostListItem