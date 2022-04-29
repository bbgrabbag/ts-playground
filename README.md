# Typescript Playground

*[Release Notes](/changelog.md)*

### Project Overview

A simple node environment bootstrapped with Typescript and Jest.

### Get Started

- `git clone <repo>`
- `npm install`
- `npm run test` (Runs all tests in src/tests).
- `npm run playground` (This only runs the contents of file `src/playground.ts`).

### NPM Scripts Reference

_Each script listed here has a corresponding VSCode task in `.vscode/tasks.json`_

- `npm run test`
  - Runs Jest tests. Does not generate `/dist` folder.
- `npm run playground`
  - Runs `src/playground.ts` file. Does not generate `/dist` folder.
- `npm run build`
  - Generates compiled JS in `/dist` based on settings in `tsconfig.prod.json`.
- `npm run test:build`
  - Generates compiled JS in `/dist` based on settings in `tsconfig.test.json`.
- `npm run dev:build`
  - Generates compiled JS in `/dist` based on settings in `tsconfig.dev.json`.
- `npm run eslint`
  - Lints project based on settings in `.eslintrc`.
- `npm run clean`
  - Removes `/dist` folder containing compiled JS

### VS Code Debug Configurations

##### Found in `.vscode/launch.json`

- `debug-playground`
  - Runs `src/playground.ts` file in debug mode
- `vs-code-jest-tests`
  - Runs Jest tests in debug mode


_It is recommended to install the following VS code extensions:_

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - You may want to make sure this is set as the default formatter for Typescript files in VS code `settings.json`:
  ```json
  "[typescript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
  ```
