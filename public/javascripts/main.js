$(document).foundation().ready(function(){
  $("#appNav li[data-path='" + window.location.pathname + "']").addClass('active');

  if(initPage) {
    initPage();
  }
});
