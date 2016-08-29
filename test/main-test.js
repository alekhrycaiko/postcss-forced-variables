import test from 'ava';
import postcss from 'postcss';

var forcedVariables = require('./../main.js');
var testVariables = require('./../variables');
var ruleSet = require('./../ruleset');

test('add rules with no variable file', t => {
  t.throws(function() {
    postcss(forcedVariables({ruleset : ['color']})).process('.re{ color: red; }').css;
  }, 'Please set variables and rule-set');
});
test('add rules with no rule file and expect fail', t => {
  t.throws(function() {
    postcss(forcedVariables({variables : {$white : '#fff'}})).process('.re{ color: $white; } .pe{color:#fff}').css;
  }, 'Please set variables and rule-set');
});
// add test asserting that an array must be used in the test for rules.
test('throw if ruleset constructor is incorrect', t=> {
  t.throws(function () {
    postcss(forcedVariables({variables : {$white : '#fff'}, ruleset : {'notArray': 'shouldBeArray'}}))
    .process('.re{ color: $white; } .pe{color:#fff}').css;
  },'Ruleset must be an array');
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
  return postcss(forcedVariables({ruleset:['color', 'font-size'], variables : {$red : 'red', $large : '16px'} } ))
  .process('.re { color:red; font-size:16px}')
  .then(function (result) {
    t.deepEqual(result.messages.length, 2, 'Expect two warnings');
  });
});
test('run forcedVariables and expect error', t=> {
  t.throws(function () {
    postcss(forcedVariables({ruleset: ['border'], variables: {$medium : '16px'}}))
  .process('.re { border: 10px 20px 16px 5px; }').css;
  }, 'forced-variables: <css input>:1:7: Error! Variable have been set to required for this rule');
});

test('run forcedVariables with multiple value declarations', t=>{
  t.notThrows(function () {
  return postcss(forcedVariables({ruleset: ['border'], variables: {$medium : '10px 20px 16px 5px'}}))
  .process('.re {border: 10px 20px 16px 5px}')
  .then(function (result) {
    t.deepEqual(result.messages.length, 1, 'Expect a warning');
  });
}, 'Expect success and no warning');
});

test('run forcedVariables with list css and different rule', t=>{
  t.notThrows(function () {
  postcss(forcedVariables({ruleset: ['color'], variables: {$medium : '3px'}}))
  .process('.re {border: 10px 20px 16px 5px}')
  .then(function (result) {
    t.deepEqual(result.messages.length, 0, 'Expect no warnings');
  });
}, 'Expect success');
});

test('run forcedVariables with variable used', t=>{
  t.notThrows(function () {
    postcss(forcedVariables({ruleset: ['border'], variables: {$medium : '5px 10px 5px 20px'}}))
  .process('.re {border: $medium}');
}, 'Expect no error thrown');
});

test('run forcedVariables with a multi value variable', t=>{
  return postcss(forcedVariables({ruleset: ['border'], variables: {$medium : '5px 10px 5px 20px'}}))
  .process('.re {border: 5px 10px 5px 20px}')
  .then(function expectWarning(result) {
    t.deepEqual(result.messages.length, 1, 'Expect one warning');
  });
});
test('run forcedVariables with list css and a variable', t=>{
  return postcss(forcedVariables({ruleset: ['border'], variables: {$medium : '5px'}}))
  .process('.re {border: 5px 20px 15px $medium}')
  .then(function (result){
    t.deepEqual(result.messages.length, 0, 'Expect no warning');
  });
});
