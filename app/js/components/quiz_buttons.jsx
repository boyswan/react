'Use Strict'


var ButtonContainer = React.createClass({

  handleClick: function(child){
    this.props.onClick(child);
  },

  render: function(){
    var answerList = this.props.answerList.map(function(input){
      return <SingleButton key={'button'+input} onClick={this.handleClick} singleAnswer={input}/>
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
        <button className='raga' onClick={this.handleClick}>{this.props.singleAnswer}</button>
    )
  }

});



module.exports = ButtonContainer;