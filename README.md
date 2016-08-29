[![Build Status](https://travis-ci.org/alekhrycaiko/postcss-forced-variables.svg?branch=master)](https://travis-ci.org/alekhrycaiko/postcss-forced-variables)

<h1> PostCSS Forced Variables </h1>

<h2> Description </h2>

The plugins purpose is to help enforce more consistent SASS-like variable usage in stylesheets.

<h3> Features </h3>
Provides warnings when a variable from your variables file could've been used.
Throws errors when specified properties do not have variables used.

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
```css
/* Consider the following CSS being processed */
.body { 
  color: #fff;
}
```
```javascript
// The following call will result in a Warning that the value #fff has a variable which can be used in the CSS.
forcedVariables({ruleset : ['color'], variables : { $white : 'fff'});
```
<h2> Example of Error Generation </h2>
```css
.body { 
  color: #fff
}
```
```javascript
// The following call will result in an Error being thrown that states a variable must be used in the CSS.
forcedVariables({ruleset : ['color'], variables : { $white : 'fff'});
```


<h3>
Feel free to e-mail me at alekhrycaiko@gmail.com with any suggestions or questions!
