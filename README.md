# Mocha Grommet Reporter

This is a UI for the Mocha test framework written in React/[Grommet](https://grommet.github.io/). It's implemented by overriding the standard reporter. The two current views are the Overhead Dashboard and Developer Dashboard, which include: <br />
1. total pass/fail ratio for all suites/tests
1. time of last completed test
1. alert for timed out/slow tests <br />
1. duration of each test
1. errors/stack trace from from failed tests
1. timeout information
1. visually appealing widgets

This reporter was designed mainly to be displayed as a status board over a respective workspace. The developer view is included to provide and expand on the functionality of any standard mocha reporter.

## Screenshots:

![Overhead Dashboard](http://i.imgur.com/LHU5pFP.png)

![Developer Dashboard](http://i.imgur.com/t7x4NWJ.png)

## To use:

`npm install mocha-grommet-reporter`

Place `<div id='mocha'></div>` where you want the application to run. <br />NOTE: div MUST have `id='mocha'`

```
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <title>Mocha API Checker</title>
     </head>
     <body>
   
       <div id='mocha'></div>
       <script src='/bundle.js'></script>
   
     </body>
   </html>
```

Create index.js in the source directory and place the following code inside:

```
   import mochaGrommetReporter from 'mocha-grommet-reporter';
   import { Mocha } from 'mocha/mocha.js';

   mocha.setup({
     ui: 'bdd',
     slow: 1500,
     timeout: 10000,
     reporter: mochaGrommetReporter
   });

   // place test files here
   require('./index.test.js');

   mocha.run();
```

## To test:

Use the [mocha-grommet-reporter-example](https://github.com/michaelplazek/mocha-grommet-reporter-example.git) to test

## UPDATE:

More features coming soon. Feel free to email me at michael.plazek@hpe.com with suggestions.
