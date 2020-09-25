import {
  checkWinner,
  createDeck,
  cpuPlay,
  setCurrentPlayer,
  makeAPlay,
} from './functions.js';

const deck = createDeck();
const score = { player: 0, CPU: 0 };
let turn = ''; //'' set current player as player by default!

const getOneCardButtonEL = document.getElementById('getOneCard');
const stopButtonEL = document.getElementById('stopButton');
const newGameButton = document.getElementById('newGameButton');
//

let currentPlayer = setCurrentPlayer(turn);

//

getOneCardButtonEL.addEventListener('click', function () {
  makeAPlay(deck, currentPlayer, score);
  if (score.player > 21) {
    console.warn('Lo siento pasaste de 21');
    getOneCardButtonEL.disabled = true;
    stopButtonEL.disabled = true;
    cpuPlay(deck, score);
  }
});

stopButtonEL.addEventListener('click', function () {
  getOneCardButtonEL.disabled = true;
  stopButtonEL.disabled = true;
  cpuPlay(deck, score);
  setTimeout(() => {
    //TODO Improve this way of show the winner message
    checkWinner(score);
  }, 100);
});

newGameButton.addEventListener('click', () => location.reload());
