'Use Strict';

var ButtonContainer   = require('../components/quiz_buttons.jsx');
var QuestionContainer = require('../components/quiz_question.jsx');
var Score             = require('../components/quiz_score.jsx');
var Timer             = require('../components/quiz_Timer.jsx');
var MenuButton        = require('../components/menu_button.jsx');
var StatContainer     = require('../components/quiz_stats.jsx');


var numberGen         = require('../models/number_gen.js');


var QuizContainer = React.createClass({

  getInitialState: function(){

    numberGen.init('easy', function(question, answer, choices){
      currentQuestion = question
      currentAnswer   = answer
      currentChoices  = choices
    })

    return {
      answerList: currentChoices,
      answerQuestion: currentQuestion,
      correctAnswer: currentAnswer,
      score: 0,
      timer: 5
    }
  }, 

  newQuestion : function(update){

    numberGen.update(update, function(question, answer, choices){
      currentQuestion = question
      currentAnswer   = answer
      currentChoices  = choices
    })

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

  handleClick: function(child){
    child.props.singleAnswer == this.state.correctAnswer ? this.success() : this.fail()
  },

  render: function(){
    return(
      <div>

        <div className='gloss'></div>

        <div className='top-container'>

          <Score currentScore={this.state.score} />
          <MenuButton />
          <Timer timer={this.state.timer} />

          <div className='answer-screen'>
            <div className='section-one'>
              <QuestionContainer answerQuestion={this.state.answerQuestion} />
            </div>

            <div className='section-two'>
              <StatContainer />
            </div>
          </div>

        </div>

        <div className='button-container'>
          <ButtonContainer onClick={this.handleClick} answerList={this.state.answerList} />
        </div>

      </div>
    )
  }

})

module.exports = QuizContainer;