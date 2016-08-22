import test from 'ava';
import postcss from 'postcss';
import sinon from 'sinon';

var forcedVariables = require('./../main.js');
var testVariables = require('./../variables');
var ruleSet = require('./../ruleset');

test('add rules with no variable file and expect pass', t => {
  t.pass(function() {
    postcss(forcedVariables({ruleset : ['color']})).process('.re{ color: red; }').css;
  });
});
test('add rules with no variable file and expect pass', t => {
  t.pass(function() {
    postcss(forcedVariables({variables : {$white : '#fff'}})).process('.re{ color: $white; } .pe{color:#fff}').css;
  });
});
test('run forcedVariables with no options', t => {
  t.throws(function() {
    postcss(forcedVariables).process('.re{ color: red; }').css;
  }, 'Please set variables and rule-set');
});
test('run forcedVariables and expect error', t=> {
  t.throws(function () {
    postcss(forcedVariables({ruleset:['color'], variables : {$red : 'red'} } ))
    .process('.re { color: blue;}').css;
  }, 'forced-variables: <css input>:1:7: Error! Variable have been set to required for this rule');
});
test('run forcedVariables and expect warning', t=> {
  postcss(forcedVariables({ruleset:['color', 'font-size'], variables : {$red : 'red', $large : '16px'} } ))
  .process('.re { color:red; font-size:16px}')
  .then(function (result) {
    t.deepEqual(result.messages.length, 2, 'Expect two warnings');
  })
});
