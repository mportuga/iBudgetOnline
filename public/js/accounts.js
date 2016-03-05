define([
  'jquery',
  'jqueryDataTables'
], function accountsPage($) {
  function getTableOptions(){
    return {
      ajax: {
        url: "/budget/data/get",
        data: {
          dataType: 'grid',
          columns: [ "date", "payee", "status", "debt", "credit", "amount", "balance"]
        }
      },
      fullWidthRow: true,
      columns: [
        null,
        null,
        { className: "hide-for-small-only"},
        { className: "show-for-large-only"},
        { className: "show-for-large-only"},
        { className: "hide-for-large-only"},
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
