let numberOfCards = 0;

while(true){
    let qnt = prompt('Com quantas cartas quer jogar?');

    if(qnt < 4 || qnt > 14 || qnt % 2 !== 0){
        alert('Insira um valor válido');
    } else{
        numberOfCards = qnt;
        break;
    }
}

let cards_div = document.querySelector('.cards');

let cardsPosition = []; // exemple with 8 cards = [1,4,1,3,3,4,2,2]
let cardsName = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

let numberOfCardsTurned = 0; // 0, 1 or 2
let upturnedCard_position = []; // position - card 1 and card 2 

let count_rightCards = 0; // 2, 4, 6 ... 
let numberOfMoves = 0; // 1,2,3,4...

// Insert cards to array
for(let i = 1; i <= (numberOfCards / 2); i++){
    for(let j = 1; j <= 2 ; j++) {
        cardsPosition.push(i);
    }
}

// Shuffle cards
cardsPosition.sort(comparador); 
function comparador() { 
	return Math.random() - 0.5; 
}
console.log(cardsPosition);

// Add cards on display
for(let i = 0; i < numberOfCards; i++) {
    cards_div.innerHTML += `<div onclick='turnCard(${i+1})' class='card'> <img src='./media/imgs/back.png' alt=''> </div>`;
}

//Turn Card
const turnCard = (divPosition) => {
    // if there are no upturned cards or if the clicked cards are different
    if(numberOfCardsTurned === 0 || upturnedCard_position[0] !== divPosition) {
        numberOfCardsTurned++;
        upturnedCard_position.push(divPosition);
        numberOfMoves++;
    } 
    
    document.querySelector(`.cards .card:nth-child(${divPosition})`).innerHTML = `<img src='./media/imgs/${cardsName[[cardsPosition[divPosition-1]]-1]}' alt=''>`;

    if(numberOfCardsTurned === 2){12
        //disable all click events
        document.querySelectorAll(".card").forEach((element) => element.classList.add("disabled"));

        if(cardsPosition[upturnedCard_position[0]-1] === cardsPosition[upturnedCard_position[1]-1]){ //the cards are the same
            //disable click
            document.querySelector(`.cards .card:nth-child(${upturnedCard_position[0]})`).removeAttribute("onclick");
            document.querySelector(`.cards .card:nth-child(${upturnedCard_position[1]})`).removeAttribute("onclick");

            count_rightCards += 2;
            upturnedCard_position = [];
        } else { //the cards are different
            setTimeout(function(){
                //hide card
                document.querySelector(`.cards .card:nth-child(${upturnedCard_position[0]})`).innerHTML = `<img src='./media/imgs/back.png' alt=''>`;
                document.querySelector(`.cards .card:nth-child(${upturnedCard_position[1]})`).innerHTML = `<img src='./media/imgs/back.png' alt=''>`;

                upturnedCard_position = [];
            }, 1000);
            
        }

        setTimeout(function () {
            document.querySelectorAll(".card").forEach((element) => element.classList.remove("disabled"));
        }, 1100);

        numberOfCardsTurned = 0;
    }

    console.log(count_rightCards);
        console.log(numberOfCards);

    if(count_rightCards == numberOfCards){
        
        setTimeout(function(){
            alert(`Você ganhou em ${numberOfMoves} jogadas!`);
        }, 500);
    }
}

