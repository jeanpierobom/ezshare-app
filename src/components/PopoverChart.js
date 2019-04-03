import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PieChartLikes from './PieChartLikes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class PopoverChart extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      likes: props.likes,
      dislikes: props.dislikes
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <span>
        <Button className="mr-1" color="light" id={'Popover-' + this.props.id} type="button">
          <FontAwesomeIcon icon="chart-bar"/>
        </Button>
        <Popover placement='bottom' trigger="focus" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
          <PopoverHeader>Engagement</PopoverHeader>
          <PopoverBody>
            <span style={{width: '400px'}}>
              <PieChartLikes id={this.props.id} likes={this.props.likes} dislikes={this.props.dislikes} />            
            </span>
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

export default PopoverChart;
