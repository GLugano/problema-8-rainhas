module.exports = function algoritmoGenetico() {
  var fitness = () => { };
  this.data = [];
  this.startData = [];
  
  this.setFitness = (fitnessFunc) => {
    fitness = fitnessFunc.bind(this);
  };

  this.start = () => {
    calcFitness();
  };

  let calcFitness = () => {
    fitness(this.data);
  };
}