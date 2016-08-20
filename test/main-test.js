import test from 'ava';
import postcss from 'postcss';
import sinon from 'sinon';

var forcedVariables = require('./../main.js');
var testVariables = require('./../variables');
var ruleSet = require('./../ruleset');

function run() {
  // input output
  postcss(forcedVariables({ruleset : ruleSet(), variables : testVariables()}))
        .process('.re-test { color: red;} .brgegeg {color : $purple;} .meep {font-size: 24px;}').css;
};

test.beforeEach(t=> {
  t.context.warn = console.warn;
  t.context.error = console.error;
  console.warn = sinon.spy();
  console.error = sinon.spy();
})
test.afterEach(t=> {
  console.warn = t.context.warn;
  console.error = t.context.error;
});

test('run forcedVariables, expect warning log count', t => {
  run();
    t.true(console.warn.calledOnce);
});
test('run forcedVariables, expect error log count', t=> {
  run();
  t.true(console.error.calledOnce);
});
