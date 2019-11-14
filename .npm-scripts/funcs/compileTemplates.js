const Handlebars = require("handlebars");
const handlebarsCompiler = Handlebars.compile;

function compileTemplates(config, item) {
  return new Promise(function(resolve) {
    resolve({
      ...item,
      template: handlebarsCompiler(item.content)
    });
  });
}
compileTemplates.withConfig = function(config) {
  if (config.partials) {
    config.partials.map(partial =>
      Handlebars.registerPartial(partial.name, partial.content)
    );
  }
  return item => compileTemplates(config, item);
};
module.exports = compileTemplates;
