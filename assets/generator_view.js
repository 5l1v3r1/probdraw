(function() {

  function GeneratorView() {
    this._generator = null;
    this._output = document.getElementById('generator-output');

    var nextButton = document.getElementById('generator-next');
    nextButton.addEventListener('click', this._generate.bind(this));
  }

  GeneratorView.prototype.setGenerator = function(g) {
    this._generator = g;
    this._output.textContent = 'Hit "Generate"';
  };

  GeneratorView.prototype._generate = function() {
    var number = this._generator.rand();
    this._output.textContent = 'Number: ' + number.toFixed(3);
  };

  window.app.GeneratorView = GeneratorView;

})();
