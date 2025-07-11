const AxisLeft = (selection, props) => {
  const { yScale } = props;

  // Create the axis
  const yAxis = d3.axisLeft(yScale);

  // Apply the axis
  selection.call(yAxis);

  // Style elements
  selection.selectAll(".domain").remove();
  selection.selectAll(".tick line").remove();
};
