const path = require("path");

module.exports = function(config, item) {
  return new Promise(function(resolve, reject) {
    const meta = path.parse(item.path);
    resolve(
      Object.assign(
        item,
        ...config.decorators.map(decorator => decorator(config, item, meta))
      )
    );
  });
};
