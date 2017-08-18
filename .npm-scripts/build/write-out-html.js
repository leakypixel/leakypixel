const fs = require("careless-fs");

function writeOutHtml(input) {
  return new Promise(function(resolve, reject) {
    let file = {
      path: input.currentJob.files.path,
      data: input.buffers.html
    };
    fs.write(file).then(function(data) {
      resolve(input);
    })
    .catch(function(err) {
      console.log("ERROR:", err);
    });
  });
}

module.exports = writeOutHtml;
