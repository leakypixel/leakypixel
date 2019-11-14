const imagemin = require("imagemin");
const imageminSvgo = require("imagemin-svgo");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const mkdirp = require("mkdirp");

module.exports = function(config, item) {
  return new Promise(function(resolve, reject) {
    const destination = `${config.outputDir}/${item.outputDir}`;
    mkdirp(destination, err => {
      if (err) {
        reject({
          message: `could not create directory: ${destination}`,
          ...err
        });
      }
      imagemin([item.path], {
        destination,
        plugins: [
          imageminSvgo({
            plugins: [{ removeViewBox: false }]
          }),
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8]
          })
        ]
      })
        .then(result => {
          const newItem = {
            ...item,
            path: item.outputPath
          };
          resolve(newItem);
        })
        .catch(e => {
          reject(e);
        });
    });
  });
};
