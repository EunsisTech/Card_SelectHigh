const cards = require("./cards");

//Tell the library which element to use for the table
cards.init({
	table:'#card-table', 
	type:NUMONLY
});

//Create a new deck of cards
let deck = new cards.Deck();
let upperhand;
let lowerhand;
const defaultCard = new Card('bj', 0, 'void');
let selectedCard=defaultCard

const init = () => {
	deck.removeCard(cards.all);
	//cards.all contains all cards, put them all in the deck
	deck.addCards(cards.all);
	cards.shuffle(deck);
	//No animation here, just get the deck onto the table.
	deck.render({immediate:true});

	//Now lets create a couple of hands, one face down, one face up.
	upperhand = new cards.Hand({faceUp:false, y:60});
	lowerhand = new cards.Hand({faceUp:true,  y:340});
}

//Let's deal when the Deal button is pressed:
$('#deal').click(function() {
	//Deck has a built in method to deal to hands.
	$('#deal').hide();
	deck.deal(2, [upperhand, lowerhand], 50);
	selectedCard=defaultCard;
});

//Finally, when you click a card in your hand, if it's
//the same suit or rank as the top card of the discard pile
//then it's added to it
lowerhand.click(function(card){
	// user cancel the selection(click the selected card, again)
	if (card === selectedCard)
	{
		selectedCard=defaultCard;
		card.moveTo(card.x, card.y+50);
	}
	else
	{
		selectedCard=card;
		card.moveTo(card.x, card.y-50);
	}
});

