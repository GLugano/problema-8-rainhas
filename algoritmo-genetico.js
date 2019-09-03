module.exports = function algoritmoGenetico() {
  var fitness = () => { };

  // Public
  this.data = [];
  this.epoch = 0;
  this.maxEpoch = 1;
  this.startData = [];
  this.stopOnMax = false;
  this.slicePosition = 3;
  this.bestFitness = Array(5).fill(1).map(() => ({ value: null, fitness: 0 }));

  this.setFitness = (fitnessFunc) => {
    fitness = fitnessFunc.bind(this);
  };

  this.start = () => {
    this.data = this.startData;
    this.epoch = 1;

    let found = doFitness();
    if (found.length > 0) {
      return found;
    }

    while (this.epoch <= this.maxEpoch) {
      console.log("Época " + this.epoch);
      doCrossover();

      let found = doFitness();
      console.log(this.bestFitness);
      if (found.length > 0) {
        return found;
      }

      this.epoch++;
    }
  };

  // Private
  let doFitness = () => {
    fitness(this.data);
    identifyBest5Fitness();

    return this.data.filter((cromossomo) => cromossomo.fitness === 100) || [];
  };

  let identifyBest5Fitness = () => {
    for (let i = 0; i < this.data.length; i++) {
      const cromossomo = this.data[i];

      for (let j = 0; j < this.bestFitness.length; j++) {
        const fitness = this.bestFitness[j];

        if (cromossomo.fitness >= fitness.fitness) {
          addToBest(cromossomo, j);
          break;
        }
      }
    }
  }

  let addToBest = (obj, position) => {
    this.bestFitness.splice(position, 0, JSON.parse(JSON.stringify(obj)));
    this.bestFitness = this.bestFitness.splice(0, 5);
  }

  let doCrossover = () => {
    shuffle(this.data);
    let maxNewChromosomes = Math.floor(this.data.length * 0.8);

    if ((maxNewChromosomes % 2) > 0) {
      maxNewChromosomes--;
    }

    let newChromosomes = [];

    for (let i = 0; i < maxNewChromosomes; i += 2) {
      newChromosomes = [...newChromosomes, ...crossover(this.data[i], this.data[i + 1])];
    }

    this.data = [...this.data, ...newChromosomes];
  }

  let crossover = (cromossomo1, cromossomo2) => {
    let piece1 = cromossomo1.value.slice(0, this.slicePosition);
    let piece2 = cromossomo2.value.slice(0, this.slicePosition);

    return [
      { value: fillChromosome(piece1, cromossomo2), fitness: null },
      { value: fillChromosome(piece2, cromossomo1), fitness: null }
    ];
  }

  let fillChromosome = (piece = [], cromossomo) => {
    return [...piece, ...cromossomo.value.filter((value) => piece.indexOf(value) === -1)];
  }

  let shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}