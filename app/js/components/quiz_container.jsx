'use strict';

var Data  = require('../models/data_list.js');

var ButtonContainer  = require('../components/quiz_buttons.jsx');
var QuestionContainer = require('../components/quiz_question.jsx');
var Score = require('../components/quiz_score.jsx');
var Timer = require('../components/quiz_Timer.jsx');



var rand =  Math.floor((Math.random() * Data.length) + 0);


var QuizContainer = React.createClass({

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
      <div>
        <Timer timer={this.state.timer} />
        <Score currentScore={this.state.score} />
        <QuestionContainer answerQuestion={this.state.answerQuestion} />
        <ButtonContainer correctAnswer={this.state.correctAnswer} answerList={this.state.answerList} />
      </div>
    )
  }

  
})

module.exports = QuizContainer;