var postcss = require('postcss');

function findVariableMatchingCSSValue(variables, node) {
  var result, variableValues, result;
  variableValues = [];
  for (var key in variables){
      variableValues.push(variables[key]);
  };
  result = variableValues.find(function findMatchingVariableValue(element, index) {
    return element === node.value;
  });
  return result;
}
function generateWarningMessage (variableName, node, result) {
  var out;
  result.warn("Warning! The value: " + variableName + ' has a variable that could be used here.', {node: node});
}
function throwPostCSSError (decl) {
  throw decl.error('Error! Variable have been set to required for this rule');
}
function searchForEquivalentCSSValueInVariables(node, variables, result){
  var matchedVariable = findVariableMatchingCSSValue(variables, node);
  if (matchedVariable !== undefined){
    generateWarningMessage(matchedVariable, node, result);
  }
  else{
    throwPostCSSError(node);
  }
}
function cssValueIsVariable(val){
  var variableExists = new RegExp(/(\$\w*)/);
  return variableExists.test(val);
}
function generateRulesetRegex(rules){
  var out, pipedRules;
  if (rules.constructor !== Array) throw new Error('Ruleset must be an array');
  pipedRules = rules.join('|');
  out = new RegExp(pipedRules);
  return out;
}
module.exports = postcss.plugin('forced-variables',
 function forcedVariables(options){
   var variables, ruleset, dollarCheck;
   variables = {};
   ruleset = [];
   options = options || undefined;
   if (options === undefined || options.variables === undefined || options.ruleset === undefined)
   {
     throw new Error('Please set variables and rule-set');
   }
  variables = options.variables;
  ruleset = options.ruleset;
   return function (css, result){
     const root = postcss.parse(css);
     const input = root.source.input;
     var rulesetRegex = generateRulesetRegex(ruleset);
     root.walkDecls(rulesetRegex, node => {
        if (!cssValueIsVariable(node.value)){
          searchForEquivalentCSSValueInVariables(node, variables, result);
        }
     });
    }
});
