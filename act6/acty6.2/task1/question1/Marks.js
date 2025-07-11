const Marks = (selection, props) => {
  const { data, xScale, yScale, xValue, yValue, tooltipFormat } = props;

  // Debug
  console.log("Creating marks with data:", data.slice(0, 3));
  console.log("xScale domain:", xScale.domain());
  console.log("yScale domain length:", yScale.domain().length);

  // Remove any existing bars
  selection.selectAll(".mark").remove();

  // Create new bars for each data point
  selection
    .selectAll(".mark")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "mark")
    .attr("x", 0)
    .attr("y", (d) => yScale(yValue(d)))
    .attr("width", (d) => xScale(xValue(d)))
    .attr("height", yScale.bandwidth())
    .append("title")
    .text((d) => `${d.country}: ${tooltipFormat(xValue(d))}`);
};
