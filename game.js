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
function checkForMatches() {
    let foundMatch = false;

    //horizontal matches
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols - 2; j++) {
            if (grid[i][j].icon === grid[i][j + 1].icon && grid[i][j].icon === grid[i][j + 2].icon) {
                foundMatch = true;
                // TODO logic to handle matched icons
            }
        }
    }

    //vertical matches
    for (let j = 0; j < numCols; j++) {
        for (let i = 0; i < numRows - 2; i++) {
            if (grid[i][j].icon === grid[i + 1][j].icon && grid[i][j].icon === grid[i + 2][j].icon) {
                foundMatch = true;
                // TODO Implement logic to handle matched icons
            }
        }
    }

    return foundMatch;
}
function removeMatchesAndRefill() {
}
let score = 0;

function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
}

function handleMatch() {
    // TODO logic to calculate points
    const points = 1; // Example: 1 points for each match
    updateScore(points);
}