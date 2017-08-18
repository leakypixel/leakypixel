const handlebarsCompiler = require("handlebars").compile;

function handlebarsToHtml(input) {
  return new Promise(function(resolve, reject) {
    input.buffers.html = input.buffers[input.currentJob.bufferName].map(content => handlebarsCompiler(content)(input));
    resolve(input);
  });
}

module.exports = handlebarsToHtml;
