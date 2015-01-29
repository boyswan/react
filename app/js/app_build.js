(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// var React 		= require('React');
var QuizContainer   = require('./components/quiz_container.jsx');

React.render(React.createElement(QuizContainer, null), document.getElementById('app'));


},{"./components/quiz_container.jsx":5}],2:[function(require,module,exports){
'Use Strict'

var MenuButton = React.createClass({displayName: "MenuButton",

	handleClick:function(){
    	this.props.onClick(this);
	},
	
	render: function(){
		return(
    		React.createElement("div", {onClick: this.handleClick, className: "menu-button"})
    	)
	}	
})

module.exports = MenuButton;

},{}],3:[function(require,module,exports){
'Use Strict'

var Timer = React.createClass({displayName: "Timer",

	render: function(){
		return(
			React.createElement("div", null, 
        		React.createElement("div", {className: "quiz-timer-base"}), 
        		React.createElement("div", {className: "quiz-timer"})
        	)
    	)
	}	
})

module.exports = Timer




},{}],4:[function(require,module,exports){
'Use Strict'


var ButtonContainer = React.createClass({displayName: "ButtonContainer",

  handleClick: function(child){
    this.props.onClick(child);
  },

  render: function(){
    var answerList = this.props.answerList.map(function(input, i){
      return React.createElement(SingleButton, {key: 'button'+i, onClick: this.handleClick, singleAnswer: input})
    }.bind(this));
    return React.createElement("div", null, " ", answerList, " ")
  }

})

var SingleButton = React.createClass({displayName: "SingleButton",

  handleClick: function() {
    this.props.onClick(this);
  }, 

  render: function(){
    return (
        React.createElement("button", {className: "quiz-button", onClick: this.handleClick}, this.props.singleAnswer)
    )
  }

});

module.exports = ButtonContainer;

},{}],5:[function(require,module,exports){
'Use Strict';

var cx = React.addons.classSet;


var ButtonContainer   = require('../components/quiz_buttons.jsx');
var QuestionContainer = require('../components/quiz_question.jsx');
var Score             = require('../components/quiz_score.jsx');
var Timer             = require('../components/quiz_Timer.jsx');
var MenuButton        = require('../components/menu_button.jsx');
var StatContainer     = require('../components/quiz_stats.jsx');


var numberGen         = require('../models/number_gen.js');


var QuizContainer = React.createClass({displayName: "QuizContainer",

  getDefaultProps: function(){
    return{
      menuOpen: null
    }
  },

  getInitialState: function(){
    numberGen.init('easy', function(){})
    return {
      answerList: currentChoices,
      answerQuestion: currentQuestion,
      correctAnswer: currentAnswer,
      score: 0,
      menu: false,
      timer: 5
    }
  }, 

  newQuestion : function(update){
    numberGen.update(update, function(){})
    return {
      answerList: currentChoices,
      answerQuestion: currentQuestion,
      correctAnswer: currentAnswer,
      timer: 5
    }
  },

  timeDown: function(){
    this.setState({timer: this.state.timer <= 0 ? this.state.timer = 0 : this.state.timer - 1})
    if (this.state.timer <= 0){this.fail()}
  },

  componentDidMount: function(){
    setInterval(this.timeDown, 1000);
  },

  success: function(){
    this.setState({score: this.state.score + 1})
    this.setState(this.newQuestion(this.state.correctAnswer));
  },

  fail: function(){
    this.setState(this.getInitialState());
  },

  submitAnswer: function(child){
    child.props.singleAnswer == this.state.correctAnswer ? this.success() : this.fail()
  },

  menuToggle: function(){
    this.props.menuOpen == 'on' ? this.props.menuOpen = 'off' : this.props.menuOpen = 'on';
  },

  render: function(){

    var className = cx({
      "top-container": true,
      "top-container open": this.props.menuOpen == 'on',
      "top-container close": this.props.menuOpen == 'off'
    });

    return(
      React.createElement("div", null, 

        React.createElement("div", {className: "gloss"}), 

        React.createElement("div", {className: className}, 

          React.createElement(MenuButton, {onClick: this.menuToggle}), 

          React.createElement(Score, {currentScore: this.state.score}), 
          React.createElement(Timer, {timer: this.state.timer}), 

          React.createElement("div", {className: "answer-screen"}, 

            React.createElement("div", {className: "section-one"}, 
              React.createElement(QuestionContainer, {answerQuestion: this.state.answerQuestion})
            ), 

            React.createElement("div", {className: "section-two"}, 
              React.createElement(StatContainer, null)
            )

          )

        ), 

        React.createElement("div", {className: "button-container"}, 
          React.createElement(ButtonContainer, {onClick: this.submitAnswer, answerList: this.state.answerList})
        )

      )
    )
  }

})

module.exports = QuizContainer;

},{"../components/menu_button.jsx":2,"../components/quiz_Timer.jsx":3,"../components/quiz_buttons.jsx":4,"../components/quiz_question.jsx":6,"../components/quiz_score.jsx":7,"../components/quiz_stats.jsx":8,"../models/number_gen.js":9}],6:[function(require,module,exports){
'Use Strict'

var QuestionContainer = React.createClass({displayName: "QuestionContainer",

	render: function(){
		return(
    		React.createElement("div", {className: "quiz-question"}, this.props.answerQuestion)
    	)
	}	
})

module.exports = QuestionContainer;

},{}],7:[function(require,module,exports){
'Use Strict'

var Score = React.createClass({displayName: "Score",

	render: function(){
		return(
    		React.createElement("div", {className: "quiz-score"}, this.props.currentScore)
    	)
	}	
})

module.exports = Score;

},{}],8:[function(require,module,exports){
'Use Strict'

var StatContainer = React.createClass({displayName: "StatContainer",

	render: function(){
		return(
    		React.createElement("div", {className: "quiz-stats"}, "test")
    	)
	}	
})

module.exports = StatContainer;

},{}],9:[function(require,module,exports){
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

		function shuffle(a,b,c,d){
			c=a.length;while(c)b=Math.random()*c--|0,d=a[c],a[c]=a[b],a[b]=d
		}shuffle(answerContain);


		currentQuestion = start + '+' + partner;
		currentAnswer = start + partner;
		currentChoices = answerContain;

	}

}


module.exports = exportAll;


},{}]},{},[1]);
