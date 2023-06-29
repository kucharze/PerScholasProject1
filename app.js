//Class for player
class Player {
  //parameters
  // - list of cards in hand
  // - The card pile to reference top card and suite

  constructor(deck, pile) {
    this.hand = [new Card("8", "h")];
    this.deck = deck;
    this.pile = pile;
    this.pickingSuite = false;
  }

  //Functions
  //Draw a card from the deck
  drawCard() {
    this.hand.push(this.deck.dealACard());
  }
  //Play a card from hand
  // - If legal to play play it
  // - if not get an alert that you can't play it
  // - If 8 show a screen to change the suite settings
  playCard(value, suite) {
    console.log("Playing card");
    if (
      value === this.pile.value ||
      value === "8" ||
      suite === this.pile.suite
    ) {
      let playCard = this.removeCard(value, suite);

      if (playCard === undefined) {
        return "Error can't find card";
      }

      //We picked an 8
      if (value === "8") {
        //Variable to signal picking a suite and we can't proceed??
        //Reveak suite picker and do not process further
        //Disable card pick logic
        document.querySelector(".suitePicker").style = "display: block";
        this.pile.addCard(playCard, false);
        return false;
      }
      console.log(playCard);
      this.pile.addCard(playCard, true);
      return true;
    } else {
      alert("Illegal move");
      return false;
    }
  }

  //Remove a card from our hand
  removeCard(value, suite) {
    for (let i = 0; i < this.hand.length; i++) {
      if (value === this.hand[i].value && suite === this.hand[i].suite) {
        return this.hand.splice(i, 1)[0];
        // return this.hand[i];
      }
    }
  }

  //Enable hand events
  disableHand() {}

  //disable hand events
  enableHands() {}

  //Display cards to screen
  // - Show the picture for each card
  // - If time allows, add animations
  displayHand() {
    console.log("Player hand", this.hand);

    let handspace = document.querySelector(".player");
    handspace.replaceChildren();

    for (let i = 0; i < this.hand.length; i++) {
      let back = document.createElement("img");
      back.setAttribute("src", this.hand[i].image);
      back.setAttribute("class", "playerHand");
      back.setAttribute("value", this.hand[i].value);
      back.setAttribute("suite", this.hand[i].suite);
      back.addEventListener("click", (e) => {
        //https://stackoverflow.com/questions/58435999/grab-dom-attribute-on-event-target
        console.log("You clicked me");
        console.log(e.target.getAttribute("value"));
        console.log(e.target.getAttribute("suite"));

        processTurns(
          e.target.getAttribute("value"),
          e.target.getAttribute("suite")
        );
      });
      handspace.append(back);
    }
  }
}

//Class for computer
class Computer {
  //parameters
  // - list of cards in hand
  // - The card pile to reference the top card and suite

  constructor(deck, pile) {
    this.hand = [];
    this.deck = deck;
    this.pile = pile;
  }

  //Functions
  //Draw a card from the deck
  drawCard() {
    this.hand.push(this.deck.dealACard());
  }

  //Play a card from hand
  //--Play the first card available
  // ----- For simplicty if 8 is played keep suite as the suite of the 8
  // --------- If time allows create logic to change suite for computer accodingly
  //--Draw a card if it can't find a card to play
  playCard() {
    console.log("The computer's turn to play");
    let canPlay = false;
    let cardPlay = null;
    for (let i = 0; i < this.hand.length; i++) {
      if (
        this.hand[i].value === this.pile.value ||
        this.hand[i].value === "8" ||
        this.hand[i].suite === this.pile.suite
      ) {
        //Remove the card
        cardPlay = this.hand.splice(i, 1)[0];
        break;
      }
    }
    if (cardPlay != null) {
      console.log("Computer is playing a card");
      console.log(cardPlay);
      this.pile.addCard(cardPlay, true);
      //return cardPlay;
    } else {
      console.log("Computer is drawing");
    }
    this.displayHand();
    this.pile.displayCard();
  }

  //Display cards to screen
  // --Simply show card backs
  // -- If time allows show animations
  displayHand() {
    console.log("Com hand", this.hand);

    let handspace = document.querySelector(".computer");
    handspace.replaceChildren();
    for (let i = 0; i < this.hand.length; i++) {
      let back = document.createElement("img");
      //   back.setAttribute("src", "Images/cardbackred.png");
      back.setAttribute("src", this.hand[i].image);
      back.setAttribute("class", "comHand");
      handspace.append(back);
    }
  }
}

