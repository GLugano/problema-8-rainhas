const fs = require('fs');
const AlgoritmoGenetico = require('./algoritmo-genetico');

let cromossomos = [];
let algoritmo = new AlgoritmoGenetico();

function generate() {
  console.log("Gerando");
  cromossomos = Array(10).fill(1).map(() => [1, 2, 3, 4, 5, 6, 7, 8]);

  for (let i = 0; i < cromossomos.length; i++) {
    cromossomos[i] = { value: shuffle(cromossomos[i]), fitness: 0 };
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function start() {
  console.log("Iniciando");
  algoritmo.maxEpoch = null;
  algoritmo.stopOnMax = true;
  algoritmo.startData = cromossomos;
  algoritmo.slicePosition = 3;
  algoritmo.populationThreshold = 300;

  algoritmo.setFitness(fitness);
  algoritmo.start();
}

function fitness(matrix) {
  let count = 0;
  let maxFitness = 100;

  for (let k = 0; k < matrix.length; k++) {
    let cromossomo = matrix[k];
    count = 0;

    for (let i = 0; i < cromossomo.value.length; i++) {
      for (let j = 0; j < cromossomo.value.length; j++) {
        if (i != j && check(i, j, cromossomo.value[i], cromossomo.value[j])) {
          count++;
        }
      }
    }

    cromossomo.fitness = maxFitness - (count * 2);
  }
}

function check(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) == Math.abs(y1 - y2);
}

process.stdout.write("\u001b[2J\u001b[0;0H"); // Limpa console
// generate();
// start();

const spawn = require("child_process").spawn;
const pythonProcess = spawn('C:/Users/desenvolvimento04/ppData/Local/Continuum/anaconda3/python.exe', ["./generateGraph.py"]);
pythonProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});