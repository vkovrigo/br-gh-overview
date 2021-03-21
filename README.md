# BrGhOverview

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


TODO:

- [x] Part 1: Commit overview
  Retrieve all commits of the last month in the git project that you love on Github.
  The API call to do this is: GET https://api.github.com/repos/[git repo]/commits
  Show the commits in a list, newest on top. The list items should at least show the first line of
  each commit message and its timestamp. A commit should be rendered in a separate
  component.

- [x] Part 2: Commit detail page
  The user should be able to see the details of a specific commit in a clear manner on a separate
  page. The details should include the commit messages (which can span multiple lines). Any
  extra information that you would like to present can also be shown there.
- [x] Part 3: Date range of the commit overview
  The user should be able to change the date range of the commit overview. For example, the
  entire last year, or just commits since 2 days ago.
- [ ] Part 4: Testing
  Of course you wrote unit tests for the app you just created. If you did not do so, do it now!
- [ ] Add more styles;
- [ ] Handle network errors;
- [x] CI;
- [x] CD;
- [ ] Show loader;
- [ ] Add page to configure repos/user/token
