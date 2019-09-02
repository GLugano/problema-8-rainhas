const fs = require('fs');
const AlgoritmoGenetico = require('./algoritmo-genetico');

let cromossomos = [];
let algoritmo = new AlgoritmoGenetico();

function generate() {
  cromossomos = Array(100).fill([1, 2, 3, 4, 5, 6, 7, 8])

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
  algoritmo.startData = cromossomos;
  algoritmo.setFitness(fitness);
  algoritmo.start();
}

function fitness(matrix) {
  let count = 0;
  let maxFitness = 100;

  for (let k = 0; k < matrix.length; k++) {
    let cromossomo = matrix[k];

    for (let i = 0; i < cromossomo.value.length; i++) {
      for (let j = 0; j < cromossomo.value.length; j++) {
        if (i != j && check(i, j, cromossomo.value[i], cromossomo.value[j])) {
          count++;
        }
      }
    }
  }

  matrix[k].fitness = maxFitness - (count * 2);
}

function check(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) == Math.abs(y1 - y2);
}

generate();
start();
