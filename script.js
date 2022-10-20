let numberOfCards = 0;

//timer
let m = 0;
let s = 0;
let timeout;

while (true) {
    let qnt = prompt('Com quantas cartas quer jogar?  Digite um número par entre 4 e 14');

    if (qnt < 4 || qnt > 14 || qnt % 2 !== 0) {
        alert('Insira um valor válido');
    } else {
        numberOfCards = qnt;
        break;
    }
}
startTimeCount();

let cards_div = document.querySelector('.cards');

let cardsPosition = []; // exemple with 8 cards = [1,4,1,3,3,4,2,2]
let cardsName = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

let numberOfCardsTurned = 0; // 0, 1 or 2
let upturnedCard_position = []; // position - card 1 and card 2 

let count_rightCards = 0; // 2, 4, 6 ... 
let numberOfMoves = 0; // 1,2,3,4...

// Insert cards to array
for (let i = 1; i <= (numberOfCards / 2); i++) {
    for (let j = 1; j <= 2; j++) {
        cardsPosition.push(i);
    }
}

// Shuffle cards
cardsPosition.sort(comparador);
function comparador() {
    return Math.random() - 0.5;
}

// Add cards on display
for (let i = 0; i < numberOfCards; i++) {
    cards_div.innerHTML += `
        <div onclick='turnCard(${i + 1})' class="card">
            <div class="frontFace-card">
                <img src="./media/imgs/back.png" alt="">
            </div>
            <div class="backFace-card">
                <img src="./media/imgs/${cardsName[cardsPosition[i]-1]}" alt="">
            </div>
        </div>
    `;
}

//Turn Card
const turnCard = (divPosition) => {
    // if there are no upturned cards or if the clicked cards are different
    if (numberOfCardsTurned === 0 || upturnedCard_position[0] !== divPosition) {
        numberOfCardsTurned++;
        upturnedCard_position.push(divPosition);
        numberOfMoves++;
    }

    document.querySelector(`.cards .card:nth-child(${divPosition}) .frontFace-card`).classList.add('hide-card');
    document.querySelector(`.cards .card:nth-child(${divPosition}) .backFace-card`).classList.add('show-card');

    if (numberOfCardsTurned === 2) {
        12
        //disable all click events
        document.querySelectorAll(".card").forEach((element) => element.classList.add("disabled"));

        if (cardsPosition[upturnedCard_position[0] - 1] === cardsPosition[upturnedCard_position[1] - 1]) { //the cards are the same
            //disable click
            document.querySelector(`.cards .card:nth-child(${upturnedCard_position[0]})`).removeAttribute("onclick");
            document.querySelector(`.cards .card:nth-child(${upturnedCard_position[1]})`).removeAttribute("onclick");

            count_rightCards += 2;
            upturnedCard_position = [];
        } else { //the cards are different
            setTimeout(function () {
                //hide card
                document.querySelector(`.cards .card:nth-child(${upturnedCard_position[0]}) .frontFace-card`).classList.remove('hide-card');
                document.querySelector(`.cards .card:nth-child(${upturnedCard_position[0]}) .backFace-card`).classList.remove('show-card');

                document.querySelector(`.cards .card:nth-child(${upturnedCard_position[1]}) .frontFace-card`).classList.remove('hide-card');
                document.querySelector(`.cards .card:nth-child(${upturnedCard_position[1]}) .backFace-card`).classList.remove('show-card');

                upturnedCard_position = [];
            }, 1000);
        }

        setTimeout(function () {
            document.querySelectorAll(".card").forEach((element) => element.classList.remove("disabled"));
        }, 1100);

        numberOfCardsTurned = 0;
    }

    if (count_rightCards == numberOfCards) {
        stopTime();

        setTimeout(function () {
            alert(`Você ganhou em ${numberOfMoves} jogadas! Tempo do jogo: ${timeFormat(m)}:${timeFormat(s-1)}`);

            while (true) {
                let userResponse = prompt("Deseja jogar novamente? Digite: 'sim' ou 'não'");
            
                if (userResponse == 'sim') {
                    document.location.reload(true);
                    break;
                } else if(userResponse == 'não'){
                    break;
                } else {
                    alert("Resposta inválida! Digite novamente")
                }
            }

        }, 500);
    }
}

//Time
function startTimeCount () {
    document.querySelector('.clock').innerHTML = timeFormat(m) + ":" + timeFormat(s);

    s++;
    if(s == 60){
        s = 0;
        m++;
    }

    timeout = setTimeout(startTimeCount, 1000);
}

// stop time
function stopTime(){
    clearTimeout(timeout);
}

function timeFormat (num) {
    if(num < 10){
        return '0' + num;
    }
    return num;
}