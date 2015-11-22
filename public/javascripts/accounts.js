function getTableOptions(){
  return {
    ajax: {
      url: "/budget/data/get",
      data: {
        dataType: 'grid',
        columns: [ "date", "payee", "status", "debt", "credit", "balance"]
      }
    }
  };
}

function initPage() {
  $('#accountsTable').DataTable(getTableOptions());
}
