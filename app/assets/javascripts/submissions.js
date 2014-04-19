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
  var color = Factors.known[factor];
  console.log(color);
  console.log(Color.rgbToCss(color));
  $(".show-submission").css("background-color", Color.rgbToCss(color));

  var photoSummary = Factors.knownSummaries[factor];
  console.log(photoSummary);
  $(".photo-summary-hero h2").text(photoSummary.hero);
  $(".photo-summary .photo-summary-left").text(photoSummary.left);
  $(".photo-summary .photo-summary-middle").text(photoSummary.middle);
  $(".photo-summary .photo-summary-right").text(photoSummary.right);
};
$(document).ready(ReadySubmissionShow);
$(document).on("page:load", ReadySubmissionShow);

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

    var closest = Color.closestTo(img, Factors.known);

    console.log("closest");
    for (var i=0; i < 3; i++) {
      var div = $("#palette-color-" + i);
      console.log(closest[i]);
      div.css("background-color", Color.rgbToCss(closest[i].factor));
      div.find(".distance").text(Math.floor(closest[i].distance));
      div.attr("data-blue-factor", closest[i].factorIndex);
    }
    updateDisplay("photo");
  });
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

function geoSuccess(position) {
  console.log(position);
  $("#submission-latitude").attr("value", position.coords.latitude);
  $("#submission-longitude").attr("value", position.coords.longitude);
}

function geoError(msg) {
  console.log(msg);
}

