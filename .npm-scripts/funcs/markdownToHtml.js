const markdown = require("markdown").markdown;

module.exports = function(config, item) {
  return new Promise(function(resolve) {
    resolve({
      ...item,
      content: markdown.toHTML(item.content)
    });
  });
};
