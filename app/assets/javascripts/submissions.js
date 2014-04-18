ReadySubmissionNew = function() {
  if (!$("#submissions-new").exists()) {
    return;
  }

  $("#submit-button").on("click", function() {
    $("#submission-form").submit();
  });

  $("#submission-form").on("submit", function() {
    $("#submit-button h2").removeClass("glyphicon-share-alt");
    $("#submit-button h2").addClass("glyphicon-refresh");
    $("#submit-button h2").addClass("spin");
    $("#submit-button").prop("disabled", true);
  });

  $("#take-picture").on("change", function() {
    console.log("take picture change");
    var file = this.files[0];
    console.log(file);
    $("#filename").text(file.name);
    showPicture(file);
  });

  updateDisplay("empty");
  markPaletteColorChecked();
  $(".palette-color").on("click", function(e) {
    var blueFactor = $(e.target).attr("data-blue-factor");
    $("#submission-blue-factor").attr("value", blueFactor);
    markPaletteColorChecked($(e.target));
    updateDisplay("ready");
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }
};
$(document).ready(ReadySubmissionNew);
$(document).on("page:load", ReadySubmissionNew);

ReadySubmissionShow = function() {
  if (!$("#submissions-show").exists()) {
    return;
  }
  console.log("show");
  var factor = $("#submission").attr("data-blue-factor");
  var color = knownFactors[factor];
  console.log(color);
  console.log(rgbCss(color));
  $(".show-submission").css("background-color", rgbCss(color));

  var photoSummary = factorSummaries[factor];
  console.log(photoSummary);
  $(".photo-summary-hero h2").text(photoSummary.hero);
  $(".photo-summary .photo-summary-left").text(photoSummary.left);
  $(".photo-summary .photo-summary-middle").text(photoSummary.middle);
  $(".photo-summary .photo-summary-right").text(photoSummary.right);
};
$(document).ready(ReadySubmissionShow);
$(document).on("page:load", ReadySubmissionShow);

var knownFactors = [
  [53, 113, 181],
  [90, 136, 189],
  [104, 144, 199],
  [126, 158, 206],
  [149, 177, 216],
  [177, 196, 225]
];

var factorSummaries = [
  { hero: "Flawless", left: "Perfect", middle: "Perfect", right: "None" },
  { hero: "Beautiful", left: "Lovely", middle: "Great", right: "Very Low" },
  { hero: "Clear Blue", left: "Good", middle: "Fair", right: "Low" },
  { hero: "Pale Sky", left: "Pale", middle: "Fair", right: "Moderate" },
  { hero: "Hazy Sky", left: "Pale", middle: "Hazy", right: "High" },
  { hero: "Milky Sky", left: "Poor", middle: "Poor", right: "Very High" }
];

// weighted distance between two RGB colors
function calculateColorDistance(a, b) {
  var redDistance = Math.pow((a[0] - b[0]) * 0.3, 2);
  var greenDistance = Math.pow((a[1] - b[1]) * 0.59, 2);
  var blueDistance = Math.pow((a[2] - b[2]) * 0.11, 2);
  return redDistance + greenDistance + blueDistance;
}

function showPicture(file) {
  console.log("showPicture");
  var show = $("#show-picture");

  var mpImg = new MegaPixImage(file);
  mpImg.render(show[0], { maxWidth: 800, maxHeight: 800 });
    
  updateMainWindow("photo");
  show.on("load", function() {
    console.log("onload");
    var img = $("#show-picture")[0];
    $("#upload-image-data").attr("value", img.src);

    var colorThief = new ColorThief();

    var closest = [];
    var palette = colorThief.getPalette(img);
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
      div.find(".distance").text(Math.floor(closest[i].distance));
      div.attr("data-blue-factor", closest[i].knownFactorIndex);
    }
    updateDisplay("photo");
  });
}

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

// the state can be:
// "empty"
// "photo"
// "ready"
function updateDisplay(state) {
  updateMainWindow(state);

  // which button to show
  $("#submit-container").hide();
  $("#camera-container").hide();
  if (state == "ready") {
    $("#submit-container").show();
  } else {
    $("#camera-container").show();
  }

  // which text to show
  $("#step-1").hide();
  $("#step-2").hide();
  $("#step-3").hide();
  if (state == "empty") {
    $("#step-1").show();
  } else if (state == "photo") {
    $("#step-2").show();
  } else if (state == "ready") {
    $("#step-3").show();
  }
}

function updateMainWindow(state) {
  // the main part of the screen
  $("#initial-container").hide();
  $("#picture-container").hide();
  if (state != "empty") {
    $("#picture-container").show();
  } else {
    $("#initial-container").show();
  }
}

function markPaletteColorChecked(paletteColor) {
  $(".palette-color .palette-check").hide();
  if (paletteColor != null) {
    paletteColor.find(".palette-check").show();
    $("#submit-button").prop("disabled", false);
  } else {
    $("#submit-button").prop("disabled", true);
  }
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

