const UglifyJS = require("uglify-js");

module.exports = function(config, item) {
  return new Promise(function(resolve, reject) {
    let content;
    try {
      content = UglifyJS.minify(item.content, {
        mangle: false
      }).code;
    } catch (e) {
      reject(e);
    }
    resolve({
      ...item,
      content
    });
  });
};
