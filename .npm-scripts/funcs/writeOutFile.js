const fs = require("careless-fs");
module.exports = function(config, item) {
  return fs.write({
    path: `${config.outputDir}/${item.outputPath}${item.outputExtension}`,
    content: item.content
  });
};
