import React from 'react';

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) => (
  <g className="marks">
    {data.map((d) => (
      <rect
        className="mark"
        key={yValue(d)}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </rect>
    ))}
  </g>
);
