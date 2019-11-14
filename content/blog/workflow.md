# Workflow

## As a developer
* Check out master and pull the latest changes.
* Create a new branch with a friendly name - such as `feature/psychicly-detect-tyre-size` or `fix/header-navigation-width`.
* Start work on a ticket and make one logical change.
* Commit your work, with a link to the ticket in the commit message.
* Push your commit to the remote.
* Repeat until the work is ready to merge.
* Create a merge request from your working branch to develop.
* Assign the merge request to your teammates.
* Once there's been an approval from another developer, they can then merge the branch (but don't delete it at this stage!).
* Once in develop, your work can now be deployed to voyager for testing.
* Once tested and approved, create a merge request again but this time to master.
* Push your branch to the remote - you may need to use `git push --force` as you've altered your branch's history by rebasing.

## If you have merge conflicts with master
* Check out master and pull the latest changes.
* Check out your working branch again.
* Rebase your branch onto master with `git rebase master`.
* If there's a conflict, you'll be dropped to a merge and asked to decide what should happen. As long as everyone uses the same workflow, this should be uncommon.
* Push the working branch to the remote - you may need to use `git push --force` as you've altered your branch's history by rebasing.
* Go back to the merge request and verify there are no conflicts.

## As a maintainer
As long as no changes have been made to develop since the last rebase on the working branch was done, there should be no conflicts and you should just be able to hit merge. If there are merge conflicts:
* Check out master locally and pull the latest changes.
* Check out the working branch.
* Rebase the working branch onto master with `git rebase master`.
* If there's a conflict, you'll be dropped to a merge and asked to decide what should happen. As long as everyone uses the same workflow, this should be rare. If this happens, I would recommend asking the original developer of the working branch to resolve the conflicts using the method above. Should that not be possible, proceed with the merge as usual and don't forget to commit once complete.
* Push the working branch to the remote - you may need to use `git push --force` as you've altered your branch's history by rebasing.
* Go back to the merge request and verify there are no conflicts.
