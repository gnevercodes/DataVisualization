// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing visualization");

  // Set dimensions
  const width = 960;
  const height = 600;
  const margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 220,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create SVG
  const svg = d3
    .select("#root")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Groups for axes
  const xAxisG = g
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight})`);

  const yAxisG = g.append("g").attr("class", "y-axis");

  // Load and visualize data
  useData()
    .then((data) => {
      console.log("Data loaded, entries:", data.length);

      // Create scales
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.population)])
        .range([0, innerWidth])
        .nice();

      const yScale = d3
        .scaleBand()
        .domain(data.map((d) => d.country))
        .range([0, innerHeight])
        .padding(0.1);

      // Format for axis ticks
      const siFormat = d3.format(".2s");
      const xAxisTickFormat = (tickValue) =>
        siFormat(tickValue).replace("G", "B");

      // Draw axes
      AxisBottom(xAxisG, {
        xScale,
        innerHeight,
        tickFormat: xAxisTickFormat,
        innerWidth,
      });

      AxisLeft(yAxisG, { yScale });

      // Draw bars
      Marks(g, {
        data,
        xScale,
        yScale,
        xValue: (d) => d.population,
        yValue: (d) => d.country,
        tooltipFormat: xAxisTickFormat,
      });
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      d3.select("#root")
        .append("p")
        .attr("style", "color: red; font-weight: bold;")
        .text("Error loading data: " + error.message);
    });
});
