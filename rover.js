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
    return object;
  }
};


module.exports = Rover;

// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 888)];
// let message = new Message('move test', commands);
// let rover = new Rover(98382);
// let response = rover.receiveMessage(message);
// let statusCheck = rover.receiveMessage(message).results;
// let expected = {
//   completed: false
// };
// console.log(response);

let commands = [new Command('MOVE', 123)];
let message = new Message('straight move test', commands);
let rover = new Rover(commands[0].value);
console.log(rover);

//if (message.commands[index].commandType === 'MOVE' && this.mode === 'LOW_POWER') {
      //   object.results.push({
      //     completed:false
      //   })
      //   this.position = 
      // }

      //how do I test this?
      //set a default position?