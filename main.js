var postcss = require('postcss');

function findCssValueMatchingVariable(variables, cssValue) {
  var variableValues, result;
  variableValues = [];
  for (var key in variables){
    variableValues.push(variables[key]);
  }
  result = variableValues.find(function findMatchingVariableValue(element, index) {
    return element === cssValue;
  });
  if (result !== undefined) {
    return true;
  }
  else{
    return false;
  }
}

function searchForEquivalentCSSValueInVariables(cssValue, decl, variables, result, cssValueIsVariable) {
  var cssMatchesVariableValue;
  cssMatchesVariableValue = findCssValueMatchingVariable(variables, cssValue);
  if (cssMatchesVariableValue){
    result.warn('Warning, a variable exists for ' + cssValue + ' at ' +
    'start line number: ' + decl.source.start.line +
    ', with key: ' + decl.prop + ' and value: ' + decl.value,
    {node : decl});
  }
  else if (!cssValueIsVariable){ // can i refactor this to be if / else?
    throwPostCSSError(decl);
  }
  else{
    return;
  }
}

function throwPostCSSError (decl) {
  throw decl.error('Error! Variable have been set to required for this rule');
}

module.exports = postcss.plugin('forced-variables',
 function forcedVariables(options){
   var variables, ruleset, dollarCheck;
   variables = {};
   ruleset = [];
   options = options || undefined;
   if (options === undefined) { throw new Error('Please set variables and rule-set');}
   if (options !== undefined) {
     variables = options.variables;
     ruleset = options.ruleset;
     dollarCheck = new RegExp(/(\$)(.*?)/);
   }
   return function (css, result){
     const root = postcss.parse(css);

     root.walkDecls(decl => {
        var cssKey, cssValue, rulesMatch, variableValMatch, keyIsVariable, valueIsVariable, findCSSInVariables;
        cssKey = decl.prop;
        cssValue = decl.value;
        rulesMatch = ruleset.find(function findMatchingCSS(rulesetElement, rulesetIndex) {
            return rulesetElement === cssKey;
        });
        if (rulesMatch !== undefined) {
          keyIsVariable = dollarCheck.test(cssKey);
          valueIsVariable = dollarCheck.test(cssValue);
          if (!keyIsVariable){
            searchForEquivalentCSSValueInVariables(cssValue, decl, variables, result,valueIsVariable);
          }
        }
      });
    }
});
