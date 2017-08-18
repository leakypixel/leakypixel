const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

function markdownToHtml(input) {
  return new Promise(function(resolve, reject) {
    input.buffers.renderedMarkdown = input.buffers.markdown.map(function(md) {
      return marked(md);
    });
    resolve(input);
  });
}

module.exports = markdownToHtml;
