const path = require("path");

module.exports = function outputDecorator(config, item, meta) {
  const outputDir = path.join(meta.dir.replace(config.baseDir, ""));
  return {
    ...item,
    outputPath: `${path.join(outputDir, meta.name)}`,
    outputDir: outputDir,
    outputExtension: item.outputExtension || config.outputExtension || meta.ext
  };
};
