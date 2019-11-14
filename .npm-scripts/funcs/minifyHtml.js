const minify = require("html-minifier").minify;

module.exports = function(config, item) {
  return new Promise(function(resolve, reject) {
    try {
      resolve({
        ...item,
        content: minify(item.content, {
          removeAttributeQuotes: true,
          minifyCSS: true,
          minifyJS: true,
          collapseWhitespace: true
        })
      });
    } catch (e) {
      reject(e);
    }
  });
};
