define([
  'jquery',
  'd3',
  'nvd3'
], function summaryPage($) {
  'use strict';

  function drawPieChart(data, selector){
    //Regular pie chart example
    nv.addGraph(function createPieChart() {
      var chart = nv.models.pieChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.value })
          .showLabels(false);

        d3.select(selector)
            .datum(data)
            .transition().duration(350)
            .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
  }

  function drawMultiBarChart(data, selector){
    nv.addGraph(function createMultiBarChart() {
      var chart = nv.models.multiBarChart()
        .reduceXTicks($(window).width() < 640)   //If 'false', every single x-axis tick label will be rendered.
        .rotateLabels(0)      //Angle to rotate x-axis labels.
        .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
        .groupSpacing(0.1)    //Distance between each group of bars.
      ;

      chart.yAxis
          .tickFormat(d3.format(',.2f'));

      d3.select(selector)
          .datum(data)
          .transition().duration(350)
          .call(chart);

      nv.utils.windowResize(function(){
        if($(window).width() < 640){
          chart.reduceXTicks(true);
        } else {
          chart.reduceXTicks(false);
        }
        chart.update();
      });

      return chart;
    });
  }

  function initChart(selector, queryParams, callback){
    $.ajax({
      dataType: "json",
      url: 'budget/data/get',
      data: queryParams
    }).done(function handleDataSuccess(data){
      callback(data, selector);
    });
  }

  function getPieExpenseParams(column) {
    return { dataType: 'pie', column: column, budgetType:'Expense'};
  }

  function initCharts() {
    initChart("#categories svg", getPieExpenseParams('category'), drawPieChart);
    initChart("#payees svg", getPieExpenseParams('payee'), drawPieChart);
    initChart("#budgetSummary svg", { dataType: 'multiBar' }, drawMultiBarChart);
  }

  function initPage(){
    initCharts();
  };

  return {
    initPage: initPage
  };
});
