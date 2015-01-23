(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// var React 		= require('React');
var QuizContainer     = require('./components/quiz_container.jsx');

React.render(React.createElement(QuizContainer, null), document.getElementById('app'));

},{"./components/quiz_container.jsx":4}],2:[function(require,module,exports){
'Use Strict'


var Timer = React.createClass({displayName: "Timer",

	render: function(){
		return(
    		React.createElement("div", null, this.props.timer)
    	)
	}	
})

module.exports = Timer
},{}],3:[function(require,module,exports){
'Use Strict'

var Quiz  = require('../models/data_list.js');
var rand =  Math.floor((Math.random() * Quiz.length) + 0);

var ButtonContainer = React.createClass({displayName: "ButtonContainer",

  // answerCorrect: function(){
  //   console.log(this.props.children)
  // },

  render: function(){
    var answerList  = this.props.answerList.map(function(input){
      return React.createElement(SingleButton, {onPass: this.answerCorrect, answerList: input})
    }.bind(this))
   
    return React.createElement("div", null, " ", answerList, " ")
  }

})

var SingleButton = React.createClass({displayName: "SingleButton",

  success: function(){
    this.props.answerList == this.props.correctAnswer ? console.log('true') : console.log('false')
  },

  render: function(){
    return (
      React.createElement("button", {className: "raga", onClick: this.success}, " ", this.props.answerList, " ")
    ) 
  }

});



module.exports = ButtonContainer;
},{"../models/data_list.js":7}],4:[function(require,module,exports){
'use strict';

var Data  = require('../models/data_list.js');

var ButtonContainer  = require('../components/quiz_buttons.jsx');
var QuestionContainer = require('../components/quiz_question.jsx');
var Score = require('../components/quiz_score.jsx');
var Timer = require('../components/quiz_Timer.jsx');



var rand =  Math.floor((Math.random() * Data.length) + 0);


var QuizContainer = React.createClass({displayName: "QuizContainer",

  getInitialState: function(){
    return {
      answerList: Data[rand].answer,
      answerQuestion: Data[rand].question,
      correctAnswer: Data[rand].correct,
      score: 0,
      timer: 0
    }
  }, 

  render: function(){
    return(
      React.createElement("div", null, 
        React.createElement(Timer, {timer: this.state.timer}), 
        React.createElement(Score, {currentScore: this.state.score}), 
        React.createElement(QuestionContainer, {answerQuestion: this.state.answerQuestion}), 
        React.createElement(ButtonContainer, {correctAnswer: this.state.correctAnswer, answerList: this.state.answerList})
      )
    )
  }

  
})

module.exports = QuizContainer;
},{"../components/quiz_Timer.jsx":2,"../components/quiz_buttons.jsx":3,"../components/quiz_question.jsx":5,"../components/quiz_score.jsx":6,"../models/data_list.js":7}],5:[function(require,module,exports){
'Use Strict'


var QuestionContainer = React.createClass({displayName: "QuestionContainer",

	render: function(){
		return(
    		React.createElement("div", null, this.props.answerQuestion)
    	)
	}	
})

module.exports = QuestionContainer;
},{}],6:[function(require,module,exports){
'Use Strict'


var Score = React.createClass({displayName: "Score",

	render: function(){
		return(
    		React.createElement("div", null, this.props.currentScore)
    	)
	}	
})

module.exports = Score;
},{}],7:[function(require,module,exports){
var quiz = [

	    {
	      	"question" : "Pick red",

	      	"answer" : [
	      			"yellow",
	      			"red",
	      			"blue",
	      			"green"
	      	],

	      	"correct" : "red"
	    },
	    {
	      	"question" : "Pick cat",

	      	"answer" : [
	      			"dog",
	      			"pig",
	      			"cat",
	      			"frog"
	      	],

	      	"correct" : "cat"
	    },
	    {
	      	"question" : "Pick egg",

	      	"answer" : [
	      			"fish",
	      			"milk",
	      			"pie",
	      			"egg"
	      	],

	      	"correct" : "egg"
	    }

	]

module.exports = quiz;
},{}]},{},[1]);
