[![Build Status](https://travis-ci.org/alekhrycaiko/postcss-forced-variables.svg?branch=master)](https://travis-ci.org/alekhrycaiko/postcss-forced-variables)

<h1> PostCSS Forced Variables </h1>

<h2> Description </h2>

<p>The plugins purpose is to help enforce more consistent SASS-like variable usage in stylesheets.</p>

<h3> Features </h3>

<p> Reads an array of CSS properties and provides warnings when these properties could be using pre-existing variables. </p>

<p> Throws errors when CSS properties from the array do not use variables. </p>

<h2> Setup: </h2>
<h3> npm install postcss-forced-variables</h3>
<h3> Follow the format below: </h3>

```javascript
// require in postcss-forced-variables
var forcedVariables = require('postcss-forced-variables');

//  ...

// add the following call to your processors array.
// ruleset must be an Array of CSS properties.
// variables must be an Object of Key:Value pairs consisting of $Variable:Value
forcedVariables({ruleset : ['color', 'font-size'], variables : { $white : 'fff', $fontLarge : '16px'});
```

<h2> Example of Warning Generation </h2>

```javascript

/* Consider the following CSS being processed */
.body { 
  color: #fff;
}

```

```javascript
// The following call will result in a Warning that the value #fff has a variable which can be used in the CSS.
forcedVariables({ruleset : ['color'], variables : { $white : 'fff'});
```

<h3> Example of console warning output:</h3>

```javascript
forced-variables : <css input>: Warning! The value #fff has a variable that could be used here. 
```

<h2> Example of Error Generation </h2>

```javascript
.body { 
  color: #fff
}
```

```javascript
// The following call will result in an Error being thrown that states a variable must be used in the CSS.
forcedVariables({ruleset : ['color'], variables : { $white : 'fff'});
```

<h3> Example of error output: </h3>

```javascript
Error: forced-variables: <css input> Error! Variable have been set to required for this rule
.body { 
  color: #fff
}
```

<h3>
Feel free to e-mail me at alekhrycaiko@gmail.com with any suggestions or questions!
