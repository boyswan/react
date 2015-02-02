'Use Strict';

var cx                = React.addons.classSet;
var Velocity          = require('velocity-animate/velocity');
                        require('velocity-animate/velocity.ui');

var NumberGen         = require('../models/number_gen.js');
var ExportScore       = require('../models/score_data.js');

var ButtonContainer   = require('../components/quiz_buttons.jsx');
var QuestionContainer = require('../components/quiz_question.jsx');
var Score             = require('../components/quiz_score.jsx');
var Timer             = require('../components/quiz_Timer.jsx');
var MenuButton        = require('../components/menu_button.jsx');
var StatContainer     = require('../components/quiz_stats.jsx');
var RetryButton       = require('../components/quiz_retry.jsx');


var QuizContainer = React.createClass({

  getDefaultProps: function(){
    return{
      timer: 7
    }
  },

  getInitialState: function(){
    NumberGen.init('easy', function(){})
    ExportScore.scoreData(null, function(){})
    return {
      answerList: currentChoices,
      answerQuestion: currentQuestion,
      correctAnswer: currentAnswer,
      highScore: currentHighscore,
      score: 0,
      timer: this.props.timer,
      menu: 'off',
      status: 'true'
    }
  }, 

  newQuestion : function(update){
    Velocity(dom.querySelectorAll('.quiz-timer'),({ width: '15%' }), this.props.timer*1000);
    Velocity(dom.querySelectorAll('.quiz-question, .quiz-score, .button-text'),'transition.bounceIn', 600);

    NumberGen.update(update, function(){})
    ExportScore.scoreData(null, function(){})
    return {
      answerList: currentChoices,
      answerQuestion: currentQuestion,
      correctAnswer: currentAnswer,
      highScore: currentHighscore,
      timer: this.props.timer
    }
  },

  timeDown: function(){
    this.setState({timer: this.state.timer <= 0 ? this.state.timer = 0 : this.state.timer - 0.01})
    if (this.state.timer <= 0){this.fail()}
  },

  componentDidMount: function(){
    dom = this.getDOMNode()
    Velocity(dom.querySelectorAll('.quiz-timer'),({ width: '15%'}), this.props.timer*1000);
    this.setState({height: this.refs.topContainerHeight.getDOMNode().offsetHeight})
    this.interval = setInterval(this.timeDown, 10);
  },

  success: function(){
    Velocity(dom.querySelectorAll('.quiz-timer'),'stop');
    Velocity(dom.querySelectorAll('.quiz-timer'),({ width: '100%' }), 50);
    this.setState({score: this.state.score + 1})
    this.setState(this.newQuestion(this.state.correctAnswer));

    ExportScore.speedData((this.props.timer-this.state.timer).toFixed(2));
  },

  fail: function(){
    this.setState({status: 'fail'});
    Velocity(dom.querySelectorAll('.quiz-timer'),'stop');
    Velocity(dom.querySelectorAll('.quiz-timer'),({ width: '0%'}), 600);
    Velocity(dom.querySelectorAll('.button-container'),'transition.fadeOut', 600);


    // ExportScore.scoreData(this.state.score);
    this.setState({answerQuestion: 'Score: '+this.state.score});


    clearInterval(this.interval);
    Velocity(dom.querySelectorAll('.quiz-question'),'transition.fadeIn', 1000);
    Velocity(dom.querySelectorAll('.retry-button'),'transition.bounceIn', 600);
  },

  retry: function(){
    Velocity(dom.querySelectorAll('.quiz-timer'),({ width: '100%' }), 50);
    this.setState(this.getInitialState());
    this.interval = setInterval(this.timeDown, 1000);

    Velocity(dom.querySelectorAll('.quiz-timer'),({ width: '15%'}), this.props.timer*1000);
    Velocity(dom.querySelectorAll('.button-container'),'transition.fadeIn', 600);
    Velocity(dom.querySelectorAll('.retry-button'),'transition.fadeOut', 400);
  },

  submitAnswer: function(child){
    child.props.singleAnswer == this.state.correctAnswer ? this.success() : this.fail()
  },

  menuToggle: function(){

    if (this.state.menu == 'off'){
      Velocity(dom.querySelectorAll('.top-container'),({ translateX: ['-85%', [90,10]] }), 600);
      if (this.state.status == 'fail'){
        Velocity(dom.querySelectorAll('.retry-button'),'transition.fadeOut', 300);
      }
      this.setState({menu: 'on'})
    }  

    if (this.state.menu == 'on'){
      Velocity(dom.querySelectorAll('.top-container'),({ translateX: ['0%', [90,10]] }), 600);
      if (this.state.status == 'fail'){
        Velocity(dom.querySelectorAll('.retry-button'),'transition.bounceIn', 600);
      }
      this.setState({menu: 'off'})
    }

  },

  render: function(){

    var buttonStyle = cx({
      "button-container": this.state.status == 'true',
      "button-container freeze": this.state.status == 'fail'
    });

    return(

      <div>

        <div className='gloss'></div>

        <div ref="topContainerHeight" className='top-container'>

          <MenuButton onClick={this.menuToggle} />
          <Score currentScore={this.state.score} />
          <Timer timer={this.state.timer} />

          <div className='answer-screen'>

            <div className='section-one'>
              <QuestionContainer answerQuestion={this.state.answerQuestion} />
            </div>

            <div className='section-two'>
              <StatContainer highScore={this.state.highScore}/>
            </div>

          </div>

        </div>

        <RetryButton height={this.state.height} status={this.state.status} onClick={this.retry} />

        <div className={buttonStyle}>
          <ButtonContainer height={this.state.height} onClick={this.submitAnswer} answerList={this.state.answerList} />
        </div>

      </div>
    )
  }

})

module.exports = QuizContainer;