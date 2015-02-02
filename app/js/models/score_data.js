'Use Strict'

var exportScore = exportScore || {}

exportScore.scoreData = function(score, callback){
	scoreGen.init(score)
	callback(currentHighscore)
}

exportScore.speedData = function(speed, callback){
	scoreGen.init(null, speed)

	// callback(highScore, averageScore, averageSpeed)
}

var scoreGen = {

	init: function(score, speed){
		var scoreList = [0];
		var speedList = [0];

		scoreList.push(score);
		speedList.push(speed);

		this.highScore(scoreList,speedList);
	},

	highScore: function(scoreList, speedList){

		var highNum = 0;
		for(var i=0; i< scoreList.length; i++){
		    if(scoreList[i] > highNum){
		        highNum = scoreList[i];
		     }
		}

		currentHighscore = highNum

		this.averageSpeed(speedList, currentHighscore);
	},
	averageSpeed: function(speedList){

		var sum = 0;

		for (var x = 0; x < speedList.length; x ++){
		  sum += speedList[x];
		}

		var averageSpeed = sum/speedList.length; 

	}
}

module.exports = exportScore;