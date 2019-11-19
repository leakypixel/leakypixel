const fs = require("fs");
const mkdirp = require("mkdirp");

module.exports = function(config, item) {
  const outDir = `${config.outputDir}/${item.outputDir}`;
  const outPath = `${config.outputDir}/${item.outputPath}${
    item.outputExtension
  }`;
  return new Promise((resolve, reject) => {
    mkdirp(outDir, function(err) {
      if (err) {
        reject(err);
      }
      fs.copyFile(item.path, outPath, err => {
        if (err) {
          reject(err);
        }
        resolve({
          ...item,
          path: outPath
        });
      });
    });
  });
};
