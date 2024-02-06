const CARD_MOVEBY = 80;

//Tell the library which element to use for the table
cards.init({
	table:'#card-table', 
	cardUrl: 'image/cards.png',
	cardSize:{
		width: 69,
		height: 94,
		padding: 100,
	},
	type:NUMONLY // Number only = No J, Q, K
});

//Create a new deck of cards
let deck = new cards.Deck();
let upperhand = new cards.Hand({faceUp:false, y:60});
let lowerhand = new cards.Hand({faceUp:true,  y:340});
// defaultCard is invalid card in this game
const defaultCard = new cards.Card('bj', 0, 'void');
let selectedCard=defaultCard;
let upperhighcard;

const init = () => {
	$('#btnCheck').hide();
	$('#btnNewGame').hide();
	$('.labels').hide();
	$('#btnDeal').show();
	
	//cards.all contains all cards, put them all in the deck
	deck.removeCard(cards.all);
	deck.addCards(cards.all);
	deck.x = 250;
	cards.shuffle(deck);
	//No animation here, just get the deck onto the table.
	deck.render({immediate:true});
}

//Let's deal when the btnDeal button is pressed:
$('#btnDeal').click(function() {
	//Deck has a built in method to btnDeal to hands.
	$('#btnDeal').hide();
	$('#btnCheck').show();
	$('#btnNewGame').show();
	// move deck to left
	deck.x -= 100;
	deck.render({immediate:true});
	
	// initialize selectedCard;
	selectedCard=defaultCard;
	
	// btnDeal 2 cards and select higher card for upper deck
	deck.deal(2, [upperhand, lowerhand], 50,()=>{
		console.debug(upperhand);
		upperhighcard = upperhand[0].rank > upperhand[1].rank ? upperhand[0]:upperhand[1];
		upperhighcard.moveBy(0,CARD_MOVEBY,50);
	});
});

lowerhand.click(function(card){
	// user cancel the selection(click the selected card, again)
	if (card === selectedCard)
	{
		selectedCard=defaultCard;
		card.moveBy(0, CARD_MOVEBY, 50);
	}
	else
	{
		if (selectedCard != defaultCard ) 
		{
			selectedCard.moveBy(0,CARD_MOVEBY,50);
		}
		selectedCard=card;
		card.moveBy(0,CARD_MOVEBY*-1, 50);
	}
});

$('#btnCheck').click(function() {
	if (selectedCard===defaultCard)
	{
		$('#lblSelectOne').text("Pick one of cards!").show();
		return;
	}
	$('#btnCheck').hide();
	$('#lblSelectOne').hide();
	$('#btnNewGame').show();

	// show upperhand
	for (var i=0; i<upperhand.length;i++)
	{
		upperhand[i].showCard();
	}

	var winorlose="Win !!";
	if (upperhighcard.rank>selectedCard.rank)
	{
		winorlose="Lose !!"
	}
	else if (upperhighcard.rank===selectedCard.rank)
	{
		winorlose="Draw"
	}
	$('#lblWinOrLose').text(winorlose).show();
});

$('#btnNewGame').click(function() {
	init();
});

init();
