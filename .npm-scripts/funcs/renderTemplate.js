function toObject(arr) {
  let rv = {};
  let i;
  for (i = 0; i < arr.length; ++i) rv[arr[i].name] = arr[i];
  return rv;
}
module.exports = function(config, item) {
  return new Promise(function(resolve, reject) {
    if (!config.template || !config.template.template) {
      reject({ message: "Template not found", item, config });
    }
    try {
      const content = config.template.template({ item, meta: config.meta });
      resolve({
        ...item,
        content
      });
    } catch (e) {
      reject({ message: "Could not render template", funcError: e });
    }
  });
};
