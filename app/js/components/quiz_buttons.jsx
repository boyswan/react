'Use Strict'

var Quiz  = require('../models/data_list.js');
var rand =  Math.floor((Math.random() * Quiz.length) + 0);

var ButtonContainer = React.createClass({

  // answerCorrect: function(){
  //   console.log(this.props.children)
  // },

  render: function(){
    var answerList  = this.props.answerList.map(function(input){
      return <SingleButton onPass={this.answerCorrect} answerList={input}/>
    }.bind(this))
   
    return <div> {answerList} </div>
  }

})

var SingleButton = React.createClass({

  success: function(){
    this.props.answerList == this.props.correctAnswer ? console.log('true') : console.log('false')
  },

  render: function(){
    return (
      <button className='raga' onClick={this.success}> {this.props.answerList} </button>
    ) 
  }

});



module.exports = ButtonContainer;