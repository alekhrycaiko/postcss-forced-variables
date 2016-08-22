import test from 'ava';
import postcss from 'postcss';
import sinon from 'sinon';

var suggestVariables = require('./../main.js');
var testVariables = require('./../variables');
var ruleSet = require('./../ruleset');

test('add rules with no variable file and expect pass', t => {
  t.pass(function() {
    postcss(suggestVariables({ruleset : ['color']})).process('.re{ color: red; }').css;
  });
});
test('add rules with no variable file and expect pass', t => {
  t.pass(function() {
    postcss(suggestVariables({variables : {$white : '#fff'}})).process('.re{ color: $white; } .pe{color:#fff}').css;
  });
});
test('run suggestVariables with no options', t => {
  t.throws(function() {
    postcss(suggestVariables(undefined)).process('.re{ color: red; }').css;
  }, 'Please set variables and rule-set');
});
test('run suggestVariables and expect error', t=> {
  t.throws(function () {
    postcss(suggestVariables({ruleset:['color'], variables : {$red : 'red'} } ))
    .process('.re { color: blue;}').css;
  }, 'suggest-variables: <css input>:1:7: Error! Variable have been set to required for this rule');
});
test('run suggestVariables and expect warning', t=> {
  postcss(suggestVariables({ruleset:['color', 'font-size'], variables : {$red : 'red', $large : '16px'} } ))
  .process('.re { color:red; font-size:16px}')
  .then(function (result) {
    t.deepEqual(result.messages.length, 2, 'Expect two warnings');
  })
});
