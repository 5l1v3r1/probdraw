(function() {

  var DISTRIBUTION_RADIUS = 1;
  var BISECTION_ITERATIONS = 54;

  // Generator picks random numbers based on a
  // probability distribution.
  function Generator(curve) {
    this._curve = curve;
    this._normalizer = 1 / curve.integrate(-DISTRIBUTION_RADIUS, DISTRIBUTION_RADIUS);
    if (isNaN(this._normalizer)) {
      this._normalizer = 1;
    }
  }

  // rand returns a random number between
  // -1 and 1 based on the underlying
  // probability distribution.
  Generator.prototype.rand = function() {
    var uniformRand = Math.random();
    var x1 = -DISTRIBUTION_RADIUS;
    var x2 = DISTRIBUTION_RADIUS;

    // TODO: use Newton's method or some better
    // root-finding algorithm here.
    for (var i = 0; i < BISECTION_ITERATIONS; ++i) {
      var mid = (x1 + x2) / 2;
      var integral = this._normalizer * this._curve.integrate(-DISTRIBUTION_RADIUS, mid);
      if (integral === uniformRand) {
        return mid;
      } else if (integral < uniformRand) {
        x1 = mid;
      } else {
        x2 = mid;
      }
    }

    return (x1 + x2) / 2;
  };

  window.app.Generator = Generator;

})();
