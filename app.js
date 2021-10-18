const img = [{ score: 1, img: "card1.jpg" }, { score: 2, img: "card2.jpg" }, { score: 3, img: "card3.jpg" }, { score: 4, img: "card4.jpg" }, { score: 5, img: "card5.jpg" }, { score: 6, img: "card6.jpg" }, { score: 7, img: "card7.jpg" }, { score: 8, img: "card8.jpg" }, { score: 9, img: "card9.jpg" }, { score: 10, img: "card10.jpg" }, { score: 11, img: "cardJ.jpg" }, { score: 12, img: "cardQ.jpg" }, { score: 13, img: "cardK.jpg" }]


const img_container = document.querySelectorAll(".img-container");
const btn = document.getElementsByTagName("button");
const markContainer = document.querySelectorAll(".mark-container");
const board = document.querySelector(".board");

let btnClick = 0;
let random;
let start = false;
let yourScore = 0;
let jhonScore = 0;
let score = 0;
let stop = false;
let giveFlower = false;
let youWinTime = 0;
let jhonWinTime = 0;
let youLooseTime = 0;
let jhonLooseTime = 0;
let drawTime = 0;
let yourMoney = 10000;
let jhonMoney = 10000;
// innerHTML of the table function
const choiceSelector = (selector, value) => {
    element = document.querySelector(selector);
    element.innerHTML = value;
}
const mark = () => {
    choiceSelector(".youLoose", youLooseTime);
    choiceSelector(".youWin", youWinTime);
    choiceSelector(".jhonLoose", jhonLooseTime);
    choiceSelector(".jhonWin", jhonWinTime);
    choiceSelector(".youPose", yourMoney);
    choiceSelector(".jhonPose", jhonMoney);
}
const displayCard = (display, name) => {
    random = Math.floor((Math.random() * img.length));
    const element = document.createElement("img");
    const attr = document.createAttribute("src");
    attr.value = `cardsPhoto/${img[random].img}`;
    element.setAttributeNode(attr);
    const cardScore = random + 1;
    score = score + cardScore;
    img_container[display].appendChild(element);
    const image = document.querySelectorAll("img");
    markContainer[display].innerHTML = `${name} : ${score}`;
    if (score > 21) {
        markContainer[display].innerHTML = `${name} : Bust`;
        score = 0;
        stop = true;
    }
    setTimeout(() => {
        image.forEach(e => e.classList.add("fullScale"));
    }, 100);
}

btn[0].addEventListener("click", (e) => {
    start = true;
    btnClick += 1;
    if (btnClick < 5 && score < 22 && !(stop) && !(giveFlower)) {
        displayCard(0, "your score");
    } else if (giveFlower) {
        resetDefault();
    }
})
btn[1].addEventListener("click", () => {
    stop = false;
    yourScore = score;
    score = 0;
    if (!start) {
        return;
    }
    let i = 0;

    while (score < 18 && i < 4 && !(stop)) {
        displayCard(1, "jhon's score")
        i++;
        jhonScore = score;
    }
    if (yourScore < jhonScore) {
        yourMoney -= 500;
        jhonMoney += 500;
        board.innerHTML = "You Lose";
        youLooseTime += 1;
        jhonWinTime += 1;
        mark();
    } else if (yourScore > jhonScore) {
        yourMoney += 500;
        jhonMoney -= 500;
        board.innerHTML = "You Win";
        youWinTime += 1;
        jhonLooseTime += 1;
        mark();
    } else if (yourScore === jhonScore) {
        board.innerHTML = "Draw";
        drawTime += 1;
        choiceSelector(".youDraw", drawTime);
        choiceSelector(".jhonDraw", drawTime);
    }
    start = false;
    giveFlower = true;
})

btn[2].addEventListener("click", () => {
    resetDefault();
})
const resetDefault = () => {
    score = 0;
    yourScore = 0;
    jhonScore = 0;
    btnClick = 0;
    start = false;
    stop = false;
    giveFlower = false;
    board.innerHTML = "Let's to play";
    markContainer[0].innerHTML = "your score : 0";
    markContainer[1].innerHTML = "jhon's score : 0";
    img_container[0].innerHTML = "";
    img_container[1].innerHTML = "";
}
window.addEventListener("load", resetDefault);