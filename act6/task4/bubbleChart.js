const margin = { top: 50, right: 30, bottom: 60, left: 70 },
  width = 900 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

const svg = d3
  .select('#chart')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr(
    'transform',
    `translate(${margin.left},${margin.top})`,
  );

d3.csv('globalCities.csv').then((data) => {
  data.forEach((d) => {
    d.population = +d.population;
    d.area = +d.area;
    d.density = d.population / d.area;
  });

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.area)])
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.population)])
    .range([height, 0]);

  const r = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.density)])
    .range([4, 40]);

  const color = d3.scaleOrdinal(d3.schemeTableau10);

  // Axes
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append('g').call(d3.axisLeft(y));

  // Labels
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', height + 45)
    .attr('text-anchor', 'middle')
    .text('Area (km²)');

  svg
    .append('text')
    .attr('x', -height / 2)
    .attr('y', -50)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Population (millions)');

  // Bubbles
  svg
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d.area))
    .attr('cy', (d) => y(d.population))
    .attr('r', (d) => r(d.density))
    .style('fill', (d) => color(d.region))
    .style('opacity', 0.7)
    .attr('stroke', '#333');

  // Legend (optional)
});