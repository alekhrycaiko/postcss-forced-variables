var postcss = require('postcss');
module.exports = postcss.plugin('forced-variables',
 function forcedVariables(options){
   var variables, ruleset;
   variables = {};
   ruleset = [];
  options = options || {};
   if (options === undefined) { throw new Error('Please define options for Forced-variables plugin. variables and ruleset must be defined');}
   if (options !== undefined) {
     variables = options.variables;
     ruleset = options.ruleset;
   }
  function searchForEquivalentCSSValueInVariables(cssValue, decl, variableValues) {
    var variableValMatch;
    variableValMatch = variableValues.find(function findMatchingVariableValue(element, index) {
      return element === cssValue;
    });
    if (variableValMatch){
      console.warn('Warning! There is a variable that exists for: ' + cssValue,
      {start : 'line number: ' + decl.source.start.line, key : decl.prop, value : decl.value})
      // we can later setup a configuration for 'findKey' to tell them what variable it is.
    }
    else {
      return false;
    }
  }
   return function (css){
     var variableValues;
     variableValues = [];
     for (var key in variables){ variableValues.push(variables[key]);}
     const root = postcss.parse(css);
     root.walkDecls(decl => {
          var cssKey, cssValue, rulesMatch, variableValMatch;
          cssKey = decl.prop;
          cssValue = decl.value;
          rulesMatch = ruleset.find(function findMatchingCSS(rulesetElement, rulesetIndex) {
             return rulesetElement === cssKey;
          });
        if (rulesMatch) {
          var dollarCheck = new RegExp(/(\$)(.*?)/);
          var keyIsVariable = dollarCheck.test(cssKey);
          var valueIsVariable = dollarCheck.test(cssValue);
          var result;
          if (!keyIsVariable){
            result = searchForEquivalentCSSValueInVariables(cssValue, decl, variableValues);
            if (result === false && !valueIsVariable) {
              console.error('Error! Variables have been set to required for this rule.',
              {start : 'line number: ' + decl.source.start.line, key : decl.prop, value : decl.value})
            }
          }
          }
      });
    }
});
