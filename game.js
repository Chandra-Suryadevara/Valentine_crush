const numRows = 10;
const numCols = 8;
const grid = [];
let vertical_match = false;
let horizontal_match = false;
let selectedIcon = null;
let Selected_row;
let Selected_col;
let image;
let target_Col;
let target_Row;
let target_image;


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


function select_icon() {
    let tempbool = false;
    if(Selected_row === target_Row && Selected_col === target_Col +1) //right
    {
        const tempIcon = grid[Selected_row][Selected_col].icon;
        grid[Selected_row][Selected_col].icon = grid[target_Row][target_Col].icon;
        grid[target_Row][target_Col].icon = tempIcon;
        tempbool = true;
        console.log("right");
    } 
    else if(Selected_row === target_Row && Selected_col === target_Col -1) //left
    {
        const tempIcon = grid[Selected_row][Selected_col].icon;
        grid[Selected_row][Selected_col].icon = grid[target_Row][target_Col].icon;
        grid[target_Row][target_Col].icon = tempIcon;
        tempbool = true;
        console.log("left");
    } 
    else if(Selected_row === target_Row +1  && Selected_col === target_Col ) //up
    {
        const tempIcon = grid[Selected_row][Selected_col].icon;
        grid[Selected_row][Selected_col].icon = grid[target_Row][target_Col].icon;
        grid[target_Row][target_Col].icon = tempIcon;
        tempbool = true;
        console.log("up");
    } 
    else if(Selected_row === target_Row -1 && Selected_col === target_Col +1) //down
    {
        const tempIcon = grid[Selected_row][Selected_col].icon;
        grid[Selected_row][Selected_col].icon = grid[target_Row][target_Col].icon;
        grid[target_Row][target_Col].icon = tempIcon;
        tempbool = true;
        console.log("down");
    }
    else{
        const tempIcon1 = grid[target_Row][target_Col].icon;
        grid[target_Row][target_Col].icon = grid[Selected_row][Selected_col].icon;
        grid[Selected_row][Selected_col].icon = tempIcon1;
        displayIcon();
    }

    if (tempbool === true) {
        if (checkForMatches()) {
            removeMatchesAndRefill();

        } else {
            const tempIcon1 = grid[target_Row][target_Col].icon;
            grid[target_Row][target_Col].icon = grid[Selected_row][Selected_col].icon;
            grid[Selected_row][Selected_col].icon = tempIcon1;
            displayIcon();
        }
    }
}
function getRandomIcon() {
    const icons = ['Icons/Chocolate.png', 'Icons/cupcake.png', 'Icons/gift.png', 'Icons/heart.png', 'Icons/rose.png', 'Icons/teddy-bear.png'];
    return icons[Math.floor(Math.random() * icons.length)];
}


