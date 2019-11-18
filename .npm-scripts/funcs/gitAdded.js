const simpleGit = require("simple-git")();

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
          const firstCommit = res.all[res.all.length - 1];
          if (firstCommit) {
            const commitDate = new Date(firstCommit.date);
            resolve({
              ...item,
              added: {
                year: commitDate.getUTCFullYear(),
                month: commitDate.getUTCMonth(),
                date: commitDate.getUTCDate(),
                hours: commitDate.getUTCHours(),
                minutes: commitDate.getUTCMinutes()
              },
              authorName: firstCommit.author_name,
              authorEmail: firstCommit.author_email
            });
          } else {
            const commitDate = new Date();
            resolve({
              ...item,
              added: {
                year: commitDate.getUTCFullYear(),
                month: commitDate.getUTCMonth(),
                date: commitDate.getUTCDate(),
                hours: commitDate.getUTCHours(),
                minutes: commitDate.getUTCMinutes()
              },
              authorName: "not committed yet",
              authorEmail: "not committed yet"
            });
          }
        }
      }
    );
  });
};
