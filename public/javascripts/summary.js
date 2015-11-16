function convertDates(obj){
  return {
    month: new Date(obj.date).getMonth(),
    value: obj.value
  };
}

function generateMonthObj(month, val) {
  return {x: month + "'15", y: val };
}

function generateExpenseReport(data){
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var values = _.chain(data).map(convertDates).groupBy('month').value();
  return _.map(months, function(month, i){
    return generateMonthObj(month, _.sum(values[i], 'value'));
  });
}

function formatExpenseRow(row) {
  return { x: row.date, y: row.value }
}

function getBarChartData(type, color, groupedData) {
  return {
    key: type,
    color: color,
    values: generateExpenseReport(groupedData[type])
  };
}

//Generate some nice data.
function getExpenseData(data) {
  var groupedData = _.groupBy(data, 'type');
  var expenseData = [
    getBarChartData('Income','#64DD17', groupedData),
    getBarChartData('Expense','#D50000', groupedData)
  ];
  return expenseData;
}

//Pie chart example data. Note how there is only a single array of key-value pairs.
function initCharts(callback) {
  $.ajax({
    dataType: "json",
    url: 'json/demoData.json',
    success: callback
  });
}

function formatRow(value, key){
  return {
    "label": key,
    "value": _.sum(value, 'value')
  };
}

function formatData(data, key, type){
  var formattedData = _.chain(_.groupBy(data,'type')[type]).groupBy(key).map(formatRow).value();
  return formattedData;
}

function drawCharts(data){

  //Regular pie chart example
  nv.addGraph(function() {
    var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(false);

      d3.select("#categories svg")
          .datum(formatData(data.budgetData, 'category', 'Expense'))
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
          .datum(formatData(data.budgetData, 'payee', 'Expense'))
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
          .datum(getExpenseData(data.budgetData))
          .transition().duration(350)
          .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
}

function initPage(){
  initCharts(drawCharts);
};
