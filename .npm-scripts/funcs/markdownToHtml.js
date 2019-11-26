const hubdown = require("hubdown");

module.exports = function(config, item) {
  return new Promise(function(resolve) {
    hubdown(item.content, { ignore: ["autolinkHeadings"] }).then(doc => {
      resolve({
        ...item,
        content: doc.content
      });
    });
  });
};
