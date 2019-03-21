import React, { Component, Fragment } from 'react';
import { Badge, Button } from 'reactstrap';
import PopoverChart from '../components/PopoverChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navigate } from '@reach/router';
import DateUtil from '../util/DateUtil';
import LoaderButton from "../components/LoaderButton";
import PostBadge from "../components/PostBadge";
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
            edit: props.edit,
            postId: props.postId
        }
    }

    componentDidMount() {
        const id = _.uniqueId('post_');
        this.setState({ id });
    }

    handleEdit = async (event, postId) => {
        event.preventDefault();
        this.setState({ isEditing: true });
        navigate(`/posts/${postId}`);
    }

    render() {        
        const { thumbnail, title, content, date, viewCount, likes, dislikes, postLayout} = this.state
        var d = new Date(Date.parse(date));
        const dateAsString = DateUtil.age(d);
        return (
            <div className={`post post-${postLayout}`}>
                <div className="post-image">
                    <img className="img-post" src={thumbnail} alt={title} />
                </div>
                <div className="post-body">
                    <h3 className="card-title">{title}</h3>
                    <PostBadge />
                    <Button className="mr-1" color="light">
                        <FontAwesomeIcon icon="eye"/> {viewCount}
                    </Button>
                    <Button className="mr-1" color="light">
                        <FontAwesomeIcon icon="thumbs-up"/> {likes}
                    </Button>
                    <Button className="mr-1" color="light">
                        <FontAwesomeIcon icon="thumbs-down"/> {dislikes}
                    </Button>
                    { (this.state.edit ? 
                        <LoaderButton
                            bsStyle="primary"
                            onClick={event => { this.handleEdit(event, this.state.postId) }}
                            text="Edit"
                        />
                    : <Fragment /> )}
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