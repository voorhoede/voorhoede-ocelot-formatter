# Contributing

The aim of this project is to allow users to *format plain content as Voorhoede pages*.
Contributions should be aimed towards this and/or improve the development workflow.

## Guidelines

### Pull Requests

For new additions or changes to the modules, create a branch and submit a Pull Request.
Only add/change one module per Pull Request.

### Commit message format

Each commit message must have a *header* and optionally a *body*. The header has a special format that includes a type, a scope and a summary:

```
<type>(<scope>): <summary>
<BLANK LINE>
<body>
```

Note: you can use `npm run commit`, prompting you to fill out the git commit message step-by-step.

#### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

#### Scope
The scope could be anything specifying place of the commit change. The scope is optional.

In case of a feature or fix to a demo it would typically be the name of the module, e.g. `fix(todo-app):`.

#### Summary
The summary contains succinct description of the change. Keep it clear, but short. Put the rest in the body.

#### Body
The body should include the motivation for the change and contrast this with previous behavior.

Note: the commit message format guidelines are based on [Angular's Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).

### Testing

All modules in Voorhoede Ocelot Formatter should have tests included in the `test` directory. Tests are written using `tape`.
You are required to provide adequate test coverage for the code you change.

## Scripts

Development requires [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/).

After installing dependencies (run `npm install`) the following scripts are available:

`npm run ...` | Description
---|---
`build` | Create a Voorhoede page from the `README.md` file, write it to `dist` and minify `src/assets/index.css` file into `src/assets/index.min.css`. 
`build:index` | Create a Voorhoede page from the `README.md` file and write it to `dist`.
`build:css` | Minify `src/assets/index.css` file into `src/assets/index.min.css`.
`prebuild` | Remove and create clean `dist` directory.
`example:fastatic` | Create an example from Fastatic's `README.md`.
`start:fastatic` | Start http server for reviewing Fastatic example.
`commit` | Make a commit using the project configuration for contribution.
`test` | Test all files in the `test` directory.
`coverage` | Run tests, create a coverage report and report it to Coveralls.
`coverage:generate` | Run tests and create a coverage report.
`coverage:report` | Take the coverage report and report it to Coveralls.
