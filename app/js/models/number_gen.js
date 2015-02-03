'Use Strict'


var exportAll = exportAll || {}

exportAll.init = function(difficulty, callback){
	numGen.init(difficulty)
	callback(currentQuestion, currentAnswer, currentChoices)
}

exportAll.update = function(start, callback){
	numGen.updateNumber(start)
	callback(currentQuestion, currentAnswer, currentChoices)
}

var numGen = {

	init: function(difficulty){

		var initialMax, initialMin, difficulty

		if (difficulty == 'easy'){
			initialMax = 9
			initialMin = 1
		} else if (difficulty == 'medium'){
			initialMax = 99
			initialMin = 10
		} else if (difficulty == 'hard'){
			initialMax = 999
			initialMin = 100
		}

		var start = Math.floor(Math.random() * initialMax - initialMin) + (initialMin + 1)
		this.getlength(start, difficulty)
	},

	updateNumber: function(firstRand){
		var start = firstRand; 
		this.getlength(start)
	},

	getlength: function(start, difficulty){

		var startString = start.toString().length, maxAmount, minAmount

		if (startString == 1){
			maxAmount = 9
			minAmount = 1
		} else if (startString == 2){
			maxAmount = 99
			minAmount = 10
		} else if (startString == 3){
			maxAmount = 999
			minAmount = 100
		} else if (startString == 4){
			maxAmount = 9999
			minAmount = 1000
		} else if (startString == 5){
			maxAmount = 99999
			minAmount = 10000
		} else if (startString == 6){
			maxAmount = 999999
			minAmount = 100000
		} else if (startString == 7){
			maxAmount = 9999999
			minAmount = 1000000
		} else if (startString == 8){
			maxAmount = 99999999
			minAmount = 10000000
		}

		this.getPartner(maxAmount, minAmount, start, difficulty)
	},

	getPartner: function(max, min, start, difficulty){
    	var partner = Math.floor(Math.random() * max - min) + (min + 1)
    	this.getAnswer(start, partner, difficulty)
    },

    getAnswer: function(start, partner, difficulty){
		var answer = start + partner
		this.splitAnswer(start, partner, answer, difficulty)
	},

	splitAnswer: function(start, partner, answer, difficulty){

		var answerContain = [], 
			answerLength = answer.length
		
		var scramble1 = answer + 1
		var scramble2 = answer + 2
		var scramble3 = answer + 3
		
		answerContain.push(scramble1, scramble2, scramble3, answer)

		// function shuffle(a,b,c,d){
		// 	c=a.length;while(c)b=Math.random()*c--|0,d=a[c],a[c]=a[b],a[b]=d
		// }shuffle(answerContain);

		currentQuestion = start + '+' + partner;
		currentAnswer = start + partner;
		currentChoices = answerContain;

	}

}


module.exports = exportAll;
