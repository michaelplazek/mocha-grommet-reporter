# Mocha Grommet Reporter

This is a UI for the mocha reporter written in React/[Grommet](https://grommet.github.io/)

# To use:

`npm install mocha-grommet-reporter`

Place `<div id='mocha'></div>` where you want the application to run. NOTE: div MUST have `id='mocha'`

Create index.js and place the following code inside:

```import mochaUi from 'mocha-grommet-reporter';
   
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
   
   
   
