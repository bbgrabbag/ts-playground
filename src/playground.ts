/**
 * @file - `npm run playground` command executes contents of this file. Not included in main build script.
 */

import * as ts from "typescript";

const hello = (message: string): void => console.log(message);

hello(
  `Welcome to Typescript Playground. Currently using version ${ts.version}`
);
