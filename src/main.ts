import './reset.css'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const board = document.createElement('div');
board.classList.add('board');
app.appendChild(board);

// Create cell
const cell = document.createElement('div');
cell.classList.add('cell');

let pointerDown = false;

document.addEventListener('pointerdown', () => {
  pointerDown = true;
})

document.addEventListener('pointerup', () => {
  pointerDown = false;
})

// Add 100 cells
for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('pointerdown', () => {
    cell.classList.add('pressed');
  });

  cell.addEventListener('pointerenter', () => {
    if (pointerDown) {
      cell.classList.add('pressed');
    }
  })

  cell.addEventListener('pointerup', () => {
    cell.classList.remove('pressed');
  });

  cell.addEventListener('pointerleave', () => {
    cell.classList.remove('pressed');
  })
  board.appendChild(cell);
}
