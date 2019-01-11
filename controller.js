const getId = function(Id) {
  return document.getElementById(Id);
};

const displayPlayers = function({ batsmen, bowler, score }) {
  getId('1').innerText = batsmen.player1.name;
  getId('2').innerText = batsmen.player2.name;
  getId('3').innerText = bowler.name;
  getId('4').innerText = score.overs;
  getId('5').innerText = score.total;
  getId('6').innerText = score.wickets;
};

let scoreCard = new ScoreCard('sachin', 'dhoni', 'zaheer');

const update = function() {
  let ballStatus = getId('input').value;
  scoreCard.updateScore(ballStatus);
  displayPlayers(scoreCard);
};

window.onload = function() {
  displayPlayers(scoreCard);
};
