//Class for player
class Player {
  //parameters
  // - list of cards in hand
  // - The card pile to reference top card and suite

  constructor(deck, pile) {
    this.hand = [new Card("8", "h")];
    this.deck = deck;
    this.pile = pile;
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

      if (value === "8") {
        //Reveak suite picker and do not process further
        //Disable card pick logic
        document.querySelector(".suitePicker").style = "display: block";
        return "is an 8";
      }

      return playCard;
    } else {
      alert("Illegal move");
      return "Illegal move";
    }
  }

  //Remove a card from our hand
  removeCard(value, suite) {
    for (let i = 0; i < this.hand.length; i++) {
      if (value === this.hand[i].value && suite === this.hand[i].suite) {
        // return this.hand.splice(i, 1);
        return this.hand[i];
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
    //console.log(this.hand);

    let handspace = document.querySelector(".player");
    handspace.replaceChildren();

    for (let i = 0; i < this.hand.length; i++) {
      let back = document.createElement("img");
      back.setAttribute("src", "Images/cardbackred.png");
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
  playCard(card) {}

  //Remove a card from our hand
  removeCard(card) {
    for (let i = 0; i < this.hand.length; i++) {
      if (
        card.value === this.hand[i].value &&
        card.suite === this.hand[i].suite
      ) {
        return this.hand.splice(i, 1);
        // return this.hand[i];
      }
    }
  }

  //Display cards to screen
  // --Simply show card backs
  // -- If time allows show animations
  displayHand() {
    //console.log(this.hand);

    let handspace = document.querySelector(".computer");
    handspace.replaceChildren();
    for (let i = 0; i < this.hand.length; i++) {
      let back = document.createElement("img");
      back.setAttribute("src", "Images/cardbackred.png");
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
    this.image = "";
  }
}

//Class for deck
class Deck {
  //Paramters
  // - List of cards in the deck

  constructor() {
    this.deckList = [];

    let suites = ["S", "J", "D", "H"];
    let values = [
      "1",
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
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < suites.length; j++) {
        this.deckList.push(new Card(values[i], suites[j]));
      }
    }
  }

  //Functions
  // - Deal a card out
  dealACard() {
    //Randomize what position we pick??
    return this.deckList.splice(0, 1)[0];
  }
  //shuffle the deck
  shuffle() {
    //randomly swap cards araound in deck
  }

  // - Reset the deck if we run low on cards
  remake() {
    let suites = ["S", "J", "D", "H"];
    let values = [
      "1",
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
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < suites.length; j++) {
        this.deckList.push(new Card(values[i], suites[j]));
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
    this.topCard = this.top;
    this.suite = top.suite;
    this.value = top.value;
  }

  //Functions
  //Set suite - Change the suite
  //Set value - Change the value
  //Add card to deck
  // Place a card on top of the deck and set suite and value
  // --Time allows, add animations
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
  console.log("Processing turns");
  console.log(player.playCard(value, suite));
};

const chooseSuite = (suite) => {
  //Choose a suite to pass in
  //Call pile set suit
  //Set pile value to 8
  //Let the computer have a turn
  console.log(suite);

  document.querySelector(".suitePicker").style = "display:none";
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
};

//Restart function
const restart = () => {
  //Clear the board and call startup function to startup a new game
};

startUp();

// console.log(player.playCard("8", "h"));
console.log(player.hand);
