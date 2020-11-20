class Rover{
  constructor(position){
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let object = {
      message: message.name,
      results: [message.commands[0], message.commands[1]]
    };
    return object;
  }
};

module.exports = Rover;

// console.log(new Rover(7));