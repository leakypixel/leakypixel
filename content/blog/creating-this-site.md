# Creating this site

I, like many other people I know, procrastinate pretty heavily when it comes to
personal projects - I get started to learn a new thing, and once that's done, I
lose interest and the project never gets finished. You might say that's why I've
had nothing here for a number of years, or you could say that it was my
atrocious decision to not use something off the shelf in the first place. Either
way, I've finally got around to it and here we are!


## The build

I'd decided to use a JS-based pipeline runner I wrote many years ago to generate
my static site. Having come back to it, I'm amazed it ever worked. There is a
joy to coming back to old projects, binning pretty much all the code and writing
it again with new ideas and fresh motivation, and I found this particular
reincarnation very rewarding. It's called
[grapefruit](//github.com/leakypixel/grapefruit), and is a fairly basic pipeline
runner. It can be used for static sites (like this one), processing assets for
tabletop games, for generating invoices and many other things that it's not a
particularly good tool for. It takes a list of "steps" that select from a state,
then run a function that returns a new state (a little like the Redux model) and
goes onto the next step.

There's no JS on this site barring the night mode switch at the top there,
because it's completely unnecessary on something this simple, and I don't really
have any need or want to track people (for myself or google). I might add some
kind of stat counting in the future, but I doubt it will be javascript based - I
know it's standard, but what with tracking protection, noscript and other
similar tools, I doubt the JS based tracking is particularly reliable.


## The pipeline

I chose to host the [source code](//github.com/leakypixel/leakypixel) for this
site on github, primarily because that's where it was when I started and didn't
see a need to change. I do host my own git server, but github is far more
discoverable and there's no real benefits for this moving over - transfer speed
would have been improved, but since the files are all tiny, why bother? That
said, I am building on my own jenkins instance because it's nice to be able to
queue up builds one after the other and not worry about tiers or pricing.

I chose to have a play with jenkins declarative pipelines for the build and
deploy, and while my use case isn't very complex, I did find it very easy to get
along with. There were a few things that were a little jarring coming from
the UI-based config that I'm used to, and odd little hacks here and there
(`script {` I mean you) - but all in all, it's a great tool and one I'll be
sticking with. 


## Further
There's lots of things I could add right now, such as article tagging/sorting or
pagination for entries, but overall I'm happy to just have this out the door and
done to a standard I'm happy with. I'd like to write a little more often and a
little more publicly than my `~/notes/` folder, but I can't promise I won't be
distracted by some other new, shiny thing. 

At least I got MVP out though, right? :)
