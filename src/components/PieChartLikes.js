import React, { Fragment } from "react";
import Chart from "react-google-charts";

const pieOptions = {
  title: "Title",
  pieHole: 0.6,
  slices: [
    { color: "#2BB673" },
    { color: "#d91e48" },
    { color: "#007fad" },
    { color: "#e9a227" }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};

class PieChartLikes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartImageURI: "",
      likes: props.likes ? parseInt(props.likes) : 0, 
      dislikes: props.dislikes ? parseInt(props.dislikes) : 0, 
    };
  }

  render() {
    return (
      <div className="chart-container">
        <Chart
          chartType="PieChart"
          data={[["Feedback", "Count"], ["Likes", this.state.likes || 0], ["Dislikes", this.state.dislikes || 0]]}
          options={pieOptions}
          graph_id={'PieChart' + this.props.id}
          width={"400px"}
          // height={"400px"}
          legend_toggle
        />
      </div>
    );
  }
}

export default PieChartLikes;