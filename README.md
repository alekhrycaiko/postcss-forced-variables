[![Build Status](https://travis-ci.org/alekhrycaiko/postcss-forced-variables.svg?branch=master)](https://travis-ci.org/alekhrycaiko/postcss-forced-variables)

<h1> PostCSS Forced Variables </h1>

<h2> Description </h2>

The plugins purpose is to help enforce more consistent SASS-like variable usage in stylesheets.

<h3> Pre-Reqs for Plugin usage. </h3>
SASS like variables need to be incorporated for this plugin to function properly.

<h3> Features </h3>
Provides warnings when a variable from your variables file could've been used.
Throws errors when specified rules do not have variables used.

E.g 1) The following will generate a warning stating that a variable could be used here.

ruleset : ['color'], variables : {$white : #fff'} used to process the css:
body {
  color: #fff;
}

E.g. 2) The following will throw an error stating that a variable should be used here.
ruleset : ['color'], variables : {$white : #fff'} used to process the css:
body{
  color : red;
}

Setup:
- Install: npm install postcss-forced-variables
- In your processors, called forcedVariables() with the following object:
ruleset : {
  // array of rules
}
variables : {
  // object of variables.
}

Setup is complete. Further details can be seen in gulp test examples.


Feel free to e-mail me at alekhrycaiko@gmail.com with any suggestions or questions.
