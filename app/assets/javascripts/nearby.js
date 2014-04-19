ReadyNearby = function() {
  if (!$("#nearby-index").exists()) {
    return;
  }
  console.log("nearby");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(Nearby.geoSuccess, Nearby.geoError);
  }
}
$(document).ready(ReadyNearby);
$(document).on("page:load", ReadyNearby);

var Nearby = new function() {
  this.loadPosition = function(latitude, longitude) {
    $.get("/nearby/nearby", {
      latitude: latitude,
      longitude: longitude
    }, function(data) {
      $("#nearby-content").html(data);
    }, "html");
  };

  this.geoSuccess = function(position) {
    Nearby.loadPosition(position.coords.latitude, position.coords.longitude);
  };

  this.geoError = function(msg) {
    console.log(msg);
  };
};
