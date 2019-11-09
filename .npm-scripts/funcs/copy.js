module.exports = function(config, item) {
  return new Promise(function(resolve) {
    resolve({
      ...item
    });
  });
};

