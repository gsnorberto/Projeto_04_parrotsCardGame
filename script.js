let numberOfCards = 14;
let cardsPosition = [];
let cardsName = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

let numberOfCardsTurned = 0; // 0, 1 or 2

let cards_div = document.querySelector('.cards');

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
    document.querySelector(`.cards .card:nth-child(${divPosition})`).innerHTML = `<img src='./media/imgs/${cardsName[[cardsPosition[divPosition-1]]-1]}' alt=''>`;
}




