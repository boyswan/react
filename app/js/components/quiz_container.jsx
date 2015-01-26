'Use Strict';

var Data              = require('../models/data_list.js');

var ButtonContainer   = require('../components/quiz_buttons.jsx');
var QuestionContainer = require('../components/quiz_question.jsx');
var Score             = require('../components/quiz_score.jsx');
var Timer             = require('../components/quiz_Timer.jsx');



var QuizContainer = React.createClass({

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
      <div>
        <Timer timer={this.state.timer} />
        <Score currentScore={this.state.score} />
        <QuestionContainer answerQuestion={this.state.answerQuestion} />
        <ButtonContainer onClick={this.handleClick} answerList={this.state.answerList} />
      </div>
    )
  }

})

module.exports = QuizContainer;