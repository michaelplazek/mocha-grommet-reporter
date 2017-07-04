# Mocha Grommet Reporter

This is a UI for the mocha reporter written in React/[Grommet](https://grommet.github.io/). The two current views are the Dashboard View, which includes: <br />
1. total pass/ratio for all suites/tests
1. time of last completed test
1. alert for timed out tests <br />
and the Developer View, which includes: <br />
1. duration of each test
1. errors from from failed tests
1. timeout information

## To use:

`npm install mocha-grommet-reporter`

Place `<div id='mocha'></div>` where you want the application to run. NOTE: div MUST have `id='mocha'`

Create index.js in the source directory and place the following code inside:

```
   import mochaUi from 'mocha-grommet-reporter';
   import { Mocha } from 'mocha/mocha.js';
   
   mocha.setup({
     ui: 'bdd',
     slow: 1500,
     timeout: 10000,
     reporter: mochaUi
   });
   
   require('./index.test.js');
   
   mocha.run();
```
 
## To test:

Use the [mocha-grommet-reporter-example](https://github.com/michaelplazek/mocha-grommet-reporter-example.git) to test 

## UPDATE:

More features coming soon. Feel free to email me at michael.plazek@hpe.com with suggestions.
   
   
