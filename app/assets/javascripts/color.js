var Color = new function() {
  // weighted distance between two RGB colors
  this.distance = function(a, b) {
    var redDistance = Math.pow((a[0] - b[0]) * 0.3, 2);
    var greenDistance = Math.pow((a[1] - b[1]) * 0.59, 2);
    var blueDistance = Math.pow((a[2] - b[2]) * 0.11, 2);
    return redDistance + greenDistance + blueDistance;
  };

  // Determine the factors that the given image's palette is closest to.
  //
  // This will pull out the palette colors with ColorThief, and compare them
  // to the provided "factors". It will return an array of objects representing
  // how close each color in the palette is to each factor.
  this.closestTo = function(img, factors) {
    var colorThief = new ColorThief();

    var closest = [];
    var palette = colorThief.getPalette(img);
    for (var i=0; i < palette.length; i++) {
      var distances = [];
      for (var j=0; j < factors.length; j++) {
        distances[j] = {
          distance: this.distance(factors[j], palette[i]),
          factor: factors[j],
          factorIndex: j,
          color: palette[i]
        };
      }
      closest = closest.concat(distances);
      //distances.sort(distanceComparator);
      //closest.push(distances[0]);
    }
    closest.sort(distanceComparator);

    return closest;
  };

  this.rgbToCss = function(rgb) {
    return "rgb(" + rgb.join(",") + ")";
  };

  var distanceComparator = function (a, b) {
    return a.distance - b.distance;
  };
};