function checkForMatches() {
    let foundMatch = false;
    console.log("inside Checkformatches");
    vertical_match = false;
    horizontal_match = false;
    //horizontal matches
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols - 2; j++) {
            if ((grid[i][j].icon === grid[i][j + 1].icon && grid[i][j].icon === grid[i][j + 2].icon) ||
                ((j - 1 >= 0 && j + 1 < grid[i].length) && (grid[i][j].icon === grid[i][j - 1].icon && grid[i][j].icon === grid[i][j + 1].icon)) ||
                ((j - 1 >= 0 && j - 2 >= 0) && (grid[i][j].icon === grid[i][j - 1].icon && grid[i][j].icon === grid[i][j - 2].icon))) {

                foundMatch = true;
                horizontal_match = true;
                console.log("horizontal happened")
            }
        }
    }

    //vertical matches
    for (let j = 0; j < numCols; j++) {
        for (let i = 0; i < numRows - 2; i++) {
            if ((grid[i][j].icon === grid[i + 1][j].icon && grid[i][j].icon === grid[i + 2][j].icon) ||
                ((i - 1 >= 0 && i + 1 < grid.length) && (grid[i][j].icon === grid[i - 1][j].icon && grid[i][j].icon === grid[i + 1][j].icon)) ||
                ((i - 1 >= 0 && i - 2 >= 0) && (grid[i][j].icon === grid[i - 1][j].icon && grid[i][j].icon === grid[i - 2][j].icon))) {

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
                if ((grid[i][j].icon === grid[i + 1][j].icon && grid[i][j].icon === grid[i + 2][j].icon)){
                    // Remove the matched icons from the DOM
                    removeIconByCoordinatesAndReplace(i, j);
                    removeIconByCoordinatesAndReplace(i + 1, j);
                    removeIconByCoordinatesAndReplace(i + 2, j);
                    updateScore(1);

                }else if((i - 1 >= 0 && i + 1 < grid.length) && (grid[i][j].icon === grid[i - 1][j].icon && grid[i][j].icon === grid[i + 1][j].icon)){
                    removeIconByCoordinatesAndReplace(i, j);
                    removeIconByCoordinatesAndReplace(i - 1, j);
                    removeIconByCoordinatesAndReplace(i + 1, j);
                    updateScore(1);

                }else if((i - 1 >= 0 && i - 2 >= 0) && (grid[i][j].icon === grid[i - 1][j].icon && grid[i][j].icon === grid[i - 2][j].icon))
                {
                    removeIconByCoordinatesAndReplace(i, j);
                    removeIconByCoordinatesAndReplace(i - 1, j);
                    removeIconByCoordinatesAndReplace(i + 2, j);
                    updateScore(1);
                }

                }
            }
    }else if (horizontal_match === true){
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols - 2; j++) {
                if ((grid[i][j].icon === grid[i][j + 1].icon && grid[i][j].icon === grid[i][j + 2].icon)) {
                    removeIconByCoordinatesAndReplace(i, j);
                    removeIconByCoordinatesAndReplace(i , j+1);
                    removeIconByCoordinatesAndReplace(i , j+2);
                    updateScore(1);
                } else if((j - 1 >= 0 && j + 1 < grid[i].length) && (grid[i][j].icon === grid[i][j - 1].icon && grid[i][j].icon === grid[i][j + 1].icon)){
                    removeIconByCoordinatesAndReplace(i, j);
                    removeIconByCoordinatesAndReplace(i , j-1);
                    removeIconByCoordinatesAndReplace(i , j+1);
                    updateScore(1);
                } else if((j - 1 >= 0 && j - 2 >= 0) && (grid[i][j].icon === grid[i][j - 1].icon && grid[i][j].icon === grid[i][j - 2].icon)) {
                    removeIconByCoordinatesAndReplace(i, j);
                    removeIconByCoordinatesAndReplace(i , j-1);
                    removeIconByCoordinatesAndReplace(i , j-2);
                    updateScore(1);
                }
            }
        }
    }
}


function displayIcon() {
    const iconContainer = document.getElementById('icon-container');
    iconContainer.innerHTML = '';
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const img = document.createElement('img');
            img.style.height = '85px';
            img.style.width = '85px';
            img.src = grid[i][j].icon;
            img.row = grid[i][j].row
            img.col = grid[i][j].col
            img.draggable = true; // Make the icon draggable
            img.addEventListener('dragstart', dragStart);
            img.addEventListener('dragover', dragOver);
            img.addEventListener("dragenter", dragEnter);
            img.addEventListener("dragleave", dragLeave);
            img.addEventListener('drop', dragDrop);
            img.addEventListener("dragend", dragEnd);
            iconContainer.appendChild(img);
        }
    }
}


function dragStart() {
    image = this;
    Selected_row = this.row; // Get row value
    Selected_col = this.col; // Get column value
}

function dragDrop(e) {
    e.preventDefault();
    target_image = this;
    target_Row = this.row; // Get target row value
    target_Col = this.col; // Get target column value
    select_icon();
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragEnd() {

}



function removeIconByCoordinatesAndReplace(row, col) {
    console.log(grid[row][col].icon)
    grid[row][col] = {
        icon: getRandomIcon(),
        row: row,
        col: col
    };
    displayIcon();
    console.log(grid[row][col].icon)
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
