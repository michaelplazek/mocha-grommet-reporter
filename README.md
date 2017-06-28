# Mocha Grommet Reporter

This is a UI for the mocha reporter written in React/[Grommet](https://grommet.github.io/). This is designed to be a view for developers and will eventually include more extensive drill downs into test data.

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

There is an overhead Dashboard view being developed for displaying a visualization of suite data at a higher level. Stay tuned for new updates. 
