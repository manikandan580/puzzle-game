const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
let emptyCellIndex = 8;

const winningState = ['1', '2', '3', '4', '5', '6', '7', '8', ''];

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (isAdjacent(index, emptyCellIndex)) {
        swapCells(index, emptyCellIndex);
        emptyCellIndex = index;

        if (checkWinner()) {
            cells.forEach(cell => cell.classList.add('winner'));
            setTimeout(() => alert('You win!'), 100);
        }
    }
}

function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;

    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

function swapCells(index1, index2) {
    const temp = cells[index1].textContent;
    cells[index1].textContent = cells[index2].textContent;
    cells[index2].textContent = temp;
}

function checkWinner() {
    return Array.from(cells).map(cell => cell.textContent).every((content, index) => content === winningState[index]);
}

function restartGame() {
    cells.forEach(cell => cell.classList.remove('winner'));
    const shuffledState = [...winningState].sort(() => Math.random() - 0.5);
    shuffledState.forEach((content, index) => cells[index].textContent = content);
    emptyCellIndex = shuffledState.indexOf('');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
restartGame();



