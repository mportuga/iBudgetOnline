define([
  'jquery',
  'accounts',
  'budget',
  'summary',
  'foundation'
], function mainApp($, accounts, budget, summary){
  'use strict';

  $(document).foundation().ready(function(){
    var page = window.location.pathname;
    $("#appNav li[data-path='" + page + "']").addClass('active');

    switch(page.substring(1, page.length)) {
      case 'accounts':
        if(accounts && accounts.initPage) {
          accounts.initPage();
        }
        break;
      case 'budget':
        break;
      case 'summary':
        if(summary && summary.initPage) {
          summary.initPage();
        }
        break;
    }
  });
});
