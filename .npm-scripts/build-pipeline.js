const typeDecorator = require("./decorators/typeDecorator");
const outputDecorator = require("./decorators/outputDecorator");
const articleDecorator = require("./decorators/articleDecorator");

function toNameContentObject(items) {
  return items.reduce(
    (contentObject, item) =>
      Object.assign({}, contentObject, {
        [item.name]: item.content
      }),
    {}
  );
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

        selector: state => [
          { path: "./content", tags: ["markdown"], outputExtension: ".html" },
          { path: "./images" },
          { path: "./styles", outputExtension: ".css" },
          { path: "./partials" },
          { path: "./fonts", outputExtension: ".ttf" },
          { path: "./js", outputExtension: ".js" },
          { path: "./pages" }
        ]
      }
    ],
    [
      {
        func: "decorateFileObject",
        selector: state => state.selectAll(),
        config: {
          decorators: [typeDecorator],
          defaultName: "Home"
        }
      }
    ],
    [
      {
        func: "decorateFileObject",
        selector: state =>
          state
            .matchingAnyTag(["fonts", "content", "js", "styles"])
            .and(state.selectByTag("images").not(state.selectByTag("favicon"))),
        config: {
          decorators: [outputDecorator],
          baseDir: "content"
        }
      },
      {
        func: "decorateFileObject",
        selector: state => state.selectByTag("favicon"),
        config: {
          decorators: [outputDecorator],
          baseDir: "images",
          outputExtension: ".ico"
        }
      },
      {
        func: "copy",
        selector: state => state.matchingAnyTag(["partials", "svgs", "pages"])
      }
    ],
    [
      {
        func: "copyFileTo",
        selector: state => state.selectByTag("fonts"),
        config: { outputDir: "./output" }
      },
      {
        func: "imageMin",
        allowEmpty: true,
        selector: state =>
          state.selectByTag("images").not(state.selectByTag("svgs")),
        config: {
          outputDir: "./output"
        }
      },
      {
        func: "readInFile",
        selector: state => {
          return state.not(
            state
              .selectByTag("images")
              .not(state.selectByTag("svgs").and(state.selectByTag("fonts")))
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
        selector: state => state.matchingAnyTag(["styles", "svgs", "js"])
      }
    ],
    [
      {
        func: "gitAdded",
        selector: state =>
          state
            .selectByTag("blog")
            .selectByTag("markdown")
            .not(state.selectByTag("index")),
        config: {}
      },
      {
        func: "copy",
        selector: state => {
          return state.matchingAnyTag([
            "pages",
            "styles",
            "svgs",
            "index",
            "contact",
            "js"
          ]);
        }
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
            "contact",
            "js"
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
                .sort((a, b) => b.added.timestamp - a.added.timestamp)
            },
            template: matchingTemplate
          };
        }
      },
      {
        func: "copy",
        selector: state =>
          state.selectByTag("styles").and(state.selectByTag("js"))
      }
    ],
    [
      {
        func: "minifyHtml",
        selector: state => state.selectAll().not(state.selectByTag("js"))
      },
      {
        func: "minifyJS",
        selector: state => state.selectByTag("js")
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
