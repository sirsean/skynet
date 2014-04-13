$(function() {
  if (!$("#submissions-new").exists()) {
    return;
  }
  console.log("new");
  $("#take-picture").on("change", function() {
    var file = this.files[0];
    $("#filename").text(file.name);
    showPicture(file);
  });

  $(".palette-color").on("click", function(e) {
    var blueFactor = $(e.target).attr("data-blue-factor");
    $("#submission-blue-factor").attr("value", blueFactor);
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }
});

$(function() {
  if (!$("#submissions-show").exists()) {
    return;
  }
  console.log("show");
  var color = knownFactors[$("#submission").attr("data-blue-factor")];
  console.log(color);
  console.log(rgbCss(color));
  $(document.body).css("background-color", rgbCss(color));
});

var knownFactors = [
  [53, 113, 181],
  [90, 136, 189],
  [104, 144, 199],
  [126, 158, 206],
  [149, 177, 216],
  [177, 196, 225]
];

// weighted distance between two RGB colors
function calculateColorDistance(a, b) {
  var redDistance = Math.pow((a[0] - b[0]) * 0.3, 2);
  var greenDistance = Math.pow((a[1] - b[1]) * 0.59, 2);
  var blueDistance = Math.pow((a[2] - b[2]) * 0.11, 2);
  return redDistance + greenDistance + blueDistance;
}

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

    var closest = [];
    var palette = colorThief.getPalette($("#show-picture")[0]);
    for (var i=0; i < palette.length; i++) {
      var distances = [];
      for (var j=0; j < knownFactors.length; j++) {
        distances[j] = {
          distance: calculateColorDistance(knownFactors[j], palette[i]),
          known: knownFactors[j],
          knownFactorIndex: j,
          color: palette[i]
        };
      }
      distances.sort(distanceComparator);
      closest.push(distances[0]);
    }
    closest.sort(distanceComparator);
    console.log("closest");
    for (var i=0; i < 3; i++) {
      var div = $("#palette-color-" + i);
      console.log(closest[i]);
      div.css("background-color", rgbCss(closest[i].known));
      div.text(closest[i].distance);
      div.attr("data-blue-factor", closest[i].knownFactorIndex);
    }
  }, 100);
}

function distanceComparator(a, b) {
  return a.distance - b.distance;
}

function rgbCss(rgb) {
  return "rgb(" + rgb.join(",") + ")";
}

function geoSuccess(position) {
  console.log(position);
  $("#submission-latitude").attr("value", position.coords.latitude);
  $("#submission-longitude").attr("value", position.coords.longitude);
}

function geoError(msg) {
  console.log(msg);
}

