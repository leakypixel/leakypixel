# Weeknotes ending 07-02-2021

* I've continued with my work around the house, and replaced the knife rack that
  was giving me grief last week with another that seems to be working very well.
  As usual with this type of thing, steady progress beats bursts of productivity
  for me, so keeping up with the one thing off the list every day rule has
  continued to work well.
  
* Recently, I've been growing some oyster mushrooms from spores in order to
  learn more about their growth and required conditions. It's been interesting
  to watch the mycelium develop, I'm hoping to harvest some spores from these
  and keep regrowing. 
  
* Also this week, I've been playing with some more in-depth ESP8266 stuff,
  namely PWM outputs and on-device automations. I'm using
  [ESPHome](http://esphome.io/), which is nothing short of amazing. I'm learning
  quite quickly (mostly thanks to the wonderful esphome documentation) and I'm
  looking to create a fruiting chamber for the oyster mushrooms as a test
  project.
  
* Due to COVID-19, we were unable to complete our secret santa gift-giving
  around Christmas this year, so it got pushed back to this week over video
  call. It was really nice to see everyone's faces again, especially people
  seeing their gifts for the first time. I got my giftee a recipe book with
  recipes from their homeland as they've fairly recently moved to England - it
  was very well received and I look forward to trying the things in there. I got
  my first commander deck for Magic the Gathering, something I'm excited to play
  more of.
  
* Work this past couple of weeks has been a bit of a pain, mostly due to
  implementing our whole redux store as a worker thread. There are several
  troublesome limitations, including not being able to pass functions across
  threads - say goodbye to redux-thunk. I can finally see the light at the end
  of the tunnel now, and hopefully moving all our calculations off the UI thread
  will make the app feel much snappier.
