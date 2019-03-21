import React, { Component } from 'react'
import { Badge } from 'reactstrap';

class PostBadge extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Badge href="#" color="danger">Source </Badge>
    )
  }

}

export default PostBadge;