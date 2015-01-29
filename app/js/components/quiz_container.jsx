'Use Strict';

var cx = React.addons.classSet;


var ButtonContainer   = require('../components/quiz_buttons.jsx');
var QuestionContainer = require('../components/quiz_question.jsx');
var Score             = require('../components/quiz_score.jsx');
var Timer             = require('../components/quiz_Timer.jsx');
var MenuButton        = require('../components/menu_button.jsx');
var StatContainer     = require('../components/quiz_stats.jsx');


var numberGen         = require('../models/number_gen.js');


var QuizContainer = React.createClass({

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
      <div>

        <div className='gloss'></div>

        <div className={className}>

          <MenuButton onClick={this.menuToggle} />

          <Score currentScore={this.state.score} />
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
          <ButtonContainer onClick={this.submitAnswer} answerList={this.state.answerList} />
        </div>

      </div>
    )
  }

})

module.exports = QuizContainer;