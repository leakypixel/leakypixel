# I don't know what I've built

It started as a code kata - implement some common operations in a simple,
functional way and run them in a configurable order on some data. What it turned
into I'm not sure I have a good name for, perhaps a functional pipeline runner? 
Unable to properly label this creation, I decided on the name [grapefruit](https://github.com/leakypixel/grapefruit) because
I'd learned that a [grapefruit is a hybrid
fruit](https://en.m.wikipedia.org/wiki/Grapefruit#History) earlier that day and it had
stuck in my mind. 

## What it does
It takes a config, which contains a list of steps to run, along with the required
functions, and initial state and a few other optional things like a log handler
and a state provider. It then selects from state based on a function provided in
the step description, configures (through partial application) the step's named
function (referred to as an action), and then
runs it against each element selected from state. Once each part of a step has
been run, the result is used as the new state passed to the next step and the
cycle runs again.

## What's it for?
There are many better ways of doing whatever you would use grapefruit for - [Hugo](https://gohugo.io/)
or [Jekyll](https://jekyllrb.com/) for a static site, spreadsheets or scripts for transforming data - but
that's not the point. I didn't build grapefruit with the intention of producing
a quality solution for a specific problem, I built it simply for fun. I do use
it to generate this site and also for various board or table-top game related
things, something which it works _fine_ for, but that's mostly just because I
wanted to throw a problem at the solution and see how well it worked.

I'm still hacking around on grapefruit here and there - there's huge
improvements that can be made, removing a lot of the promise wrappers around
other promises being the main one, but that's not work that's very much fun so I
am unlikely to do it in any real hurry.

## Why would you do this?
Okay, so this is the real point of this post - to code for fun, making something
that anyone else is unlikely to use and developing without pressure from myself
or anyone else. I think that having projects like this is important in whatever
hobby you also do in service - for example, I love cooking for other people and
do so a few times a week. The enjoyment of this hasn't yet faded for me, but
every one or two weeks I'll take time out to produce something just for me
that's entirely experimental - something that I can do without expectations.
It's about the process itself and exploring an idea without worrying whether
anyone will like it, or if it's even a good idea.

For me, I feel these projects help prevent poisoning the well when it comes to
coding: I often work on projects with demanding deadlines, and projects like
this help remind me that programming isn't all pressure and JIRA tickets - it
can be fun as well.
