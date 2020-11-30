const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let passedOrDefaultValue = new Rover(7);
    assert.strictEqual(passedOrDefaultValue.position, 7);
    assert.strictEqual(passedOrDefaultValue.mode, "NORMAL");
    assert.strictEqual(passedOrDefaultValue.generatorWatts, 110);
  });

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover();
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.message, 'Test message with two commands');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MOVE'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover();
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results.length, 2);
  });

  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    let statusCheck = rover.receiveMessage(message).results;
    let expected = {
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: 87382098,
      }
    };
    assert.deepEqual(statusCheck[0], expected);
  });

  it("responds correctly to mode change command", function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('mode', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    let statusCheck = rover.receiveMessage(message).results;
    let expected = {
      completed: true
    };
    assert.deepEqual(statusCheck[0], expected);
    assert.strictEqual(rover.mode, 'LOW_POWER');
  });

})
