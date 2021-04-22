# Vue + Lerna Monorepo Blueprint
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

> Blueprint for large Vue JS projects, using Lerna monorepo manager.

## Install

Initialize the project as follows:

```
git clone https://github.com/BJ0815/vue2-monorepo-example.git
cd vue-monorepo-example
yarn initialize
```
This downloads the project into vue-monorepo-example folder, installs all dependencies, prepares Lerna monorepo and creates symlinks for internal dependencies. All is now ready for build.


## Develop
For development time you don't need to build in production mode. It's enough to open terminal and execute

```
npm run dev:client ${project name}
```

It will be available at http://localhost/3000.

## Build
Run the following to build your project:

```
npm run build ${project name}
```
This runs a production build. In each project you will now find /dist folder where project code is bundled.

## ExtraInfo

- `Pre-commit`: 


```bash
lerna run --concurrency 1 --stream lint-staged --since HEAD --exclude-dependents
```

This commandline will diff project which has changed, and execute script "lint-staged" in current project settings