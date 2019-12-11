import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

const BarChart = ({ data }) => {
  return (
    <XYPlot xType="ordinal" width={800} height={300} yDomain={[0, 1]}>
      <XAxis />
      <YAxis />
      <VerticalBarSeries data={data} />
    </XYPlot>
  );
};

export default BarChart;
