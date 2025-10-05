let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#reset-btn")
let newGameBtn = document.querySelector("#new-btn")
let mmsgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turn0 = true; // playerX, plalyer0
let cnt = 0; //to track draw scenario

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
   turn0 = true;
   cnt=0;
   enableBoxes()
   mmsgContainer.classList.add("hide")
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=> {
      if(turn0){
        box.innerText = "O"
        box.style.color = "#DD1C1A";
        turn0 = false
      }
      else {
        box.innerText = "X"
        box.style.color= "#06AED5";
        turn0 = true
      }
      box.disabled = true
      cnt++;

      let winnerIs = checkWinner();

      if(cnt == 9 && !winnerIs){
        gameDraw();
      }
    });
});

const gameDraw = () =>{
    msg.innerText = `Game Was a Draw.`
    mmsgContainer.classList.remove("hide")
    disableBoxes();
}

const disableBoxes =() =>{
    for(let box of boxes){
        box.disabled = true
    }
}

const enableBoxes =() =>{
    for(let box of boxes){
        box.disabled = false
        box.innerText=""
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    mmsgContainer.classList.remove("hide")
    disableBoxes();
}

const checkWinner = () =>{
    for(pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click",resetGame)
resetBtn.addEventListener("click",resetGame)

