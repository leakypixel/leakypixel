const recursive = require("recursive-readdir");

module.exports = function(config, item) {
  return new Promise(function(resolve, reject) {
    const dirToList = config.directory ? config.directory : item.path;
    recursive(dirToList, function(err, dirListing) {
      if (err) {
        reject(err);
      }
      resolve(
        dirListing
          ? dirListing.reduce((filenames, file) => {
              return filenames.concat({
                ...item,
                path: file
              });
            }, [])
          : []
      );
    });
  });
};
