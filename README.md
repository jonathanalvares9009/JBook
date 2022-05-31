# JBook: Run Javascript code in the browser

`Developed by Jonathan Elroy Alvares`

## Architecture

The package is divided into three packages:

- [cli](./packages/cli/src/index.ts) (which contains all the code needed to run the cli part).
- local-api (which contains the code for saving the files, creating files and reading files for editing)
- local-client (the frontend for the application)

## Development Tools

- Lerna (for package management).

Run `npm run start` to start the development server

- Typescript (for static type checking across the entire codebase).
