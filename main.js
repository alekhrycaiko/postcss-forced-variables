var postcss = require('postcss');

function searchForEquivalentCSSValueInVariables(cssValue, decl, variableValues, result) {
  var variableValMatch;
  variableValMatch = variableValues.find(function findMatchingVariableValue(element, index) {
    return element === cssValue;
  });
  if (variableValMatch !== undefined){
    result.warn('Warning, a variable exists for ' + cssValue + ' at ' +
    'start line number: ' + decl.source.start.line +
    ', with key: ' + decl.prop + ' and value: ' + decl.value,
    {node : decl});
  }
  else {
    return false;
  }
}

function throwPostCSSError (decl) {
  throw decl.error('Error! Variable have been set to required for this rule');
}

module.exports = postcss.plugin('forced-variables',
 function forcedVariables(options){
   var variables, ruleset;
   variables = {};
   ruleset = [];
  options = options || undefined;
   if (options === undefined) { throw new Error('Please set variables and rule-set');}
   if (options !== undefined) {
     variables = options.variables;
     ruleset = options.ruleset;
   }
   return function (css, result){
      var variableValues, dollarCheck;
     dollarCheck = new RegExp(/(\$)(.*?)/);
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

          var keyIsVariable = dollarCheck.test(cssKey);
          var valueIsVariable = dollarCheck.test(cssValue);
          var out;
          if (!keyIsVariable){
            out = searchForEquivalentCSSValueInVariables(cssValue, decl, variableValues, result);
            if (out === false && !valueIsVariable) {
              throwPostCSSError(decl);
            }
          }
          }
      });
    }
});
