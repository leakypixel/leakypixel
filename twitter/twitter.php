<?php
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
  'oauth_access_token' => "188277043-OGEc7Spr3IFconB6LRqN0aG9p863dtYBGp9eXSXc",
  'oauth_access_token_secret' => "1bvobA2kdaA8J6DHKgtmxkk5Sz29Tp62UPYZZhPu3OzH9",
  'consumer_key' => "ChOOqqXu2KRqmmkmssuFk3NP3",
  'consumer_secret' => "8J7VsxbEwIRXEBlfgnvgeuoYJ0dRDcCv95kXZe2fT6OnDjkmDd"
);

$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name=leakypixel&count=12&trim_user=true';
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)
  ->buildOauth($url, $requestMethod)
  ->performRequest();

#var_dump($response);

$tweets = (JSON_decode($response));

#var_dump($tweets);

$tweetArray = array();

foreach ($tweets as $key=>$tweet) {
  $tweettext = $tweet->text;
  $links = $tweet->entities->urls;
  $tweetArray[$key] = [$tweettext, $links];
  var_dump($tweetArray[$key]);
  echo("<br />----------------------------------------------------------------------------------<br />");
}

#echo("<br />wonder what the array looks like?<br />");
#var_dump($tweetArray);


?>
