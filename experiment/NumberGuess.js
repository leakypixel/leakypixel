var NumberGuess = (function() {
  "use strict";
 
  function NumberGuess(min,max,mysteryNumber) {
    this.min = (!min ? 1 : min),
    this.max = (!max ? 100 : max),
    this.mysteryNumber = (!mysteryNumber ? NumberGuess.generateMysteryNumber(min,max) : mysteryNumber);
  };
 
  NumberGuess.generateMysteryNumber = function(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
 
  NumberGuess.prototype.makeGuess = function(guess) {
    return this.updateRange((this.checkGuess(guess||this.splitRange()))); // Getting ninja...
  };
  
  NumberGuess.prototype.splitRange = function() {
    return parseInt((this.min + this.max) / 2);
  };
  
  NumberGuess.prototype.checkGuess = function(guess) {
    return (guess == this.mysteryNumber ? ["Correct",guess] : guess > this.mysteryNumber ? ["Lower",guess] : ["Higher",guess]); // NOW I FEEL LIKE A NINJA.
  };
  
  NumberGuess.prototype.updateRange = function(indicator) { // I'd like to change this to be a bit nicer, but as yet I'm not sure about how. We'll see.
    switch (indicator[0]) {
      case "Lower":
        this.max = indicator[1] - 1; // Fixing the range like this allows for edge cases, such as the lowest/highest possible numbers.
        return "The guess was " + indicator[1] + ". The mystery number is lower than that.";
      case "Higher":
        this.min = indicator[1] + 1; // See note above
        return "The guess was " + indicator[1] + ". The mystery number is higher than that.";
      case "Correct":
        return "Well done, the number was " + indicator[1] + ".";
      default:
        return "Bad Guess: " + indicator[1] + ".";
    };
  };
 
  return NumberGuess;
})();
