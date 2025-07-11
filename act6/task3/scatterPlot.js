import {
  axisBottom,
  axisLeft,
  scaleLinear,
  scaleOrdinal,
  symbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
} from 'd3';

export const scatterPlot = (
  svg,
  {
    data,
    xValue,
    yValue,
    shapeValue,
    xLabel,
    yLabel,
    width,
    height,
  },
) => {
  svg.selectAll('*').remove(); // Clear svg

  const margin = {
    top: 50,
    right: 160,
    bottom: 60,
    left: 70,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const shapeScale = scaleOrdinal()
    .domain(['setosa', 'versicolor', 'virginica'])
    .range([symbolCircle, symbolCross, symbolDiamond]);

  const g = svg
    .append('g')
    .attr(
      'transform',
      `translate(${margin.left},${margin.top})`,
    );

  g.append('g')
    .call(axisLeft(yScale))
    .append('text')
    .attr('y', -40)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text(yLabel);

  g.append('g')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(axisBottom(xScale))
    .append('text')
    .attr('x', innerWidth / 2)
    .attr('y', 40)
    .attr('fill', 'black')
    .text(xLabel);

  g.selectAll('path.shape')
    .data(data)
    .join('path')
    .attr('class', 'shape')
    .attr(
      'transform',
      (d) =>
        `translate(${xScale(xValue(d))},${yScale(yValue(d))})`,
    )
    .attr(
      'd',
      d3
        .symbol()
        .type((d) => shapeScale(shapeValue(d)))
        .size(100),
    )
    .attr('fill', 'black');
};
