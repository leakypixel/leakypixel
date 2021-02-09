module.exports = function articleDecorator(config, item, meta) {
  const startIntroStrings = ["<p>", "<li>"];
  let introStart = -1;
  let i = 0;
  while (introStart === -1 && i < startIntroStrings.length) {
    introStart = item.content
      .toString()
      .indexOf(startIntroStrings[i].toString());
    i++;
  }
  if (i < startIntroStrings.length) {
    introStart = introStart + startIntroStrings[i].length - 1;
  }
  const introEnd = item.content.indexOf("</p>");
  let cutoff;
  if (introEnd - introStart > config.cutoffLength) {
    cutoff = item.content.indexOf(".", introStart) + 1;
    // Find the next end of sentence
    const endChars = [" ", "<", "\n"];
    while (!endChars.includes(item.content.charAt(cutoff))) {
      cutoff = item.content.indexOf(".", cutoff) + 1;
    }
  } else {
    cutoff = introEnd;
  }
  const blurb = item.content.substring(introStart, cutoff);
  const titleStart = item.content.indexOf(">", item.content.indexOf("<h1")) + 1;
  const titleEnd = item.content.indexOf("</h1>");
  const title = item.content.substring(titleStart, titleEnd) || meta.name;

  console.log("===================================");
  console.log("Title:", title);
  console.log("Blurb:", blurb);
  console.log("Content:", JSON.stringify(item.content));
  console.log("===================================");
  return {
    ...item,
    niceName: title,
    blurb: blurb,
    tags: [].concat(item.tags, ["article"])
  };
};
