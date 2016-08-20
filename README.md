<h1> PostCSS Forced Variables </h1>

<h3> Pre-reqs </h3>
- Module assumes that you already incorporate a variables plugin into your PostCSS solution for pre-processing CSS.

<h3> Features </h3>
- At compile time, the plugin will provide warnings when a variable could've been used in your CSS solution.
- Errors will be generated when specified rules do not have variables used.

Setup:

npm install postcss-forced-variables

Ensure you have postcss-simple-vars or something similar installed. I don't include this as a dependency in node-modules since there are a number of options.

Either:
- Provide an array of rules (e.g. ['color', 'font-size'] ) and an object of variables (e.g.{$blue : '#fff',
$fontSizeLarge : 16})
- Provide both of these things through exporting a module and returning the result and calling forcedVariables in postCSS like so:
var ruleSet = require('./myfile');
var testVariables = require('./variablefile.');
forcedvariables({ruleset : ruleSet(), variables : testVariables()})

Setup is complete.
