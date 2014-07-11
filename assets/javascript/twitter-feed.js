var TwitterFeed = (function() {
  'use strict';

  function TwitterFeed(element) {
    this.element = element;
    var self = this;
    utils.getAJAX({
      url: "https://www.leakypixel.net/feed/twitter/",
      onSuccess: function(tweets) {self.showTweets(tweets);},
      onRequestError: function(data) {self.error(data);},
      onServerError: function(data) {self.error(data);}
    });
  }

  TwitterFeed.prototype.showTweets = function(tweets) {
    var self = this;
    utils.each(tweets, function(tweet) {
      var tweetContainer = document.createElement("p");
      tweetContainer.innerHTML = tweet;
      tweetContainer.classList.add("tweet");
      self.element.appendChild(tweetContainer);
    });
    this.element.classList.add("loaded");
  };

  TwitterFeed.prototype.error = function(data) {
    this.element.innerHTML = "there was an error fetching tweets";
    this.element.classList.add("error");
  };

  return TwitterFeed;
}());

utils.onReady(function() {
  var twitterFeeds = document.getElementsByClassName("twitter-feed");
  if (twitterFeeds) {
    Array.prototype.forEach.call(twitterFeeds, function(element){
      new TwitterFeed(element);
    });
  }
});
