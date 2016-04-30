(function() {

  var drawing = null;
  var generatorView = null;

  function main() {
    drawing = new window.app.Drawing();
    drawing.onDone = showGenerator;

    generatorView = new window.app.GeneratorView();

    var backButton = document.getElementById('generator-back');
    backButton.addEventListener('click', showDrawing);
  }

  function showGenerator() {
    var g = new window.app.Generator(drawing.curve());
    generatorView.setGenerator(g);
    document.body.className = 'generator';
  }

  function showDrawing() {
    document.body.className = 'drawing';
  }

  window.addEventListener('load', main);

})();
