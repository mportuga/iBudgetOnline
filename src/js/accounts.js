define([
  'jquery',
  'jqueryDataTables'
], function accountsPage($) {
  'use strict';

  function getTableOptions(){
    return {
      ajax: {
        url: "/budget/data/get",
        data: {
          dataType: 'grid',
          columns: [ "date", "payee", "status", "amount", "balance"]
        }
      },
      fullWidthRow: true,
      columns: [
        null,
        null,
        { className: "hide-for-small-only"},
        null,
        { className: "show-for-medium"}
      ]
    };
  }

  function initPage() {
    $('#accountsTable').DataTable(getTableOptions());
  }

  return {
    initPage: initPage
  };
});
