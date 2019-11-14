const path = require("path");

function getNiceNameFromFilename(filename) {
  return (filename.charAt(0).toUpperCase() + filename.slice(1)).replace(
    /-/g,
    " "
  );
}
function toNameContentObject(items) {
  return items.reduce(
    (contentObject, item) =>
      Object.assign({}, contentObject, {
        [item.name]: item.content
      }),
    {}
  );
}

function typeDecorator(config, item, meta) {
  return {
    ...item,
    name: meta.name,
    niceName: getNiceNameFromFilename(meta.name),
    dir: meta.dir,
    type: meta.dir.split("/")[0],
    tags: [].concat(item.tags, meta.dir.split("/"), [meta.name])
  };
}
function outputDecorator(config, item, meta) {
  const outputDir = path.join(meta.dir.replace(config.baseDir, ""));
  return {
    ...item,
    outputPath: `${path.join(outputDir, meta.name)}`,
    outputDir: outputDir,
    outputExtension: config.outputExtension || meta.ext
  };
}

function articleDecorator(config, item, meta) {
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
}

module.exports = {
  steps: [
    [
      {
        func: "rmrf",
        item: {
          path: "./output"
        }
      }
    ],
    [
      {
        name: "Read in markdown for index",
        func: "listDirectory",
        config: {
          directory: "./content"
        },
        item: {
          tags: ["markdown"]
        }
      },
      {
        func: "listDirectory",
        config: {
          directory: "./images"
        },
        item: {}
      },
      {
        func: "listDirectory",
        config: {
          directory: "./styles"
        },
        item: {}
      },
      {
        func: "listDirectory",
        config: {
          directory: "./partials"
        },
        item: {}
      },
      {
        func: "listDirectory",
        config: {
          directory: "./pages"
        },
        item: {}
      }
    ],
    [
      {
        func: "decorateFileObject",
        selector: state => state.selectAll(),
        config: {
          decorators: [typeDecorator]
        }
      }
    ],
    [
      {
        func: "decorateFileObject",
        selector: state => state.selectByTag("content"),
        config: {
          decorators: [outputDecorator],
          baseDir: "content",
          outputExtension: ".html"
        }
      },
      {
        func: "decorateFileObject",
        selector: state => state.selectByTag("styles"),
        config: {
          decorators: [outputDecorator],
          baseDir: "styles",
          outputExtension: ".css"
        }
      },
      {
        func: "copy",
        selector: state => state.matchingAnyTag(["partials", "svgs", "pages"]),
        config: {}
      }
    ],
    [
      {
        func: "imageMin",
        selector: state =>
          state.selectByTag("images").not(state.selectByTag("svgs")),
        allowEmpty: true,
        config: {
          outputDir: "./output"
        }
      },
      {
        func: "readInFile",
        selector: state => {
          console.log(state.matchingAnyTag(["partials", "svgs"]));
          return state.not(
            state.selectByTag("images").not(state.selectByTag("svgs"))
          );
        }
      }
    ],
    [
      {
        func: "markdownToHtml",
        selector: state => state.selectByTag("markdown")
      },
      {
        func: "compileTemplates",
        selector: state => state.selectByTag("pages"),
        getConfig: state => ({
          partials: state.selectByTag("partials")
        })
      },
      {
        func: "copy",
        selector: state =>
          state.selectByTag("styles").and(state.selectByTag("svgs"))
      }
    ],
    [
      {
        func: "decorateFileObject",
        selector: state =>
          state
            .selectByTag("blog")
            .selectByTag("markdown")
            .not(state.selectByTag("index")),
        config: {
          decorators: [articleDecorator],
          cutoffLength: 120
        }
      },
      {
        func: "copy",
        selector: state => {
          return state.matchingAnyTag([
            "pages",
            "styles",
            "svgs",
            "index",
            "contact"
          ]);
        }
      }
    ],
    [
      {
        func: "renderTemplate",
        deferConfig: true,
        selector: state => state.selectByTag("content"),
        getConfig: (state, currentItem) => {
          const matchingTemplate = state
            .selectByTag("pages")
            .mostMatchingTags(currentItem.tags);
          console.log(
            `Rendering ${currentItem.dir}/${currentItem.name} with ${
              matchingTemplate.dir
            }/${matchingTemplate.name}`
          );
          return {
            meta: {
              title: currentItem.niceName,
              svgs: toNameContentObject(state.selectByTag("svgs")),
              partials: toNameContentObject(state.selectByTag("partials")),
              entries: state
                .selectByTag("blog")
                .selectByTag("markdown")
                .not(state.selectByTag("index"))
            },
            template: matchingTemplate
          };
        }
      },
      {
        func: "copy",
        selector: state => state.selectByTag("styles")
      }
    ],
    [
      {
        func: "minifyHtml",
        selector: state => state.selectAll()
      }
    ],
    [
      {
        func: "writeOutFile",
        selector: state => state.selectAll(),
        config: { outputDir: "./output" }
      }
    ]
  ]
};
