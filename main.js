/**
 * @see https://bl.ocks.org/arpitnarechania/caeba2e6579900ea12cb2a4eb157ce74
 */
const data = [
  [1, 1, 1, 1],
  [1, 0.8, 1, 0.5],
  [0, 1, 1, 1],
  [1, 1, 1, 0],
];

const rowLabelsData = ['First Row', 'Second Row', 'Third Row', 'Fourth Row'];
const columnLabelsData = [
  'First Column',
  'Second Column',
  'Third Column',
  'Fourth Column',
];

function Matrix(options) {
  const margin = { top: 50, right: 50, bottom: 180, left: 180 },
    width = 350,
    height = 350,
    container = options.container,
    startColor = options.start_color,
    endColor = options.end_color;

  const maxValue = d3.max(data, (layer) => {
    return d3.max(layer, (d) => {
      return d;
    });
  });
  const minValue = d3.min(data, (layer) => {
    return d3.min(layer, (d) => {
      return d;
    });
  });

  const numrows = data.length;
  const numcols = data[0].length;

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const background = svg
    .append('rect')
    .style('stroke', 'black')
    .attr('width', width)
    .attr('height', height);

  const x = d3.scale.ordinal().domain(d3.range(numcols)).rangeBands([0, width]);

  const y = d3.scale
    .ordinal()
    .domain(d3.range(numrows))
    .rangeBands([0, height]);

  const colorMap = d3.scale
    .linear()
    .domain([minValue, maxValue])
    .range([startColor, endColor]);

  const row = svg
    .selectAll('.row')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'row')
    .attr('transform', (d, i) => {
      return 'translate(0,' + y(i) + ')';
    });

  const cell = row
    .selectAll('.cell')
    .data((d) => {
      return d;
    })
    .enter()
    .append('g')
    .attr('class', 'cell')
    .attr('transform', (d, i) => {
      return 'translate(' + x(i) + ', 0)';
    });

  cell
    .append('rect')
    .attr('width', x.rangeBand() - 0.3)
    .attr('height', y.rangeBand() - 0.3);

  row
    .selectAll('.cell')
    .data((d, i) => {
      return data[i];
    })
    .style('fill', colorMap);

  const labels = svg.append('g').attr('class', 'labels');

  const columnLabels = labels
    .selectAll('.column-label')
    .data(columnLabelsData)
    .enter()
    .append('g')
    .attr('class', 'column-label')
    .attr('transform', (d, i) => {
      return 'translate(' + x(i) + ',' + height + ')';
    });

  columnLabels
    .append('line')
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .attr('x1', x.rangeBand() / 2)
    .attr('x2', x.rangeBand() / 2)
    .attr('y1', 0)
    .attr('y2', 5);

  columnLabels
    .append('text')
    .attr('x', 0)
    .attr('y', y.rangeBand() / 2 + 20)
    .attr('dy', '.82em')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-60)')
    .text((d, i) => {
      return d;
    });

  const rowLabels = labels
    .selectAll('.row-label')
    .data(rowLabelsData)
    .enter()
    .append('g')
    .attr('class', 'row-label')
    .attr('transform', (d, i) => {
      return 'translate(' + 0 + ',' + y(i) + ')';
    });

  rowLabels
    .append('line')
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .attr('x1', 0)
    .attr('x2', -5)
    .attr('y1', y.rangeBand() / 2)
    .attr('y2', y.rangeBand() / 2);

  rowLabels
    .append('text')
    .attr('x', -8)
    .attr('y', y.rangeBand() / 2)
    .attr('dy', '.32em')
    .attr('text-anchor', 'end')
    .text((d, i) => {
      return d;
    });
}
