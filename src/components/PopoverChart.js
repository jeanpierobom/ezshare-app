import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import ExamplePieChart from './ExamplePieChart';

class PopoverChart extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
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
        <Button className="mr-1" color="secondary" id={'Popover-' + this.props.id} type="button">
          ...
        </Button>
        <Popover placement='bottom' trigger="focus" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
          <PopoverHeader>Engagement</PopoverHeader>
          <PopoverBody>
            <ExamplePieChart id={this.props.id} />            
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

export default PopoverChart;
