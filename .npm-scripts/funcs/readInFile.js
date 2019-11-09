const fs = require("careless-fs");

module.exports = function(config, item) {
  return new Promise(function(resolve, reject) {
    fs.read(item.path)
      .then(function(data) {
        resolve({
          ...item,
          ...data
        });
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
