import React from "react";
import Chart from "react-google-charts";

const pieOptions = {
  title: "Title",
  pieHole: 0.6,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
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

class ExamplePieChart extends React.Component {
  state = {
    chartImageURI: ""
  };
  render() {
    return (
      <Chart
        chartType="PieChart"
        data={[["", ""], ["Likes", 12], ["Dislikes", 3]]}
        options={pieOptions}
        graph_id={'PieChart' + this.props.id}
        width={"100%"}
        // height={"400px"}
        legend_toggle
      />
    );
  }
}

export default ExamplePieChart;