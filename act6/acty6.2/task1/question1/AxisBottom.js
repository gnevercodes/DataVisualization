const AxisBottom = (selection, props) => {
  const { xScale, innerHeight, tickFormat, innerWidth } = props;

  // Create the axis
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(tickFormat)
    .tickSize(-innerHeight)
    .ticks(10);

  // Apply the axis
  selection.call(xAxis);

  // Style elements
  selection.selectAll(".domain").remove();

  // Add axis label
  selection
    .append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth / 2)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .text("POPULATION-2020");
};
