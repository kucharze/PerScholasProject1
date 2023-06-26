//Class for player
//parameters
// - list of cards in hand
// - The card pile to reference top card and suite
//Functions
//Draw a card from the deck
//Play a card from hand
// - If legal to play play it
// - if not get an alert that you can't play it
// - If 8 show a screen to change the suite settings
//Display cards to screen
// - Show the picture for each card
// - If time allows, add animations

//Class for computer
//parameters
// - list of cards in hand
// - The card pile to reference the top card and suite
//Functions
//Draw a card from the deck
//Play a card from hand
//--Play the first card available
// ----- For simplicty if 8 is played keep suite as the suite of the 8
// --------- If time allows create logic to change suite for computer accodingly
//--Draw a card if it can't find a card to play
//Display cards to screen
// --Simply show card backs
// -- If time allows show animations

//Class for Card
//Stores:
// - Value: number of the card or jack, queen, king, ace
// Suite: heart, diamond, club, spade
// Image: the link for what image to display for the card

//Class for deck
//Paramters
// - List of cards in the deck
//Functions
// - Deal a card out
// - Reset the deck if we run low on cards

//Class for pile
//parameters
// - Value for top card value
// - Value for suit
// - The top card
//Functions
//Set suite - Change the suite
//Set value - Change the value
//Add card to deck
// Place a card on top of the deck and set suite and value
// --Time allows, add animations

//Game loop functions and parameters

//Take turns
// - Run through the player's turn
// - If turn processed check if they won (0 cards in hand)
// - If the player properly processed their turn, or has not won yet, go to Computer turn
// - Check if computer won (0 cards ), if not, process logic and get ready for another round

//Choose a suite to pass in
//Call pile set suit
//Set pile value to 8
//Let the computer have a turn

//Startup function
// Deal out player hands

//Restart function
//Clear the board and call startup function to startup a new game
