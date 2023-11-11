# Chic

## Git protocol
### To update your feature branch
- Go to your local dev branch: `git checkout dev`
- Pull the updates: `git pull origin dev`
- Switch to your feature branch: `git checkout <feature-branch>`
- Merge the updates from develop to your feature branch: `git merge dev`
- resolve any conflicts

### To add your changes
#### On VsCode:
- YOU SHOULD BE ON A FEATURE BRANCH
- `git add <files>`
- `git commit -m "... Name <name@example.com>"`
- `git push origin feature-branch` (creating a remote version of your feature branch)

#### On Github (When you are ready to send your changes to the dev branch)
- Your feature branch should now be on Github
- Go to Pull requests on the top navigation bar
- click on New Pull Request
- Set your <b>base</b> to <b>dev</b>
- Set your <b>compare</b> to <b>your feature branch</b>
- Click create pull request <b>(DO NOT MERGE PULL REQUEST)</b>
- Ask someone to review your pull request
- after a review, you can merge the pull request into dev branch

<b>YOU SHOULD NEVER:</b>
- `git push origin dev`
- `git push origin main`