const numRows = 10;
const numCols = 8;
const grid = [];
let vertical_match = false;
let horizontal_match = false;

function createGrid() {
    for (let i = 0; i < numRows; i++) {
        grid[i] = [];
        for (let j = 0; j < numCols; j++) {
            grid[i][j] = {
                icon: getRandomIcon(),
                row: i,
                col: j
            };
        }
    }
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
            removeMatchesAndRefill();

        } else {
            const tempRow = selectedIcon.row;
            const tempCol = selectedIcon.col;
            grid[selectedIcon.row][selectedIcon.col].icon = grid[row][col].icon;
            grid[row][col].icon = tempIcon;
        }
        selectedIcon = null;
    }
}
function getRandomIcon() {
    const icons = ['Icons/Chocolate.png', 'Icons/cupcake.png', 'Icons/gift.png', 'Icons/heart.png', 'Icons/rose.png'];
    return icons[Math.floor(Math.random() * icons.length)];
}

function displayIcon() {
    const iconContainer = document.getElementById('icon-container');
    
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const img = document.createElement('img');
            img.style.height = '85px';
            img.style.width = '85px';
            img.src = grid[i][j].icon;
            iconContainer.appendChild(img);
        }
    }
}
function checkForMatches() {
    let foundMatch = false;
    vertical_match = false;
    horizontal_match = false;
    //horizontal matches
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols - 2; j++) {
            if (grid[i][j].icon === grid[i][j + 1].icon && grid[i][j].icon === grid[i][j + 2].icon) {
                foundMatch = true;
                horizontal_match = true;
            }
        }
    }

    //vertical matches
    for (let j = 0; j < numCols; j++) {
        for (let i = 0; i < numRows - 2; i++) {
            if (grid[i][j].icon === grid[i + 1][j].icon && grid[i][j].icon === grid[i + 2][j].icon) {
                foundMatch = true;
                vertical_match = true;
            }
        }
    }

    return foundMatch;
}
function removeMatchesAndRefill() {
    if (vertical_match === true) {
        for (let j = 0; j < numCols; j++) {
            for (let i = 0; i < numRows - 2; i++) {
                if (grid[i][j].icon === grid[i + 1][j].icon && grid[i][j].icon === grid[i + 2][j].icon) {
                    // Remove the matched icons from the DOM
                    removeIconByCoordinatesAndReplace(i, j);
                    removeIconByCoordinatesAndReplace(i + 1, j);
                    removeIconByCoordinatesAndReplace(i + 2, j);
                    updateScore(1);
                }
            }
        }
    }else if (horizontal_match === true){
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols - 2; j++) {
                if (grid[i][j].icon === grid[i][j + 1].icon && grid[i][j].icon === grid[i][j + 2].icon) {
                    removeIconByCoordinatesAndReplace(i, j);
                    removeIconByCoordinatesAndReplace(i , j+1);
                    removeIconByCoordinatesAndReplace(i , j+2);
                    updateScore(1);
                }
            }
        }
    }






}




function removeIconByCoordinatesAndReplace(row, col) {
    const removedIcon = grid[row][col].icon;
    grid[row][col].icon = null;
    const iconContainer = document.getElementById('icon-container');
    const iconToRemove = iconContainer.children[row * numCols + col];
    iconToRemove.parentNode.removeChild(iconToRemove);

    const newIcon = getRandomIcon();
    grid[row][col].icon = newIcon;

    const img = document.createElement('img');
    img.style.height = '85px';
    img.style.width = '85px';
    img.src = newIcon;
    iconContainer.appendChild(img);
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
createGrid();

displayIcon();