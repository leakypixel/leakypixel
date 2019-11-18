function getNiceName(name) {
  return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/-/g, " ");
}

module.exports = function typeDecorator(config, item, meta) {
  const existingTags = item.tags || [];
  const splitDir = meta.dir.split("/");
  const immediateDir = splitDir[splitDir.length - 1];
  const isTopLevel = splitDir.length < 2;
  const name = (() => {
    if (meta.name !== "index") {
      return meta.name;
    } else if (isTopLevel && config.defaultName) {
      return config.defaultName;
    } else {
      return immediateDir;
    }
  })();

  return {
    ...item,
    name: meta.name,
    niceName: getNiceName(name),
    dir: meta.dir,
    type: meta.dir.split("/")[0],
    tags: existingTags.concat(meta.dir.split("/"), [meta.name])
  };
};
