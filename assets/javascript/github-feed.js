var GithubFeed = (function() {
  'use strict';

  function GithubFeed(element) {
    this.element = element;
    var self = this;
    utils.getAJAX({
      url: "https://api.github.com/users/leakypixel/repos?sort=updated",
      onSuccess: function(repos) {self.showRepos(repos);},
      onRequestError: function(data) {self.error(data);},
      onServerError: function(data) {self.error(data);}
    });
  }

  GithubFeed.prototype.showRepos = function(repos) {
    var self = this,
      repositories = [];
    utils.each(repos, function(repo) {
      var repository = {
        name: repo.name,
        url: repo.html_url,
        description: repo.description
      };
      repositories.push(repository);
    });

    utils.each(repositories, function(repo) {
      var repoContainer = document.createElement("div"),
        repoName = document.createElement("a"),
        repoDescription = document.createElement("p");

      repoContainer.classList.add("repo");
      repoName.innerHTML = repo.name;
      repoName.href = repo.url;
      repoName.title = repo.name;
      repoDescription.innerHTML = repo.description;
      repoContainer.appendChild(repoName);
      repoContainer.appendChild(repoDescription);
      self.element.appendChild(repoContainer);
    },3);
    this.element.classList.add("loaded");
  };

  GithubFeed.prototype.error = function(data) {
    this.element.innerHTML = "there was an error fetching repos";
    this.element.classList.add("error");
  };

  return GithubFeed;
}());

utils.onReady(function() {
  var githubFeeds = document.getElementsByClassName("github-feed");
  if (githubFeeds) {
    Array.prototype.forEach.call(githubFeeds, function(element){
      new GithubFeed(element);
    });
  }
});
