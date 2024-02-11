const numRows = 10;
const numCols = 10;
const grid = [];

for (let i = 0; i < numRows; i++) {
    grid[i] = [];
    for (let j = 0; j < numCols; j++) {
        // Each cell in the grid is an object containing properties for the icon and position
        grid[i][j] = {
            icon: getRandomIcon(),
            row: i,
            col: j
        };
    }
}
function getRandomIcon() {
    const icons = [];
    return icons[Math.floor(Math.random() * icons.length)];
}

let selectedIcon = null;

function selectIcon(row, col) {
    if (!selectedIcon) {
        selectedIcon = { row, col };
    } else {
        const tempIcon = grid[row][col].icon;
        grid[row][col].icon = grid[selectedIcon.row][selectedIcon.col].icon;
        grid[selectedIcon.row][selectedIcon.col].icon = tempIcon;

        if (checkForMatches()) {
        } else {
            const tempRow = selectedIcon.row;
            const tempCol = selectedIcon.col;
            grid[selectedIcon.row][selectedIcon.col].icon = grid[row][col].icon;
            grid[row][col].icon = tempIcon;
        }
        selectedIcon = null;
    }
}