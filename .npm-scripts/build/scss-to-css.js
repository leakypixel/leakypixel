var sass = require('node-sass');

function scssToCss(input) {
  return new Promise(function(resolve, reject) {
    sass.render({
      data: input.buffers[input.currentJob.inputBuffer],
      [, options..]
    }, function(err, result) { 
      if (err) {
        reject(err);
      } else {
        input.buffers[input.currentJob.bufferName] = result;
        resolve(result);
      }
    });
  });
}

module.exports = readInFile;
