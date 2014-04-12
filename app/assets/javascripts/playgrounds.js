function showPicture(file) {
  var show = $("#show-picture");

  // Get window.URL object
  var URL = window.URL || window.webkitURL;
   
  // Create ObjectURL
  var imgURL = URL.createObjectURL(file);
  console.log(imgURL);
   
  // Set img src to ObjectURL
  //show.src = imgURL;
  show.attr("src", imgURL);

  // For performance reasons, revoke used ObjectURLs
  URL.revokeObjectURL(imgURL);

  setTimeout(function() {
    var colorThief = new ColorThief();
    var d = colorThief.getColor($("#show-picture")[0]);
    console.log(d);
    $("#dominant-color").css("background-color", "rgb(" + d.join(",") + ")");
  }, 100);
}

console.log("hi");
$(function() {
  $("#take-picture").on("change", function() {
    console.log("changed");
    console.log(this.files);
    var file = this.files[0];
    $("#filename").text(file.name);
    showPicture(file);
  });
});

function geoSuccess(position) {
  console.log(position);
  $("#latitude").text(position.coords.latitude);
  $("#longitude").text(position.coords.longitude);
}

function geoError(msg) {
  console.log(msg);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}
