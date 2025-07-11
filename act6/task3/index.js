import { scatterPlot } from './scatterPlot.js';
import { shapeLegend } from './shapeLegend.js';

const svg = d3
  .select('#container')
  .append('svg')
  .attr('width', 800)
  .attr('height', 500);

const render = (data) => {
  scatterPlot(svg, {
    data,
    xValue: (d) => d.sepal_length,
    yValue: (d) => d.petal_length,
    shapeValue: (d) => d.species,
    xLabel: 'Sepal Length',
    yLabel: 'Petal Length',
    width: 800,
    height: 500,
  });

  shapeLegend(svg, {
    color: d3.scaleOrdinal(d3.schemeCategory10),
    shapeScale: d3
      .scaleOrdinal()
      .domain(['setosa', 'versicolor', 'virginica'])
      .range(['circle', 'cross', 'diamond']),
    spacing: 30,
    x: 650,
    y: 50,
  });
};

d3.csv(
  'https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv',
).then((data) => {
  data.forEach((d) => {
    d.sepal_length = +d.sepal_length;
    d.petal_length = +d.petal_length;
  });
  render(data);
});
