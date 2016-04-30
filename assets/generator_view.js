(function() {

  var HISTOGRAM_BAR_COUNT = 20;
  var HISTOGRAM_BAR_HEIGHT = 99;

  function GeneratorView() {
    this._generator = null;
    this._output = document.getElementById('generator-output');

    this._initializeHistogram();

    var nextButton = document.getElementById('generator-next');
    nextButton.addEventListener('click', this._generate.bind(this));

    var next100 = document.getElementById('generator-next-100');
    next100.addEventListener('click', function() {
      for (var i = 0; i < 100; ++i) {
        this._generate();
      }
    }.bind(this));
  }

  GeneratorView.prototype.setGenerator = function(g) {
    this._generator = g;
    this._output.textContent = 'Hit "Generate"';
    this._resetHistogram();
  };

  GeneratorView.prototype._generate = function() {
    var number = this._generator.rand();
    this._output.textContent = 'Number: ' + number.toFixed(3);

    var divisionSize = 2 / HISTOGRAM_BAR_COUNT;
    var division = Math.floor((number+1) / divisionSize);
    if (division < 0 || division >= HISTOGRAM_BAR_COUNT) {
      return;
    }
    this._histogramCounts[division]++;
    this._updateHistogram();
  };

  GeneratorView.prototype._updateHistogram = function() {
    this._histogram.setAttribute('class', '');
    var maxCount = 0;
    for (var i = 0; i < HISTOGRAM_BAR_COUNT; ++i) {
      maxCount = Math.max(maxCount, this._histogramCounts[i]);
    }
    for (var i = 0; i < HISTOGRAM_BAR_COUNT; ++i) {
      var height = Math.floor(HISTOGRAM_BAR_HEIGHT * (this._histogramCounts[i] / maxCount));
      var bar = this._histogramBars[i];
      bar.setAttribute('y', HISTOGRAM_BAR_HEIGHT - height);
      bar.setAttribute('height', height);
    }
  };

  GeneratorView.prototype._resetHistogram = function() {
    for (var i = 0; i < HISTOGRAM_BAR_COUNT; ++i) {
      this._histogramCounts[i] = 0;
    }
    this._histogram.setAttribute('class', 'empty');
  };

  GeneratorView.prototype._initializeHistogram = function() {
    this._histogram = document.getElementById('histogram');
    this._histogramBars = [];
    this._histogramCounts = [];
    for (var i = 0; i < HISTOGRAM_BAR_COUNT; ++i) {
      this._histogramBars[i] = document.getElementById('histogram-bar' + i);
      this._histogramCounts[i] = 0;
    }
  };

  window.app.GeneratorView = GeneratorView;

})();
