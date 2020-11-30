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
      if (message.commands[index].commandType === 'MOVE') {
        object.results.push({
          completed:true
        })
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
      if (message.commands[index].commandType === 'MODE_CHANGE' && message.commands[index].value === 'LOW_POWER') {
        object.results.push({
          completed: true
        })
        this.mode = 'LOW_POWER';
      } else if (message.commands[index].commandType === 'MODE_CHANGE') {
        object.results.push({
          completed: true
        })
      }
    }
    return object;
  }
};


module.exports = Rover;

