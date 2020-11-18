const assert = require('assert');
const Message = require('../message.js');

describe("Message class", function() {

  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: "Name required."
      }
    );
  });

  it("constructor sets name", function() {
    let propertyOne = new Message("A_NAME");
    assert.strictEqual(propertyOne.name, "A_NAME");
  });

  it("contains a commands array passed into the constructor as 2nd argument", function() {
    let commands = [
      {
        "MOVE": 7
      },
      {
        "MODE_CHANGE": "NORMAL"
      }
    ]
    let propertyTwo = new Message("A_NAME", commands);
    assert.strictEqual(propertyTwo.commands, commands);
  })

});
