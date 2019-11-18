module.exports = function articleDecorator(config, item, meta) {
  const introStart = item.content.indexOf("<p>") + 3;
  const introEnd = item.content.indexOf("</p>");
  let cutoff;
  if (introEnd - introStart > config.cutoffLength) {
    cutoff = item.content.indexOf(".", introStart + config.cutoffLength) + 1;
  } else {
    cutoff = introEnd;
  }
  const blurb = item.content.substring(introStart, cutoff);
  const titleStart = item.content.indexOf("<h1>") + 4;
  const titleEnd = item.content.indexOf("</h1>");
  const title = item.content.substring(titleStart, titleEnd) || meta.name;
  return {
    ...item,
    niceName: title,
    blurb: blurb,
    tags: [].concat(item.tags, ["article"])
  };
};
