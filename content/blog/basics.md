# git commit -m "TODO: Think of title"
Managing git workflow to avoid conflicts and make things easy when things go wrong.

## Commits and Branches
By now we all know how to create a branch, but what does a branch actually represent? A branch might contain a new feature, bugfixes, or anything else, but at the most basic level a branch is a set of changes. Thinking of a branch in this way, it makes using commonly misunderstood git operations make much more sense - hopefully this will become apparent as we go on.

So if a branch is a *changeset*, a commit is a single *change*. So, we now have a *changeset* containing *changes*. These individual commits (changes) should be tied to an individual ticket, but a branch (changeset) should not. If a commit is a ticket, then the branch should be it's "epic". This allows multiple developers to work together on a feature with multiple tickets, and ties **actual changes** to tickets, rather than sets (which frequently include other tickets).

## Changes and Changeset thinking
Using the changes and changeset thinking makes navigating our git history easy, and links it with tickets in a way which is useful **even when the developer that made the change is long gone** because tickets and commits become inextricably linked.
* If we want to see the ticket which caused a change, we simply use the link to the ticket in the commit.
* Writing a commit message prompts us for a ticket link, which ensures that we always have a ticket for a change - meaning changes are easily trackable even for a non-technical user.
* If we want to see all code changes related to a ticket, we search for commits referencing the ticket in question.
* Should we need to see the progress of a feature, we can check that branch out and view multiple people's work together without needing to merge to an intermediate (such as develop).

It also allows us many other benefits that fit into the agile methodology - we can roll back progress on a feature and test in isolation, or rescue a broken deployment at an atomic (change) or molecular (changeset) level. Having this flexibility grants us the freedom to deploy a feature as soon as there is a benefit, while being able to keep improving that same changeset or roll back subsequent improvements (changes) without removing the entire changeset.

## Rebase and Merge
Now we're thinking about commits and branches as sets of changes, the name "rebase" suddenly makes more sense: we've *base*d our changes on a certain point in time (a particular commit) and we would like to *rebase* them on the latest changes before we merge. We have our changeset, which we then rebase onto the branch we intend to merge to - this pulls in the latest changes from said branch and replays our changes on top. So now when to rebase should now be a little clearer - when you want to rebase your changes on another commit.

So if rebase allows us to rebase our changeset on a particular commit, what is merge really for? Well, merging our changesets. We've made our changes and ensured they're based on the latest commit of our progress branch (in our case, develop) and now we want to merge our changeset with all the others. We merge in changesets, as we're pulling multiple things into the same place - merging them, whereas rebase re-bases our work on something else.


