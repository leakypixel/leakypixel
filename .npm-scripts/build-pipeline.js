const path = require("path");

function getNiceNameFromFilename(filename) {
  return (filename.charAt(0).toUpperCase() + filename.slice(1)).replace(
    /-/g,
    " "
  );
}

function meta(config, item, meta) {
  const outputDir = path.join(meta.dir.replace(config.baseDir, ""));
  return {
    ...item,
    name: meta.name,
    niceName: getNiceNameFromFilename(meta.name),
    outputPath: `${path.join(outputDir, meta.name)}`,
    outputExtension: ".html"
  };
}

function addBlurb(config, item, meta) {
  const introStart = item.content.indexOf("<p>") + 3;
  const introEnd = item.content.indexOf("</p>");
  let cutoff;
  if (introEnd - introStart > config.cutoffLength) {
    cutoff = item.content.indexOf(".", introStart + config.cutoffLength) + 1;
  } else {
    cutoff = introEnd;
  }
  const blurb = item.content.substring(introStart, cutoff);
  return {
    ...item,
    blurb: blurb
  };
}

module.exports = {
  steps: [
    [
      {
        name: "Read in markdown for index",
        func: "listDirectory",
        config: {
          directory: "./content"
        },
        item: {
          tags: ["index", "markdown"]
        }
      },
      {
        name: "Read in markdown for articles",
        func: "listDirectory",
        config: {
          directory: "./content/articles"
        },
        item: {
          tags: ["articles", "markdown"]
        }
      },
      {
        func: "listDirectory",
        config: {
          directory: "./styles"
        },
        item: {
          tags: ["styles"]
        }
      },
      {
        func: "listDirectory",
        config: {
          directory: "./templates"
        },
        item: {
          tags: ["templates"]
        }
      }
    ],
    [
      {
        func: "readInFile",
        selector: ({ selectMany }) => selectMany(item => Boolean(item.path))
      }
    ],
    [
      {
        func: "decorateFileObject",
        selector: ({ selectMany }) => selectMany(item => true),
        config: {
          decorators: [meta],
          baseDir: "content"
        }
      }
    ],
    [
      {
        func: "markdownToHtml",
        selector: ({ selectByTag }) => selectByTag("markdown")
      },
      {
        func: "compileTemplates",
        selector: ({ selectByTag }) => selectByTag("templates")
      },
      {
        func: "copy",
        selector: ({ selectByTag }) => selectByTag("styles")
      }
    ],
    [
      {
        func: "decorateFileObject",
        selector: ({ selectByTag }) => selectByTag("articles"),
        config: {
          decorators: [addBlurb],
          cutoffLength: 120
        }
      },
      {
        func: "copy",
        selector: ({ selectByTag }) =>
          [].concat(
            selectByTag("templates"),
            selectByTag("styles"),
            selectByTag("index")
          )
      }
    ],
    [
      {
        func: "renderTemplate",
        selector: ({ selectMany }) =>
          selectMany(item => item.tags.includes("articles")),
        getConfig: ({ selectOne }) => ({
          meta: {
            styles: selectOne(item => item.name === "main")
          },
          template: selectOne(
            item => item.tags.includes("templates") && item.name === "article"
          )
        })
      },
      {
        func: "renderTemplate",
        selector: ({ selectOne }) =>
          selectOne(
            item => item.tags.includes("markdown") && item.name === "index"
          ),
        getConfig: ({ selectByTag, selectOne }) => ({
          meta: {
            title: "All entries",
            entries: selectByTag("articles"),
            styles: selectOne(item => item.name === "main")
          },
          template: selectOne(
            item => item.tags.includes("templates") && item.name === "index"
          )
        })
      }
    ],
    [
      {
        func: "minifyHtml",
        selector: ({ selectMany }) => selectMany(item => true)
      }
    ],
    [
      {
        func: "writeOutFile",
        selector: ({ selectMany }) => selectMany(item => true),
        config: { outputDir: "./output" }
      }
    ]
  ]
};
