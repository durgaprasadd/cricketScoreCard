const createPlayer = function(playerName, status) {
  let name = playerName;
  let runs = '';
  let balls = '';
  return { name, status, runs, balls };
};

const createBatsmen = function(playerName1, playerName2) {
  let player1 = createPlayer(playerName1, 'stike');
  let player2 = createPlayer(playerName2, 'nonStrike');
  return { player1, player2 };
};

const createBowler = function(playerName) {
  let name = playerName;
  let balls = '';
  return { name, balls };
};

const createScore = function() {
  let total = 0;
  let overs = 0;
  let wickets = 0;
  return { total, overs, wickets };
};

const getRuns = function(ballStatus) {
  let runs = ballStatus.split('+');
  runs = runs[runs.length - 1];
  const validRuns = ['0', '1', '2', '3', '4', '6'];
  if (validRuns.includes(runs)) {
    return +runs;
  }
  return 0;
};

const getNoOfWickets = function(ballStatus) {
  const chances = ['caught', 'wicket', 'bowled', 'runout', 'lbw'];
  if (chances.includes(ballStatus)) {
    return 1;
  }
  return 0;
};

const parseScore = function(ballStatus) {
  let runs = getRuns(ballStatus);
  let balls = 0.1;
  let wickets = getNoOfWickets(ballStatus);
  if (ballStatus.includes('wide') || ballStatus.includes('noball')) {
    runs += 1;
    return { runs, balls: 0, wickets };
  }
  return { runs, balls, wickets };
};

const convertBallsToOvers = function(overs) {
  let decimalValue = overs - Math.floor(overs / 1);
  if (decimalValue > 0.5) {
    return overs + 1 - decimalValue;
  }
  return overs;
};

class ScoreCard {
  constructor(player1, player2, bowler) {
    this.batsmen = createBatsmen(player1, player2);
    this.bowler = createBowler(bowler);
    this.score = createScore();
  }
  updateScore(ballStatus) {
    let { runs, balls, wickets } = parseScore(ballStatus);
    this.score.total += runs;
    this.score.overs += balls;
    this.score.overs = +convertBallsToOvers(this.score.overs).toFixed(1);
    this.score.wickets += wickets;
    return this;
  }
}
