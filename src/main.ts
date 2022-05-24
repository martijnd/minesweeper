import './reset.css'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

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

// Add 100 cells
for (let i = 0; i < 100; i++) {
  const cell = createCell();
  board.appendChild(cell);
}


