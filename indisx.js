const boxes=document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn= document.querySelector(".btn");
const startBtn=document.querySelector(".front");
const gameArea=document.querySelector(".wrapper");

 let currentPlayer;
 let gameGrid;
//  gameInfo.classList.remove("active");
//  boxes.classList.remove("active");


 startBtn.addEventListener("click", () =>{
   // gameInfo.classList.add("active");
   // boxes.classList.add("active");
   gameArea.classList.add("active");
   startBtn.classList.add("active");
   initGame();
});


 const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
 ];


 // let's create a function to initialise the game
 function initGame(){
    currentPlayer="X";
    gameGrid= ["","","","","","","","",""];
    newGameBtn.classList.remove("active");

    // UI pr bhi empty kr na padega boxes on click on new game
    boxes.forEach((box,index) =>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //one more thing is missing remove green color
        boxes[index].classList.remove("win");
    })
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
 }
 initGame();

 function swapTurn(){
    if(currentPlayer ==="X"){
        currentPlayer="O"
    }
    else{
        currentPlayer="X"
    }

    // UI update
    gameInfo.innerText=`Current Playaer- ${currentPlayer}`;
 }

 function checkGameOver(){
    let answer="";
    winningPositions.forEach((position) =>{
      // all 3 boxes should be non empty and exactly same in value
      if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" ||gameGrid[position[2]] !=="" )
         && (gameGrid[position[0]]===gameGrid[position[1]]) 
         && (gameGrid[position[0]]===gameGrid[position[2]])){
            // check is winner is X
            if(gameGrid[position[0]]==="X") 
               answer="X";

            else{
               answer="O";
            }

            //disable pointer events
            boxes.forEach((box) =>{
               box.style.pointerEvents="none";
            })

            //now we know X/O is the winnner
            boxes[position[0]].classList.add("win");  
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

         }
    });
    // it means we have a winner if above if run
    if(answer!=""){
      gameInfo.innerText=`Winner Player - ${answer}`;
      newGameBtn.classList.add("active");
      return;
    }

    //when there is no winner means match tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
      if(box !==""){
         fillCount++;
      }
    });
    // if fill count 9 means all fill so game tie
    if(fillCount===9){
      gameInfo.innerText="Game Tie !";
      newGameBtn.classList.add("active");
    }

 }

 function handleClick(index){
    if(gameGrid[index] === "" ){ 
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap kao turn ko
        swapTurn();
        //check koi jeet to nahi gaya h
        checkGameOver();
    }
 }
 boxes.forEach((box,index) =>{
    box.addEventListener("click", () =>{
        handleClick(index);
 })
});

newGameBtn.addEventListener("click", ()=>{
   startBtn.classList.remove("active");
   gameArea.classList.remove("active");


});