class Card {
  //Class for Card
  //Stores:
  // - Value: number of the card or jack, queen, king, ace
  // Suite: heart, diamond, club, spade
  // Image: the link for what image to display for the card
  // Click
  constructor(value, suite) {
    this.suite = suite;
    this.value = value;
    //Will pick out image based on suite and value
    this.image = "Images/" + this.value + this.suite + ".png";
  }
}

//Class for deck
class Deck {
  //Paramters
  // - List of cards in the deck

  constructor() {
    this.deckList = [];

    this.suites = ["s", "c", "d", "h"];
    this.values = [
      "a",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < this.suites.length; j++) {
        this.deckList.push(new Card(this.values[i], this.suites[j]));
      }
    }
  }

  //Functions
  // - Deal a card out
  dealACard() {
    let spot = Math.floor(Math.random() * (this.deckList.length - 0) + 0);
    //Randomize what position we pick??
    return this.deckList.splice(spot, 1)[0];
  }

  // - Reset the deck if we run low on cards
  remake() {
    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < this.suites.length; j++) {
        this.deckList.push(new Card(this.values[i], this.suites[j]));
      }
    }
  }
}

//Class for pile
class CardPile {
  //parameters
  // - Value for top card value
  // - Value for suit
  // - The top card

  constructor(top) {
    this.topCard = top;
    this.suite = top.suite;
    this.value = top.value;
  }

  //Functions
  //Set suite - Change the suite
  setSuite(suite) {
    this.suite = suite;
    console.log(this.topCard, this.suite, this.value);
  }
  //Add card to deck
  addCard(card, update) {
    // Place a card on top of the deck and set suite and value
    // --Time allows, add animations
    this.topCard = card;

    this.value = card.value;

    //We should update the suite
    //This does not run if we play an 8
    if (update) {
      this.suite = card.suite;
    }
    //console.log(card);
    console.log("Adding a card", this.topCard, this.suite, this.value);
  }

  //display the card on top of the deck
  displayCard() {
    console.log("Pile top card", this.topCard);
    let pile = document.querySelector(".pile");

    pile.setAttribute("src", this.topCard.image);

    let item = document.cre;
  }
}

//Game loop functions and parameters
let deck = new Deck();
let pile = new CardPile(new Card("3", "h"));

let com = new Computer(deck, pile);
let player = new Player(deck, pile);

// com.displayHand();

// console.log(deck.deckList);

//Take turns
const processTurns = (value, suite) => {
  // - Run through the player's turn
  // - If turn processed check if they won (0 cards in hand)
  // - If the player properly processed their turn, or has not won yet, go to Computer turn
  // - Check if computer won (0 cards ), if not, process logic and get ready for another round

  let win = document.querySelector(".Winner");
  console.log("Processing turns");
  if (player.playCard(value, suite)) {
    if (player.hand.length === 0) {
      console.log("Player wins");
      win.innerHTML = "Congradulations!! You win";
    } else {
      com.playCard();
    }
  }

  pile.displayCard();
  player.displayHand();
  if (com.hand.length === 0) {
    win.innerHTML = "Sorry, you lose";
  }
};

//Draw a card
const drawCard = () => {
  console.log("Drawing a card");
  player.hand.push(deck.dealACard());
  player.displayHand();

  com.playCard();
  console.log(player.hand);

  pile.displayCard();
  player.displayHand();
  if (com.hand.length === 0) {
    win.innerHTML = "Sorry, you lose";
  }
};

const chooseSuite = (suite) => {
  //Choose a suite to pass in
  //Call pile set suit
  //Set pile value to 8
  //Let the computer have a turn
  console.log(suite);

  document.querySelector(".suitePicker").style = "display:none";
  pile.setSuite(suite);
  com.playCard();
};

//Startup function
const startUp = () => {
  // Deal out player hands
  for (let i = 0; i < 5; i++) {
    com.hand.push(deck.dealACard());
  }
  com.displayHand();

  for (let i = 0; i < 5; i++) {
    player.hand.push(deck.dealACard());
  }
  player.displayHand();

  pile.displayCard();
};

//Restart function
const restart = () => {
  //Clear the board and call startup function to startup a new game
  console.log("Restarting the game");
};

startUp();

// console.log(player.playCard("8", "h"));
console.log(player.hand);
