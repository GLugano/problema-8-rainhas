module.exports = function algoritmoGenetico() {
  var fitness = () => { };

  // Public
  this.data = [];
  this.epoch = 0;
  this.maxEpoch = 1;
  this.startData = [];
  this.stopOnMax = false;
  this.bestFitness = Array(5).fill(1).map(() => ({ value: null, fitness: 0 }));
  this.mutatePercent = 3;
  this.slicePosition = 3;
  this.populationThreshold = 100;

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

    console.log(this.epoch);
    while (this.epoch <= this.maxEpoch || this.maxEpoch === null) {
      console.log("Época " + this.epoch);
      doCrossover();
      mutate();

      let found = doFitness();
      console.log(this.bestFitness);
      if (found.length > 0) {
        return found;
      }

      console.log("Tamanho da população " + this.data.length);
      if (this.data.length > this.populationThreshold) {
        console.log("Diminuindo pupulação");
        reducePopulation();
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

  let mutate = () => {
    let mutateNum = Math.floor(this.data.length * (this.mutatePercent / 100));

    if (mutateNum % 2 > 0) {
      mutateNum--;
    }

    let indexes = generateNRandoms(mutateNum, this.data.length);

    for (let i = 0; i < indexes.length; i++) {
      let [pos1, pos2] = generate2Randoms();
      [this.data[i].value[pos1], this.data[i].value[pos2]] = [this.data[i].value[pos2], this.data[i].value[pos1]];
    }
  }

  let generate2Randoms = () => {
    let random = Math.floor(Math.random() * (8)), pos1 = random, pos2 = random;

    while (pos1 === pos2) {
      pos2 = Math.floor(Math.random() * (8));
    }

    return [pos1, pos2];
  }

  let generateNRandoms = (num, max) => {
    let arr = Array(num).fill(null);

    for (let i = 0; i < num; i++) {
      let num = Math.floor(Math.random() * (max - 1));
      while (arr.findIndex((val) => val === num) !== -1) {
        num = Math.floor(Math.random() * (max - 1));
      }

      arr[i] = num;
    }

    return arr;
  }

  let reducePopulation = () => {
    let popNum = Math.floor(this.data.length * (80 / 100));

    if (popNum % 2 > 0) {
      popNum--;
    }

    for (let index = 0; index < popNum; index++) {
      this.data.splice(Math.floor(Math.random() * (this.data.length - 1)), 1);
    }
  }
}