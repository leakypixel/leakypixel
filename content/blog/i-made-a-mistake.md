# HELP! I need to undo a commit!
Firstly, don't panic - git's got your back. In fact, it's got your back two
ways: rebase and revert.

  Using **rebase**, we can completely remove a commit from our history - useful if
  you've added a commit locally or in a personal branch that you'd like to get
  rid of - for example, an experimental commit that was pushed to a test server.

  With **revert**, however, we keep the original commit in the history and add a
  new, special commit that reverts that change. This is useful if you want to
  remember that a change happened and it needed to be reverted - for example, a
  breaking change that made it to live.

We'll first talk about revert, since that's most likely what you'll need. I'll
also assume that you're using the git command line, as that's the lowest common
denominator. 

## Git Revert

In order to revert a commit, we first need to get that commit's hash.
Fortunately, that's very easy - just type `git log` and find the commit you're
interested in. Above the commit message, there will be a line starting with
"commit" and then a hash after it: copy that hash (or memorise it if you're that
way inclined).

Now, in whatever branch you'd like to revert the commit in, run `git revert
<hash of the commit you want to remove>`. That's it! Well, aside from pushing to
the remote and putting in a pull request, anyway. Take a moment here to revel in
the glory of git and how easy it was to undo a change. 




