(function() {

  var MAX_WIDTH = 800;
  var WIDTH_HEIGHT_RATIO = 2;

  function Drawing() {
    this._element = document.getElementById('drawing');
    this._caption = document.getElementById('drawing-caption');
    this._curvePath = document.getElementById('drawing-curve');

    this._resize();
    window.addEventListener('resize', this._resize.bind(this));
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

  window.addEventListener('load', function() {
    new Drawing();
  });

})();
