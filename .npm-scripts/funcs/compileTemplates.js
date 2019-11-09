const Handlebars = require("handlebars");
const handlebarsCompiler = Handlebars.compile;

module.exports = function(config, item) {
  return new Promise(function(resolve) {
    resolve({
      ...item,
      template: handlebarsCompiler(item.content)
    });
  });
};
