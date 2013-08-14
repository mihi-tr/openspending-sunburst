
var OpenSpending = OpenSpending || {};


OpenSpending.sunburst= function(config) {
  
  var width = 960,
      height = 700,
      radius = Math.min(width, height) / 2-100,
      color = d3.scale.category20c();

  var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height * .52 +
")");
  
  var partition = d3.layout.partition()
    .sort(null)
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.amount; });

  var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

 
 
 this.callback=function (tree) {
     console.log(tree);
      var path = svg.datum(tree).selectAll("path")
      .data(partition.nodes)
      .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
      .attr("d", arc)
      .attr("class","arc")
      .style("stroke", "#fff")
      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
      .style("fill-rule", "evenodd");
    
      d3.selectAll(".arc")
          .append("title")
          .text(function(d) {return d.label+" - "+d.amount+tree.currency})

        

    }

  config.callback=this.callback;
  
  OpenSpending.Aggregator(config);
  }
