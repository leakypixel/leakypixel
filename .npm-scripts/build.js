const Grapefruit = require("../../grapefruit");
const careless = require("careless-fs");
const buildPipeline = require("./build-pipeline");
const fs = require("fs");

const logfilePath = "./last-build.log";
const log = fs.createWriteStream(logfilePath, { flags: "w" });

const runner = new Grapefruit({
  emitter: event => {
    log.write(JSON.stringify(event, null, 2));
    log.write("\n");
  },
  funcs: {
    listDirectory: require("./funcs/listDirectory.js"),
    imageMin: require("./funcs/imageMin.js"),
    decorateFileObject: require("./funcs/decorateFileObject.js"),
    readInFile: require("./funcs/readInFile.js"),
    minifyHtml: require("./funcs/minifyHtml.js"),
    writeOutFile: require("./funcs/writeOutFile.js"),
    compileTemplates: require("./funcs/compileTemplates.js"),
    renderTemplate: require("./funcs/renderTemplate.js"),
    markdownToHtml: require("./funcs/markdownToHtml.js"),
    parseJson: require("./funcs/parseJson.js"),
    rmrf: require("./funcs/rmrf.js"),
    copy: require("./funcs/copy.js")
  }
});

const pipeline = runner.runPipeline(buildPipeline);
pipeline
  .then(function(res) {
    console.log("Pipeline complete.");
    log.close();
    console.log(`History written to ${logfilePath}`);
  })
  .catch(function(err) {
    console.log(
      "Pipeline error:",
      err.message
        ? JSON.stringify(err.message, null, 2)
        : JSON.stringify(err, null, 2)
    );
    log.close();
    console.log(`History written to ${logfilePath}`);
  });
