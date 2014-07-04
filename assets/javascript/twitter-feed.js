var TwitterFeed = (function() {
  'use strict';

  function TwitterFeed(element) {
    this.element = element;
    var self = this;
    utils.getAJAX({
      url: "https://www.leakypixel.net/experiment/twitter/twitter.php",
      onSuccess: function() {self.showTweets();},
    });
  }

  TwitterFeed.prototype.showTweets = function(tweets) {
    this.element.innerHTML = tweets;
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
