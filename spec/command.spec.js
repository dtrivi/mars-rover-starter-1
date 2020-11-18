const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

  it("constructor sets command type", function() {
    let argumentOne = new Command('MODE_CHANGE', 'LOW_POWER');
    assert.strictEqual(argumentOne.commandType, 'MODE_CHANGE');
  });

  it("constructor sets a value passed in as the 2nd argument", function() {
    let argumentTwo = new Command('MODE_CHANGE', 'LOW_POWER');
    assert.strictEqual(argumentTwo.value, 'LOW_POWER');
  });

});