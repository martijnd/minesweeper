import './reset.css'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const BOMBS_COUNT = 10;
const ROWS = 10;
const COLS = 10;
const CELL_COUNT = ROWS * COLS;

const bombIndexes = new Set();
while (bombIndexes.size !== BOMBS_COUNT) {
  bombIndexes.add(Math.floor(Math.random() * 100) + 1);
}


const board = document.createElement('div');
board.classList.add('board');
app.appendChild(board);

// Create cell
const cell = document.createElement('div');
cell.classList.add('cell');

// Handle click holding
let pointerDown = false;

document.addEventListener('pointerdown', () => {
  pointerDown = true;
})

document.addEventListener('pointerup', () => {
  pointerDown = false;
})

function createCell() {
  let cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('pointerdown', () => {
    cell.classList.add('pressed');
  });

  cell.addEventListener('click', () => {
    cell.classList.add('opened');
    cell.innerHTML = cell.getAttribute('data-bombs-around') ?? '';
    if (cell.getAttribute('data-has-bomb') === 'true') {
      cell.innerHTML = 'x';
    }
  });

  cell.addEventListener('pointerenter', () => {
    if (pointerDown) {
      cell.classList.add('pressed');
    }
  });

  cell.addEventListener('pointerup', () => {
    cell.classList.remove('pressed');
  });

  cell.addEventListener('pointerleave', () => {
    cell.classList.remove('pressed');
  });

  cell.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    cell = cell.classList.contains('flag') ? removeFlag(cell) : addFlag(cell);
  })

  return cell;
}

function addFlag(cell: HTMLDivElement) {
  cell.classList.add('flag');
  cell.innerHTML = 'f';

  return cell;
}

function removeFlag(cell: HTMLDivElement) {
  cell.classList.remove('flag');
  cell.innerHTML = '';

  return cell;
}

const map: HTMLDivElement[][] = Array(ROWS).fill(null).map(() => Array(COLS));

// Add 100 cells
for (const [rowIndex, rows] of map.entries()) {
  for (const [colIndex] of rows.entries()) {

    const cell = createCell();
    cell.setAttribute('x', colIndex.toString());
    cell.setAttribute('y', rowIndex.toString());

    const pos = parseInt(rowIndex.toString() + colIndex.toString());
    if (bombIndexes.has(pos)) {
      cell.setAttribute('data-has-bomb', 'true');
    }

    map[rowIndex][colIndex] = cell;
    board.appendChild(cell);
  }
}

function setBombsAround(cell: HTMLDivElement, neighbour: HTMLDivElement) {
  if (neighbour.getAttribute('data-has-bomb') === 'true') {
    cell.setAttribute('data-bombs-around', (parseInt(cell.getAttribute('data-bombs-around') ?? 0 + '') + 1).toString());
  }
}

for (const [rowIndex, rows] of map.entries()) {
  for (const [colIndex] of rows.entries()) {
    const cell = map[rowIndex][colIndex];
    // top - left
    if (rowIndex > 0 && colIndex > 0) {
      setBombsAround(cell, map[rowIndex - 1][colIndex - 1]);
    }

    // top
    if (rowIndex > 0) {
      setBombsAround(cell, map[rowIndex - 1][colIndex]);
    }

    // top - right
    if (rowIndex > 0 && colIndex < COLS - 1) {
      setBombsAround(cell, map[rowIndex - 1][colIndex + 1]);
    }

    // right
    if (colIndex < COLS - 1) {
      setBombsAround(cell, map[rowIndex][colIndex + 1]);
    }

    // bottom - right
    if (rowIndex < ROWS - 1 && colIndex < COLS - 1) {
      setBombsAround(cell, map[rowIndex + 1][colIndex + 1]);
    }

    // bottom
    if (rowIndex < ROWS - 1) {
      setBombsAround(cell, map[rowIndex + 1][colIndex]);
    }

    //bottom - left
    if (rowIndex < ROWS - 1 && colIndex > 0) {
      setBombsAround(cell,  map[rowIndex + 1][colIndex - 1]);
    }

    // left
    if (colIndex > 0) {
      setBombsAround(cell, map[rowIndex][colIndex - 1]);
    }
  }
}

console.log(map);

