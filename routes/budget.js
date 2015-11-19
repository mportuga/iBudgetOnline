var express = require('express');
var path = require('path');
var _ = require('lodash');
var fileReader = require('../lib/utils/fileReader')
var router = express.Router();

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

/* GET budget data. */
router.get('/get', function(req, res, next) {
  if(req.query) {
    fileReader.readJSONFile(path.join(__dirname, '../public/json/demoData.json'), function(err, data){
      if(err){
        console.error(err);
      } else {
        switch(req.query.chartType) {
          case 'pie':
            data = formatData(data.budgetData, req.query.column, req.query.dataType);
            break;
          case 'multiBar':
            data = getExpenseData(data.budgetData);
            break;
        }
        res.send(data);
      }
    })
  } else {
      res.sendFile(path.join(__dirname, '../public/json/demoData.json'));
  }
});

module.exports = router;
