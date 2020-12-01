const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let passedOrDefaultValue = new Rover(98382);
    assert.strictEqual(passedOrDefaultValue.position, 98382);
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
    let commands = [new Command('MODE_CHANGE'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover();
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results.length, 2);
    // for bonus test/spec >> assert.strictEqual(response.results.length >= 2, true);
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

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 123)];
    let message = new Message('low power move test', commands);
    let rover = new Rover(123);
    let response = rover.receiveMessage(message);
    let statusCheck = rover.receiveMessage(message).results;
    let expectedZero = {
      completed: true
    };
    let expectedOne = {
      completed: false
    };
    assert.deepEqual(statusCheck[0], expectedZero);   
    assert.deepEqual(statusCheck[1], expectedOne);
  });

  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 123)];
    let message = new Message('straight move test', commands);
    let rover = new Rover(commands.value);
    let response = rover.receiveMessage(message);
    let statusCheck = rover.receiveMessage(message).results;
    let expected = {
      completed: true
    };
    assert.strictEqual(rover.position, 123);
  })

  // bonus spec/test below
  // it("completed false and a message for an unknown command", function() {
  //   let commands = [new Command('WHAT_UP_ROVER')];
  //   let message = new Message('invalid command test', commands);
  //   let rover = new Rover(98382);
  //   let response = rover.receiveMessage(message);
  //   let statusCheck = rover.receiveMessage(message).results;
  //   let expected = {
  //     completed: false
  //   };
  //   assert.deepEqual(statusCheck[0], expected); 
  // })

})
