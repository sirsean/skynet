


console.log('hi');

function geoSuccess(position) {
  console.log(position);
  $("#latitude").html(position.coords.latitude);
  $("#longitude").text(position.coords.longitude);
}

function geoError(msg) {
  console.log(msg);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}
