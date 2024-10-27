let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#newbutton");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o-sign"); // Add class for "O"
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x-sign"); // Add class for "X"
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-sign", "x-sign"); // Remove both classes
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winpattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            winnerFound = true;
            break;
        }
    }

    if (!winnerFound && [...boxes].every(box => box.innerText !== "")) {
        showDraw();
        disableBoxes();
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
