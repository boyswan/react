'Use Strict'


var ButtonContainer = React.createClass({

  handleClick: function(child){
    this.props.onClick(child);
  },

  render: function(){
    var answerList = this.props.answerList.map(function(input, i){
      return <SingleButton key={'button'+i} onClick={this.handleClick} singleAnswer={input}/>
    }.bind(this));
    return <div> {answerList} </div>
  }

})

var SingleButton = React.createClass({

  handleClick: function() {
    this.props.onClick(this);
  }, 

  render: function(){
    return (
      <div>
        <button className='quiz-button' onClick={this.handleClick}>{this.props.singleAnswer}</button>     
      </div>
    )
  }

});

module.exports = ButtonContainer;