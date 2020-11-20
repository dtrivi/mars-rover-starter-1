class Rover{
  constructor(position){
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    return 
  }
}

module.exports = Rover;

// console.log(new Rover(7));