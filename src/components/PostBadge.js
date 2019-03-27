import React, { Component, Fragment } from 'react'
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PostBadge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
    }
  }

  render() {
    return (
      // <Badge href="#" color="danger">
        <Button className="mr-1" color="light">
            <span className="text-muted small"></span>
            {this.state.source === 'youtube' ? <FontAwesomeIcon icon={['fab', 'youtube']}/> : <Fragment/> }
            {this.state.source === 'exclusive' ? <FontAwesomeIcon icon="video"/> : <Fragment/> }
            {this.state.source === 'community' ? <FontAwesomeIcon icon="users"/> : <Fragment/> }
            
        </Button>
      // </Badge>
    )
  }

}

export default PostBadge;