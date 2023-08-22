const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const gamebtn = document.querySelector(".btn");
let currentplayer;
let grid;
const wining = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];
//  to intial lise the game
function intigame() {
    currentplayer = "X";
    grid = ["", "", "", "", "", "", "", "", "",];
    // To Empty the ui & remove the green colour
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList=`box box${index+1}`;
    });
    gamebtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}
intigame();
function swapturn() {
    if (currentplayer === "X") { currentplayer = "0"; }
    else {
        currentplayer = "X";
    }
    // UI update
    gameinfo.innerText = `currentplayer- ${currentplayer}`;
}
function checkgameover() {
    let ans = "";
    wining.forEach((position) => {
        // it check 3 box are not empty and same in value 
        if ((grid[position[0]] !== "" || grid[position[1]] !== "" || grid[position[2]] !== "")
            && (grid[position[0]] === grid[position[1]]) && (grid[position[1]] === grid[position[2]])) {

            // check if winner is x
            if (grid[position[0]] === "X") {
                ans = "X";
            }
            else
                ans = "0";
            // disable next pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            // we know thw winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });
    // it means we have the winner 
if(ans!==""){
gameinfo.innerText=`winner player -${ans}`;
gamebtn.classList.add("active");
return;
}
// when their no winner 
let fillcount=0;
grid.forEach((box)=>{
    if(box!==""){
        fillcount++;
    }
});
if(fillcount===9){
    gameinfo.innerText="Game Tie";
    gamebtn.classList.add("active");

}
}
function handleclick(index) {
    if (grid[index] === "") {
        boxes[index].innerText = currentplayer;
        grid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        // swap karo turn ko
        swapturn();
        // check aro jiit to nai gaye
        checkgameover();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleclick(index);
    })
});

gamebtn.addEventListener("click", intigame);