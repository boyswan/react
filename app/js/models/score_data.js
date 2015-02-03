'Use Strict';

var scoreList = [];
var speedList = [];


var exportScore = exportScore || {}

exportScore.scoreData = function(score, callback){
	scoreGen.init(score)
	callback(currentHighscore, currentAverageScore)
}

exportScore.speedData = function(speed, callback){
	scoreGen.averageSpeed(speed)
	callback(currentAverageSpeed)
}

exportScore.setItemJSON = function(name, object){
	localStorage.setItem(name, JSON.stringify(object));
}

exportScore.getItemJSON = function(name){
	return JSON.parse(localStorage.getItem(name));
}

var scoreGen = {

	init: function(score){

		if (localStorage.getItem("scoreList") !== null) {
			scoreList = JSON.parse(localStorage.getItem("scoreList"));
		}

		scoreList.push(score);
	    exportScore.setItemJSON('scoreList', scoreList);
		scoreList = scoreList.filter(Number)

		this.highScore(scoreList);
		this.averageScore(scoreList);
	},

	highScore: function(scoreList){

		var sum = 0;
		for (var i=0; i< scoreList.length; i++){

		    if (scoreList[i] > sum){
		        sum = scoreList[i];
		    }
		}
		var highScore = sum;

		currentHighscore = highScore
	},

	averageScore: function(scoreList){

		var sum = 0;
		for (var x = 0; x < scoreList.length; x ++){
		  sum += scoreList[x];
		}
		var averageScore = (sum/scoreList.length).toFixed(1); 

		currentAverageScore = averageScore	
	},

	averageSpeed: function(speed){
		if (localStorage.getItem("speedList") !== null) {
			speedList = JSON.parse(localStorage.getItem("speedList"));
		}
		speedList.push(speed);
	    exportScore.setItemJSON('speedList', speedList);
		speedList = speedList.filter(Number)

		var sum = 0;	
		for (var x = 0; x < speedList.length; x ++){
		  sum += speedList[x];
		}
		var averageSpeed = sum/speedList.length

		currentAverageSpeed = (averageSpeed).toFixed(1)
	}

}

module.exports = exportScore;