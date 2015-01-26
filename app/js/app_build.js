(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// var React 		= require('React');
var QuizContainer   = require('./components/quiz_container.jsx');

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


var ButtonContainer = React.createClass({displayName: "ButtonContainer",

  handleClick: function(child){
    this.props.onClick(child);
  },

  render: function(){
    var answerList = this.props.answerList.map(function(input){
      return React.createElement(SingleButton, {key: 'button'+input, onClick: this.handleClick, singleAnswer: input})
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
        React.createElement("button", {className: "raga", onClick: this.handleClick}, this.props.singleAnswer)
    )
  }

});



module.exports = ButtonContainer;
},{}],4:[function(require,module,exports){
'Use Strict';

var Data              = require('../models/data_list.js');

var ButtonContainer   = require('../components/quiz_buttons.jsx');
var QuestionContainer = require('../components/quiz_question.jsx');
var Score             = require('../components/quiz_score.jsx');
var Timer             = require('../components/quiz_Timer.jsx');



var QuizContainer = React.createClass({displayName: "QuizContainer",

  randomNumber: function(){
    return Math.floor((Math.random() * Data.length) + 0);
  },

  getInitialState: function(){
    var rand = this.randomNumber();
    return {
      answerList: Data[rand].answer,
      answerQuestion: Data[rand].question,
      correctAnswer: Data[rand].correct,
      score: 0,
      timer: 30
    }
  }, 

  newQuestion : function(){
    var rand = this.randomNumber();
    return {
      answerList: Data[rand].answer,
      answerQuestion: Data[rand].question,
      correctAnswer: Data[rand].correct,
      timer: 30
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
    this.setState(this.newQuestion());
  },

  fail: function(){
    this.setState(this.getInitialState());
  },

  handleClick: function(child){
    child.props.singleAnswer == this.state.answerList[this.state.correctAnswer-1] ? this.success() : this.fail()
  },

  render: function(){
    return(
      React.createElement("div", null, 
        React.createElement(Timer, {timer: this.state.timer}), 
        React.createElement(Score, {currentScore: this.state.score}), 
        React.createElement(QuestionContainer, {answerQuestion: this.state.answerQuestion}), 
        React.createElement(ButtonContainer, {onClick: this.handleClick, answerList: this.state.answerList})
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
module.exports = [

    {
      	"question" : "Pick red",

      	"answer" : [
      			"yellow",
      			"red",
      			"blue",
      			"green"
      	],

      	"correct" : 2
    },
    {
      	"question" : "Pick cat",

      	"answer" : [
      			"dog",
      			"pig",
      			"cat",
      			"frog"
      	],

      	"correct" : 3
    },
    {
      	"question" : "Pick egg",

      	"answer" : [
      			"fish",
      			"milk",
      			"pie",
      			"egg"
      	],

      	"correct" : 4
    }

]

},{}]},{},[1]);
