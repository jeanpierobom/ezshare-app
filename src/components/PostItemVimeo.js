import React, { Component } from 'react';

class PostItemVimeo extends Component {
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
                <img src={item.pictures.sizes[5].link} className="card-img-top" alt={item.name}/>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <a href="#" className="btn btn-primary"> 
                        <i class="fab fa-vimeo"></i> Watch on Vimeo
                    </a>
                </div>
            </div>            
        )
    }
}

export default PostItemVimeo