ReadyDashboard = function() {
  $(".link-delete-submission").bind("ajax:complete", function() {
    location.reload();
  });
}
$(document).ready(ReadyDashboard);
$(document).on("page:load", ReadyDashboard);
