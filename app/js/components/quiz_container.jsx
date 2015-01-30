'Use Strict';

var NumberGen         = require('../models/number_gen.js');
var Velocity          = require('velocity-animate/velocity');
                        require('velocity-animate/velocity.ui');

var ButtonContainer   = require('../components/quiz_buttons.jsx');
var QuestionContainer = require('../components/quiz_question.jsx');
var Score             = require('../components/quiz_score.jsx');
var Timer             = require('../components/quiz_Timer.jsx');
var MenuButton        = require('../components/menu_button.jsx');
var StatContainer     = require('../components/quiz_stats.jsx');




var QuizContainer = React.createClass({

  getInitialState: function(){
    NumberGen.init('easy', function(){})
    return {
      answerList: currentChoices,
      answerQuestion: currentQuestion,
      correctAnswer: currentAnswer,
      score: 0,
      timer: 5,
      menu: 'off',
    }
  }, 

  newQuestion : function(update){
    Velocity(this.getDOMNode().querySelectorAll('.quiz-question, .quiz-score'),'transition.bounceIn', 500);
    NumberGen.update(update, function(){})
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

  resetInfo:function(){
    Velocity(this.getDOMNode().querySelectorAll('.answer-screen, .button-container'),'transition.fadeIn', { 
      duration: 200, complete: function() { 
        console.log("Done animating the scale property.")}
    });
  },

  fail: function(){

    // Velocity(this.getDOMNode().querySelectorAll('.answer-screen, .button-container'),'transition.fadeOut', { 
    //   duration: 200, complete: function() { 
    //     console.log("Done animating the scale property.")}
    // });
    // this.resetInfo();
    this.setState(this.getInitialState());

  },

  submitAnswer: function(child){
    child.props.singleAnswer == this.state.correctAnswer ? this.success() : this.fail()
  },

  menuToggle: function(){
    var menu = this.state.menu

    if (menu == 'off'){
      Velocity(this.getDOMNode().querySelectorAll('.top-container'),({ translateX: ['-85%', [90,10]] }), 400);
      this.setState({menu: 'on'})
    }  

    if (menu == 'on'){
      Velocity(this.getDOMNode().querySelectorAll('.top-container'),({ translateX: ['0%', [90,10]] }), 400);
      this.setState({menu: 'off'})
    }

  },

  render: function(){
    return(

      <div>

        <div className='gloss'></div>

        <div className='top-container'>

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