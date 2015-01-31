'Use Strict';

var cx                = React.addons.classSet;
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

  getDefaultProps: function(){
    return{
      timer: 7
    }
  },

  getInitialState: function(){
    NumberGen.init('easy', function(){})
    return {
      answerList: currentChoices,
      answerQuestion: currentQuestion,
      correctAnswer: currentAnswer,
      score: 0,
      timer: this.props.timer,
      menu: 'off',
    }
  }, 

  newQuestion : function(update){
    Velocity(this.getDOMNode().querySelectorAll('.quiz-timer'),({ width: '15%' }), this.props.timer*1000);
    Velocity(this.getDOMNode().querySelectorAll('.quiz-question, .quiz-score'),'transition.bounceIn', 600);
    NumberGen.update(update, function(){})
    return {
      answerList: currentChoices,
      answerQuestion: currentQuestion,
      correctAnswer: currentAnswer,
      timer: this.props.timer
    }
  },

  timeDown: function(){
    this.setState({timer: this.state.timer <= 0 ? this.state.timer = 0 : this.state.timer - 1})
    if (this.state.timer <= 0){this.fail()}
  },

  componentDidMount: function(){
    Velocity(this.getDOMNode().querySelectorAll('.quiz-timer'),({ width: '15%'}), this.props.timer*1000);
    setInterval(this.timeDown, 1000);
  },

  resetInfo:function(){
    Velocity(this.getDOMNode().querySelectorAll('.answer-screen, .button-container'),'transition.fadeIn', { 
      duration: 200, complete: function() { 
        console.log("Done animating the scale property.")}
    });
  },

  success: function(){
    var dom = this.getDOMNode()
    Velocity(dom.querySelectorAll('.quiz-timer'),'stop');
    Velocity(dom.querySelectorAll('.quiz-timer'),({ width: '100%' }), 50);
    this.setState({score: this.state.score + 1})
    this.setState(this.newQuestion(this.state.correctAnswer));
  },

  fail: function(){

    Velocity(this.getDOMNode().querySelectorAll('.quiz-timer'),'stop');
    Velocity(this.getDOMNode().querySelectorAll('.quiz-timer'),({ width: '0%'}), 600);
    Velocity(this.getDOMNode().querySelectorAll('.button-container'),'transition.fadeOut', 600);
    this.setState(this.getInitialState());
  },

  submitAnswer: function(child){
    child.props.singleAnswer == this.state.correctAnswer ? this.success() : this.fail()
  },

  menuToggle: function(){

    if (this.state.menu == 'off'){
      Velocity(this.getDOMNode().querySelectorAll('.top-container'),({ translateX: ['-85%', [90,10]] }), 600);
      this.setState({menu: 'on'})
    }  

    if (this.state.menu == 'on'){
      Velocity(this.getDOMNode().querySelectorAll('.top-container'),({ translateX: ['0%', [90,10]] }), 600);
      this.setState({menu: 'off'})
    }

  },

  render: function(){

    var buttonStyle = cx({
      "button-container": true,
      "button-container freeze": this.state.timer <= 0
    });

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

        <div className={buttonStyle}>
          <ButtonContainer onClick={this.submitAnswer} answerList={this.state.answerList} />
        </div>

      </div>
    )
  }

})

module.exports = QuizContainer;