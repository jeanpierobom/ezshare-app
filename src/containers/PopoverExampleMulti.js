import React from 'react';
import PopoverChart from '../components/PopoverChart';

class PopoverExampleMulti extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popovers: [
        {
          placement: 'top',
          text: 'Top'
        },
        {
          placement: 'bottom',
          text: 'Bottom'
        },
        {
          placement: 'left',
          text: 'Left'
        },
        {
          placement: 'right',
          text: 'Right'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        New
        { this.state.popovers.map((popover, i) => {
          return <PopoverChart key={i} item={popover} id={i} />;
        })}
      </div>
    );
  }
}

export default PopoverExampleMulti;