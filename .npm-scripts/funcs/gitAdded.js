const simpleGit = require("simple-git")();

function getSplitTime(date) {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    date: date.getUTCDate(),
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes()
  };
}

function getFileDetails(commits) {
  const firstCommit = commits[commits.length - 1] || {};
  const lastCommit = commits[0] || {};
  const addDate = new Date(firstCommit.date);
  const modifiedDate = new Date(lastCommit.date);
  return {
    added: { ...getSplitTime(addDate), commitId: firstCommit.hash },
    modified: { ...getSplitTime(modifiedDate), commitId: lastCommit.hash },
    authorName: firstCommit.author_name || "not committed yet",
    authorEmail: firstCommit.author_email || "not committed yet"
  };
}

module.exports = function gitAdded(config, item) {
  return new Promise((resolve, reject) => {
    simpleGit.log(
      {
        file: item.path,
        format: {
          hash: "%H",
          date: "%aI",
          message: "%s",
          refs: "%D",
          body: "%B",
          author_name: "%aN",
          author_email: "%ae"
        }
      },
      (err, res) => {
        if (err) {
          reject(e);
        } else {
          resolve({
            ...item,
            ...getFileDetails(res.all)
          });
        }
      }
    );
  });
};
