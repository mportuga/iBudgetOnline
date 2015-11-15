function stream_index(d, i) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {x: months[i] + "'15", y: Math.max(0, d)};
}

/* Inspired by Lee Byron's test data generator. */
function stream_layers(n, m, o) {
  if (arguments.length < 3) o = 0;
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < m; i++) {
      var w = (i / m - y) * z;
      a[i] += 500 * (x * Math.exp(-w * w));
    }
  }
  return d3.range(n).map(function() {
      var a = [], i;
      for (i = 0; i < m; i++) a[i] = o + o * Math.random();
      for (i = 0; i < 5; i++) bump(a);
      return a.map(stream_index);
    });
}

//Generate some nice data.
function mockExpenseData() {
  var options = ['Income', 'Expense'];
  return stream_layers(2,12,.1).map(function(data, i) {
    return {
      key: options[i],
      values: data
    };
  });
}

//Pie chart example data. Note how there is only a single array of key-value pairs.
function mockPayeeData() {
  return  [
    {
      "label": "Airline",
      "value" : 5.1387322875705
    },
    {
      "label": "Cable Company",
      "value" : 13.925743130903
    },
    {
      "label": "Electric Company",
      "value" : 98.079782601442
    },
    {
      "label": "Gas Station",
      "value" : 29.765957771107
    },
    {
      "label": "Phone Company",
      "value" : 32.807804682612
    },
    {
      "label": "Water Company",
      "value" : 196.45946739256
    }
  ];
}

//Pie chart example data. Note how there is only a single array of key-value pairs.
function mockCategoryData() {
  return  [
    {
      "label": "Bills",
      "value" : 95.1387322875705
    },
    {
      "label": "Education",
      "value" : 13.925743130903
    },
    {
      "label": "Groceries",
      "value" : 98.079782601442
    },
    {
      "label": "Gas",
      "value" : 29.765957771107
    },
    {
      "label": "Travel",
      "value" : 196.45946739256
    }
  ];
}

function drawCharts(){
  //Regular pie chart example
  nv.addGraph(function() {
    var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(false);

      d3.select("#categories svg")
          .datum(mockCategoryData())
          .transition().duration(350)
          .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });

  //Regular pie chart example
  nv.addGraph(function() {
    var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(false);

      d3.select("#payees svg")
          .datum(mockPayeeData())
          .transition().duration(350)
          .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });


  //Regular pie chart example
  nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .reduceXTicks(false)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      //Angle to rotate x-axis labels.
      .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1)    //Distance between each group of bars.
    ;

    chart.yAxis
        .tickFormat(d3.format(',.2f'));

      d3.select("#budgetSummary svg")
          .datum(mockExpenseData())
          .transition().duration(350)
          .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
}

function initPage(){
  drawCharts();
};
