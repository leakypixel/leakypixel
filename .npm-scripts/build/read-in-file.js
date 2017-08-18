const fs = require("careless-fs");

function readInFile(input) {
  return new Promise(function(resolve, reject) {
    fs.read(input.currentJob.files).then(function(data) {
      input.buffers[input.currentJob.bufferName] = data;
      resolve(input);
    })
    .catch(function(err) {
      console.log("ERROR:", err);
    });
  });
}

module.exports = readInFile;
