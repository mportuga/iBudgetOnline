function getTableOptions(){
  return {
    ajax: {
      url: "/budget/data/get",
      data: {
        dataType: 'grid',
        columns: [ "date", "payee", "status", "debt", "credit", "balance"]
      }
    },
    columns: [
      null,
      null,
      { className: "hide-for-small-only"},
      null,
      null,
      { className: "hide-for-small-only"}
    ]
  };
}

function initPage() {
  $('#accountsTable').DataTable(getTableOptions());
}
