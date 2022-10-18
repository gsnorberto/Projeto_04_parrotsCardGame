let numberOfCards = 8;
let cardsPosition = []; // exemple with 8 cards = [1,4,1,3,3,4,2,2]
let cardsName = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

let numberOfCardsTurned = 0; // 0, 1 or 2
let upturnedCard_position = []; // position - card 1 and card 2 

let cards_div = document.querySelector('.cards');

let count_rightCards = 0; // 

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
    // if there are no upturned cards
    if(numberOfCardsTurned === 0 ) {
        numberOfCardsTurned++;
        upturnedCard_position.push(divPosition);
    } else if(upturnedCard_position[0] !== divPosition) { // if upturned card !== clicked card
        numberOfCardsTurned++;
        upturnedCard_position.push(divPosition);
    }
    
    document.querySelector(`.cards .card:nth-child(${divPosition})`).innerHTML = `<img src='./media/imgs/${cardsName[[cardsPosition[divPosition-1]]-1]}' alt=''>`;

    if(numberOfCardsTurned === 2){
        if(cardsPosition[upturnedCard_position[0]-1] === cardsPosition[upturnedCard_position[1]-1]){ //the cards are the same
            //disable click
            document.querySelector(`.cards .card:nth-child(${upturnedCard_position[0]})`).removeAttribute("onclick");
            document.querySelector(`.cards .card:nth-child(${upturnedCard_position[1]})`).removeAttribute("onclick");

            count_rightCards += 2;
        } else {
            document.querySelector(`.cards .card:nth-child(${upturnedCard_position[0]})`).innerHTML = `<img src='./media/imgs/back.png' alt=''>`;
            document.querySelector(`.cards .card:nth-child(${upturnedCard_position[1]})`).innerHTML = `<img src='./media/imgs/back.png' alt=''>`;
        }
        numberOfCardsTurned = 0;
        upturnedCard_position = [];
    }

    if(count_rightCards === numberOfCards){
        alert('Você venceu!!!')
    }
}

