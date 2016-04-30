(function() {

  var MAX_WIDTH = 800;
  var WIDTH_HEIGHT_RATIO = 2;

  var DRAWABLE_PORTION = 240 / 250;
  var VIEWBOX_WIDTH = 500;

  function Drawing() {
    this._element = document.getElementById('drawing');
    this._caption = document.getElementById('drawing-caption');
    this._curvePath = document.getElementById('drawing-curve');

    this._points = [];

    this._resize();
    window.addEventListener('resize', this._resize.bind(this));

    this._registerMouseEvents();
  }

  Drawing.prototype._hideCaption = function() {
    this._caption.setAttribute('style', 'display: none');
  };

  Drawing.prototype._resize = function() {
    var windWidth = window.innerWidth;
    var windHeight = window.innerHeight;

    var width = 0;
    var height = 0;

    if (windWidth >= MAX_WIDTH && windHeight*WIDTH_HEIGHT_RATIO >= MAX_WIDTH) {
      width = MAX_WIDTH;
      height = MAX_WIDTH / WIDTH_HEIGHT_RATIO;
    } else {
      if (windHeight*WIDTH_HEIGHT_RATIO > windWidth) {
        width = windWidth;
        height = width / WIDTH_HEIGHT_RATIO;
      } else {
        height = windHeight;
        width = WIDTH_HEIGHT_RATIO * height;
      }
    }

    this._element.style.width = Math.round(width) + 'px';
    this._element.style.height = Math.round(height) + 'px';
    this._element.style.left = 'calc(50% - ' + (width/2).toFixed(1) + 'px)';
    this._element.style.top = 'calc(50% - ' + (height/2).toFixed(1) + 'px)';
  };

  Drawing.prototype._registerMouseEvents = function() {
    this._element.addEventListener('mousedown', function(e) {
      this._hideCaption();
      this._points = [];
      this._addPoint(this._relativePosition(e));
      var boundMoveHandler = function(e) {
        var pos = this._relativePosition(e);
        this._addPoint(pos);
      }.bind(this);
      var boundUpHandler;
      boundUpHandler = function() {
        window.removeEventListener('mousemove', boundMoveHandler);
        window.removeEventListener('mouseup', boundUpHandler);
        // TODO: fire some sort of "done drawing" callback.
      }.bind(this);
      window.addEventListener('mousemove', boundMoveHandler);
      window.addEventListener('mouseup', boundUpHandler);
    }.bind(this));
  };

  Drawing.prototype._relativePosition = function(e) {
    var bounds = this._element.getBoundingClientRect();
    var x = (e.clientX - bounds.left) / this._element.offsetWidth;
    var y = (e.clientY - bounds.top) / this._element.offsetHeight;
    y = Math.min(y, DRAWABLE_PORTION);
    return {x: x, y: y};
  };

  Drawing.prototype._addPoint = function(p) {
    for (var i = this._points.length-1; i >= 0; --i) {
      var point = this._points[i];
      if (point.x >= p.x) {
        this._points.splice(i, 1);
      }
    }

    this._points.push(p);

    var pathData = 'M';
    for (var i = 0, len = this._points.length; i < len; ++i) {
      var point = this._points[i];
      var realX = point.x * VIEWBOX_WIDTH;
      var realY = point.y * VIEWBOX_WIDTH / WIDTH_HEIGHT_RATIO;
      pathData += ' ' + realX.toFixed(2) + ',' + realY.toFixed(2);
    }
    this._curvePath.setAttribute('d', pathData);
  };

  window.addEventListener('load', function() {
    new Drawing();
  });

})();
