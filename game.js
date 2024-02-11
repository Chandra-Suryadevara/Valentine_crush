const numRows = 8;
const numCols = 8;
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
