ReadyAll = function() {
  $("#left-menu").mmenu();
  FastClick.attach(document.body);
}
$(document).ready(ReadyAll);
$(document).on("page:load", ReadyAll);

$.fn.exists = function () {
  return this.length !== 0;
}
