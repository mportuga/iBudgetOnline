var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET summary page. */
router.get('/summary', function(req, res, next) {
  res.render('summary', { title: 'Your Summary | BudgetTail' });
});

/* GET accounts page. */
router.get('/accounts', function(req, res, next) {
  res.render('accounts', { title: 'Your Accounts | BudgetTail' });
});

/* GET budget page. */
router.get('/budget', function(req, res, next) {
  res.render('budget', { title: 'Your Budget | BudgetTail' });
});

module.exports = router;
