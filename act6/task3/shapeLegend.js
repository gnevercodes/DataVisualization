export const shapeLegend = (
  svg,
  { shapeScale, spacing, x, y },
) => {
  const legend = svg
    .append('g')
    .attr('transform', `translate(${x},${y})`);

  shapeScale.domain().forEach((species, i) => {
    const g = legend
      .append('g')
      .attr('transform', `translate(0, ${i * spacing})`);

    g.append('path')
      .attr(
        'd',
        d3.symbol().type(shapeScale(species)).size(100),
      )
      .attr('fill', 'black');

    g.append('text')
      .attr('x', 20)
      .attr('y', 5)
      .text(species);
  });
};
