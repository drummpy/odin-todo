# JS template

Template repository for javascript projects.

Contains modules for webpack, HTML plugin (to handle HTML), CSS loaders, HTML loader (to parse URLs for imgs), and webpack dev server.
Also contains webpack merge.

Will update with current modules as necessary.

### Initial Setup

Run following to install necessary modules:

- npm install --save-dev webpack webpack-cli
- npm install --save-dev html-webpack-plugin
- npm install --save-dev style-loader css-loader
- npm install --save-dev html-loader
- npm install --save-dev webpack-dev-server
- npm install --save-dev webpack-merge

npm install --save-dev webpack@latest webpack-cli@latest html-webpack-plugin@latest style-loader@latest css-loader@latest html-loader@latest webpack-dev-server@latest webpack-merge@latest

### To Deploy (Console Commands)

1. git branch gh-pages _(New branch to deploy)_
2. git checkout gh-pages && git merge main --no-edit _(Switch to gh-pages branch & merge from main)_
3. npm run build _(Builds with Webpack)_
4. git add dist -f && git commit -m "Deployment commit" _(Add dist, force over gitignore & commit)_
5. npm run deploy _(Runs git subtree push --prefix dist origin gh-pages which pushes to gh pages)_
6. git checkout main _(Return to main branch)_

### Current NPM Script Commands ('npm run (script cmd)')

- "start": "webpack serve --open --config webpack.dev.js"
- "build": "webpack --config webpack.prod.js"
- "deploy": "git subtree push --prefix dist origin gh-pages"
