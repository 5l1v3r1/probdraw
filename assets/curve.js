(function() {

  // Curve is a piecewise-linear curve defined
  // by a list of points (e.g. {x: 0, y: 10}).
  function Curve(points) {
    this._points = points;
  }

  // evaluate returns the y value corresponding
  // to the given x value.
  Curve.prototype.evaluate = function(x) {
    if (this._points.length === 0) {
      return 0;
    }

    var pointIdx = this._searchX(x);
    if (pointIdx === this._points.length || pointIdx === 0) {
      return 0;
    }

    var p1 = this._points[pointIdx-1];
    var p2 = this._points[pointIdx];
    var xProg = (x - p1.x) / (p2.x - p1.x);
    return xProg*p2.y + (1-xProg) * p1.y;
  };

  // integrate returns the definite integral of the
  // curve between two x values.
  Curve.prototype.integrate = function(startX, endX) {
    var pointIdx = this._searchX(startX);
    if (pointIdx === this._points.length) {
      return 0;
    }
    if (pointIdx !== 0 && this._points[pointIdx].x > startX) {
      --pointIdx;
    }

    var compensation = 0;
    var sum = 0;
    while (pointIdx < this._points.length-1) {
      var p1 = this._points[pointIdx];
      var p2 = this._points[pointIdx+1];
      var x1 = Math.max(p1.x, startX);
      var x2 = Math.min(p2.x, endX);
      var midX = (x1 + x2) / 2;
      var midRatio = (midX - p1.x) / (p2.x - p1.x);
      var midY = p1.y*(1-midRatio) + p2.y*midRatio;
      var trapazoidArea = midY * (x2 - x1);

      var addAmount = trapazoidArea + compensation;
      var newSum = sum + addAmount;
      compensation += addAmount - (newSum - sum);
      sum = newSum;

      if (endX <= p2.x) {
        break;
      }
    }

    return sum;
  };

  // _searchX returns the index of the point which
  // has a given x value, or the index where such
  // a point would need to be inserted.
  Curve.prototype._searchX = function(x) {
    if (this._points.length === 0) {
      return 0;
    }
    var firstIdx = -1;
    var lastIdx = this._points.length;
    while ((lastIdx - firstIdx) >= 1) {
      var mid = (firstIdx + lastIdx) >>> 1;
      var p = this._points[mid];
      if (p.x === x) {
        return mid;
      } else if (p.x > x) {
        lastIdx = mid;
      } else {
        firstIdx = mid;
      }
    }
    return lastIdx;
  };

  window.app.Curve = Curve;

})();
