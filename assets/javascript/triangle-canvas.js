var triangleCanvas = (function() {
  "use strict";

  function triangleCanvas(canvasElm, side) {
    var canvasObject = layCanvas(canvasElm);
    this.canvas = canvasObject[0];
    this.canvasContext = canvasObject[1];
    this.side = side;
    this.height = heightOf(this.side);
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.draw();
  }

  triangleCanvas.prototype.switchToBG = function() {
    var header = this.canvas.parentElement,
    backgroundImage = "url(" + this.canvas.toDataURL() + ")";
    header.style.backgroundImage = backgroundImage;
    header.style.backgroundColor = "rgb("+randomRGBColour()+")";
    header.removeChild(this.canvas);
  }

  triangleCanvas.prototype.draw = function() {
    var totalDrawnWidth = 0,
        x = 0;
    while (totalDrawnWidth < this.canvasWidth) {
      totalDrawnWidth = totalDrawnWidth + this.height;
      this.drawColumn(totalDrawnWidth, -half(this.side));
      totalDrawnWidth = totalDrawnWidth + this.height;
      this.drawColumn(totalDrawnWidth, -this.side);
    }
  }

  triangleCanvas.prototype.drawColumn = function(startX, startY) {
    var columnHeight = startY;
    while (columnHeight < this.canvasHeight) {
      columnHeight = columnHeight + half(this.side);
      this.triangle(startX, columnHeight, "right");
      columnHeight = columnHeight + half(this.side);
      this.triangle(startX, columnHeight, "left");
    }
  }

  triangleCanvas.prototype.triangle = function(currentX, currentY, direction) {
    var color = "rgba(0,0,0,"+randomOpacity()+")";
    this.canvasContext.fillStyle = color;
    var moveToX, moveToY;
    switch (direction) {
      case "left":
        var horizontal = -this.height,
            startPoint = currentX - this.height;
        break;
      case "right":
        var horizontal = this.height,
            startPoint = currentX;
        break;
    }
    this.canvasContext.beginPath();
      this.canvasContext.moveTo(startPoint, currentY);
      moveToY = currentY + half(this.side);
      moveToX = startPoint - horizontal;
      this.canvasContext.lineTo(moveToX, moveToY);
      moveToY = moveToY - this.side;
      this.canvasContext.lineTo(moveToX, moveToY);
      this.canvasContext.closePath();
      this.canvasContext.fill();
    this.canvasContext.save();
  }

  function heightOf(side) {
    return strip((((Math.sqrt(3))/2)*side));
  }

  function randomRGBColour() {
    return (Math.floor((Math.random()*255)).toString() + ", " + Math.floor((Math.random()*255)).toString() + ", " + Math.floor((Math.random()*255)).toString());
  }

  function randomOpacity() {
    return (Math.random());
  }

  function half(value) {
    return strip(value/2);
  }

  function layCanvas(canvas) {
    var canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight/2;
    return [canvas, canvasContext];
  }

  function strip(number) {
    return (parseFloat(number.toPrecision(12)));
  }

  return triangleCanvas;
})();

document.addEventListener('DOMContentLoaded', function(){
  var triangleCanvases = document.getElementsByClassName("trianglecanvas");
  for (var x = 0; x < triangleCanvases.length; x++) {
    var test = new triangleCanvas(triangleCanvases[x], 45);
    test.switchToBG();
  }
});
