const fs = require("careless-fs");
module.exports = function(config, item) {
  return fs.write({
    ...item,
    path: `${config.outputDir}/${item.outputPath}${item.outputExtension}`
  });
};
