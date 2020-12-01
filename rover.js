const Message = require('./message.js');
const Command = require('./command.js');

class Rover{
  constructor(position){
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let object = {
      message: message.name,
      results: []
    }
    for (let index=0; index < message.commands.length; index++) {
      if (message.commands[index].commandType === 'MOVE' && this.mode === 'LOW_POWER') {
        object.results.push({
          completed:false
        })
      } else if (message.commands[index].commandType === 'MOVE') {
        object.results.push({
          completed: true
        })
        this.position = message.commands[index].value;
      } 
      if (message.commands[index].commandType === 'STATUS_CHECK') {
        object.results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        })
      }
      if (message.commands[index].commandType === 'MODE_CHANGE') {
        object.results.push({
          completed: true
        })
        this.mode = message.commands[index].value;
      } 
    }
    //bonus test code below
    // for (let index=0; index < message.commands.length; index++) {
    //   if (message.commands[index].commandType !== 'MOVE' || message.commands[index].commandType !== 'STATUS_CHECK' || message.commands[index].commandType !== 'MODE_CHANGE') {
    //     object.results.push({
    //       completed:false
    //     })
    //     console.log("INVALID: Unknown commandType")
    //   }
    // }
    return object;
  }
};


module.exports = Rover;

bonus test trial
// let commands = [new Command('WHAT_UP_ROVER')];
// let message = new Message('invalid command test', commands);
// let rover = new Rover(98382);
// let response = rover.receiveMessage(message);
// console.log(response);