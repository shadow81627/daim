---
title: Whats the best Git workflow?
date: 2021-06-11T07:36:04Z
modified: 2022-04-22T04:57:13.272Z
description: I want to detail a terse but complete description of a simple workflow for continuous delivery.
image: /img/blog/git-workflow.png
color: '#f8f8f8'
---

## Workflow

The simple workflow I want to describe has two guiding principles:

1. Main default branch is always production-like and deployable.
2. Rebase during feature development, explicit (non fast-forward) merge when done.
\
Pulling change-sets using rebase rewrites the history of the branch you’re working on and keeps your changes on top.

### 1. **Create a Github issue**

Use a Issue template to provide a skeleton of all the details needed for a good issue.

### 2. **Pull** latest changes from Main default branch

`git pull origin main`

### 3. **Branch** off to isolate the feature or bug-fix work in a branch

Now create a branch for the feature or bug-fix:
`git checkout -b feature/ISSUE-123-awesome-feature`
The branch name structure I show here is the one we use, but you can pick any convention you feel comfortable with.

### 4. **Commit messages**

Work on the feature as long as needed. Make sure your commits are meaningful and do not cluster separate changes together.

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) Structured as follows:

```markdown
<type>([optional scope]): <description>

More details about the change

resolves #GITHUB_ISSUE_ID
```

**Types:**

By default we use types specified in [commitizen conventional-commit-types](https://github.com/commitizen/conventional-commit-types/blob/v3.0.0/index.json). You can override the valid types eg. [gitmoji](https://github.com/carloscuesta/gitmoji/blob/master/src/data/gitmojis.json).

- **feat:** Introduce new features.
- **fix:** Fix a bug.
- **docs:** Add or update documentation.
- **style:** Improve structure / format of the code.
- **refactor:** Refactor code.
- **perf:** Improve performance.
- **test:** Add or update tests.
- **ci:** Add or update CI build system.
- **chore:** Add or update configuration files.
- **revert:** Revert changes.

### 5. Frequently **push** your branch remotely

Always push commits to remote so that if your local machine fails you do not lose work. Sharing your work also allows for soliciting feedback from reviewers. `git push -u origin ISSUE-123-awesome-feature` (if the branch is already set as 'upstream' and the name of your remote is 'origin', 'git push' is enough)

### 6. Create a **pull request**

- Add reviews
- Add Labels
- Use Pull Request template
- Link Issue

### 7. **Rebase** to keep your feature branch fresh and up to date with the latest changes in master

Every once in a while during the development update the feature branch with the latest changes in master. You can do this with:

```bash
git fetch origin
git rebase origin/master
```

In the (somewhat less common) case where other people are also working on the same shared remote feature branch, also rebase changes coming from it:
`git rebase origin/feature/ISSUE-123-awesome-feature`
At this point solve any conflicts that come out of the rebase.
Resolving conflicts during the rebase allows you to have always clean merges at the end of the feature development. It also keeps your feature branch history clean and focused without spurious noise.

### 8. Perform a final **rebase** cleanup after the pull request gets approved

Before the review, it's good to perform a final cleanup and scrub of the feature branch commit history to remove spurious commits that are not providing relevant information. An experienced team can handle it – you can rebase also during development, but I don't recommend it.

`git rebase -i origin/main`
(At this point if you have rewritten the history of a published branch and if no one else will commit to it or use it, you might need to push your changes using the –force flag).

### 9. Once approved, **merge** to main branch

When finished with the development of the feature branch and reviewers have reviewed your work, merge using the flag –no-ff. This will preserve the context of the work and will make it easy to revert the whole feature if needed. Here are the commands:

```bash
git checkout master
git pull origin master

git merge --no-ff ISSUE-123-awesome-feature
```

If you followed the advice above and you have used rebase to keep your feature branch up to date, the actual merge commit will not include any changes; this is cool! The merge commit becomes a marker that stores the context about the feature branch.

## Useful .gitconfig option to toggle

Instruct git that every pull uses rebase instead than merge and it preserves while doing so:

```bash
git config --global branch.autosetuprebase always
git config --global pull.rebase preserve
```

Not everyone likes to change the default behavior of core commands so you should incorporate the above if you understand its implications. See Stack Overflow for details on preserve merges.

## References

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Commitizen conventional-commit-types](https://github.com/commitizen/conventional-commit-types/blob/v3.0.0/index.json)
- [🔨 [git]: Write better commits with Gitmoji](https://dev.to/javidjms/git-write-better-commits-with-gitmoji-3193)
- [Gitmoji - Yay or Nay?](https://opensource.christmas/2019/11)
- [Atlassian simple git workflow](https://www.atlassian.com/blog/git/simple-git-workflow-is-simple)
- [Simple git branching model](https://gist.github.com/jbenet/ee6c9ac48068889b0912)
- [Understanding GitHub flow](https://guides.github.com/introduction/flow/)
- [Introduction to Gitlab flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
