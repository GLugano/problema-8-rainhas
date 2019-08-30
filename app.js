const fs = require('fs');
const AlgoritmoGenetico = require('./algoritmo-genetico');

let cromossomos = [];
let algoritmo = new AlgoritmoGenetico();

function generate() {
  cromossomos = Array(100).fill([1, 2, 3, 4, 5, 6, 7, 8])

  for (let i = 0; i < cromossomos.length; i++) {
    cromossomos[i] = shuffle(cromossomos[i]);
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
}

function fitness(matrix) {
  let i = 1, j = 8, inverter = false, diagonais = matrix.length * 2 - 1;

  for (let diagonal = 1; diagonal < diagonais; diagonal++) {


  }
}

function getDiagonalCountItems(matrix, diagonal) {
  let diagonais = matrix.length * 2 - 1;
  let inverter = (diagonais >= matrix.length);
  let x, y, result = 0;



  return result;
}

function getUntilEnd(matrix, line, direction = "ltr") {
  let end = false;
  let count = 0;


  while (!end) {

  }

  return count;
}

function getLineStart(matrix, line, direction = "utd") {
  let max = matrix.length;
  let min = 1;
  let middle = max;

  if (line < middle) {
    if (direction == "utd") {
      return { x: (max - line), y: 1 };
    } else {
      return { x: (max - line), y: max };
    }
  } else if (line > middle) {
    if (direction == "utd") {
      return { x: 1, y: (line - max) };
    } else {
      return { x: 1, y: (line - max) };
    }
  } else {
    return direction == "utd" ? { x: max, y: min } : { x: max, y: max };
  }
}

generate();
start();
