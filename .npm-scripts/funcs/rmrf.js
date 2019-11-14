const rimraf = require("rimraf");
module.exports = function(config, item) {
  return new Promise(function(resolve, reject) {
    if (!config.unsafe && item.path.substring(0, 2) !== "./") {
      reject({
        message: `path \`${
          item.path
        }\` is not local to the project. If you're sure you want to do this, set config.unsafe to true.`,
        item
      });
    }

    rimraf(item.path, err => {
      if (err) {
        reject(err);
      }
      resolve({ ...item, path: null });
    });
  });
};
