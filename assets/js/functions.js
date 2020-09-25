import _ from '../underscore/underscore-esm-min.js';

export function transforCardValue(stringValue) {
  console.log(stringValue, 'transforCardValue');
  return isNaN(stringValue)
    ? stringValue === 'A'
      ? 11
      : 10
    : parseInt(stringValue);
}

const getElementTable = (currentPlayer) =>
  document.getElementById(`${currentPlayer}`);

const getElementScore = (currentPlayer) =>
  document.getElementById(`${currentPlayer}-score`);

export function checkWinner(score) {
  if (score.CPU > score.player && score.CPU <= 21) {
    alert('Dealer Wons!');
    return -1;
  }
  if (score.CPU === score.player) {
    alert('Nobody wins!!');
  } else {
    alert('You Win!');
  }
}

export function createDeck() {
  const cardSymbols = ['H', 'S', 'D', 'C'];
  const specials = ['J', 'Q', 'K', 'A'];
  const deck = [];
  cardSymbols.forEach((symbol) => {
    for (let index = 2; index <= 10; index++) {
      deck.push(`${index}${symbol}`);
    }
  });
  specials.forEach((special) => {
    cardSymbols.forEach((symbol) => {
      deck.push(`${special}${symbol}`);
    });
  });

  return _.shuffle(deck);
}

export function cardValue(card) {
  let stringValue = card.substring(0, card.length - 1);
  return transforCardValue(stringValue);
}

export function updateScore(score, player, card) {
  return (score[player] += card);
}

export function cpuPlay(deck, score) {
  const currentPlayer = setCurrentPlayer('CPU');
  if (score['player'] > 21) {
    makeAPlay(deck, currentPlayer, score);
    setTimeout(() => {
      //TODO Improve this way of show the winner message
      alert('Dealer Wins!');
    }, 100);
    return -1;
  }
  do {
    console.log(score);
    makeAPlay(deck, currentPlayer, score);
    console.log(score);
  } while (score['CPU'] < score['player'] && score['CPU'] <= 21);
}
export function setCurrentPlayer(turn) {
  turn = turn ? turn : 'player';
  let playerTable = getElementTable(turn);
  let playerScore = getElementScore(turn);
  return { table: playerTable, score: playerScore, name: turn };
}

export function getCard(deck) {
  const card = deck.pop();
  const imgEL = document.createElement('img');
  imgEL.src = `/assets/cards/${card}.png`;
  imgEL.classList.add('cards');
  return { img: imgEL, stringValue: card };
}

export function makeAPlay(deck, currentPlayer, score) {
  const card = getCard(deck);
  currentPlayer.table.append(card.img);
  const currentPoints = updateScore(
    score,
    currentPlayer.name,
    cardValue(card.stringValue),
  );
  currentPlayer.score.innerText = currentPoints;
}
