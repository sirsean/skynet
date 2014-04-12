function geoSuccess(position) {
  console.log(position);
}

function geoError(msg) {
  console.log(msg);
}

if (navigator.geolocation) {
  console.log("getting location");
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
} else {
  console.log("no geolocation");
}
