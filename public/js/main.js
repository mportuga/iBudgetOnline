define([
  'jquery',
  'summary',
  'foundation'
], function mainApp($, summary){
  'use strict';

  $(document).foundation().ready(function(){
    $("#appNav li[data-path='" + window.location.pathname + "']").addClass('active');

    if(summary && summary.initPage) {
      summary.initPage();
    }
  });
});
