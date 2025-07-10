import React from 'react';
import ReactDOM from 'react-dom';
import {
  csv,
  scaleBand,
  scaleLinear,
  max,
  format,
} from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 1000; // Increased width to avoid clipping
const height = 500;
const margin = {
  top: 20,
  right: 20,
  bottom: 65,
  left: 220,
};
const xAxisLabelOffset = 50;

const App = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const top10Countries2000 = data
    .map((d) => ({
      ...d,
      Population: +d['2000'],
    }))
    .sort((a, b) => b.Population - a.Population)
    .slice(0, 10);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'B');

  const maxValue = max(top10Countries2000, xValue);
  const roundedMax = Math.floor(maxValue / 100000) * 100000; // Floor instead of ceil

  const yScale = scaleBand()
    .domain(top10Countries2000.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, roundedMax])
    .range([0, innerWidth]);

  return (
    <svg
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
    >
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          POPULATION - 2000
        </text>
        <Marks
          data={top10Countries2000}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
