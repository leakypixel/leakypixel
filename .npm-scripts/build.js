const Grapefruit = require("grapefruit");
const careless = require("careless-fs");
const buildPipeline = require("./build-pipeline");
const history = new Grapefruit.History();

const runner = new Grapefruit({
  emitter: history.push,
  funcs: {
    listDirectory: require("./funcs/listDirectory.js"),
    decorateFileObject: require("./funcs/decorateFileObject.js"),
    readInFile: require("./funcs/readInFile.js"),
    minifyHtml: require("./funcs/minifyHtml.js"),
    writeOutFile: require("./funcs/writeOutFile.js"),
    compileTemplates: require("./funcs/compileTemplates.js"),
    renderTemplate: require("./funcs/renderTemplate.js"),
    markdownToHtml: require("./funcs/markdownToHtml.js"),
    parseJson: require("./funcs/parseJson.js"),
    copy: require("./funcs/copy.js")
  }
});

const pipeline = runner.runPipeline(buildPipeline);
pipeline
  .then(function(res) {
    careless
      .write({
        path: "last-build.log",
        content: JSON.stringify(history.get(), null, 2)
      })
      .then(file => {
        console.log(`History written to ${file.path}`);
      })
      .catch(e => {
        console.log(
          `History could not be written: ${JSON.stringify(e, null, 2)}`
        );
      });
    console.log("Pipeline complete.");
  })
  .catch(function(err) {
    careless
      .write({
        path: "last-build.log",
        content: JSON.stringify(history.get(), null, 2)
      })
      .then(file => {
        console.log(`History written to ${file.path}`);
      })
      .catch(e => {
        console.log(
          `History could not be written: ${JSON.stringify(e, null, 2)}`
        );
      });
    console.log("Pipeline error:", JSON.stringify(err.message, null, 2));
  });
