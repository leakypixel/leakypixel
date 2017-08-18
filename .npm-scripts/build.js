const http = require('http');

const readInFile = require("./build/read-in-file.js");
const writeOutHtml = require("./build/write-out-html.js");
const handlebarsToHtml = require("./build/handlebars-to-html.js");
const markdownToHtml = require("./build/markdown-to-html.js");

const Grapefruit = require("grapefruit");

const config = require("../config.json");

function done(file) {
  console.log("Done!");
}
Grapefruit.composers = {
  readInFile,
  writeOutHtml,
  handlebarsToHtml,
  markdownToHtml
};

for (var x = 0; x < config.tasks.length; x++) {
  let task = new Grapefruit(config.tasks[x]);
  task.data.date = new Date().toString();
  task.series([
    {"composers": "readInFile"},
    {"composers": "markdownToHtml"},
    {"composers": "handlebarsToHtml"},
    {"composers": "writeOutHtml"}
  ])
    .then(function() {
      done(task);
    })
    .catch(function(err) {
      console.log("ERROR:", err);
    });
}

