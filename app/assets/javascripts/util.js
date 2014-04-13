$(function() {
  FastClick.attach(document.body);
});

$.fn.exists = function () {
  return this.length !== 0;
}
