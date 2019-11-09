const fsN = require("fs");
const path = require("path");

module.exports = function(config, item) {
  return new Promise(function(resolve, reject) {
    fsN.readdir(config.directory, { withFileTypes: true }, function(
      err,
      dirListing
    ) {
      if (err) {
        reject(err);
      }
      resolve(
        dirListing.reduce((filenames, fileDirent) => {
          return fileDirent.isFile()
            ? filenames.concat({
                ...item,
                path: path.join(config.directory, fileDirent.name)
              })
            : filenames;
        }, [])
      );
    });
  });
};
