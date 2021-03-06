'Use Strict'

var ButtonContainer = React.createClass({

  handleClick: function(child){
    this.props.onClick(child);
  },

  render: function(){

    var answerList = this.props.answerList.map(function(input, i){
      return <SingleButton height={this.props.height} className={'button'+(i+1)} key={'button'+i} onClick={this.handleClick} singleAnswer={input}/>
    }.bind(this));

    return (
      <div> {answerList} </div>
    )
  }

})

var SingleButton = React.createClass({

  handleClick: function() {
    this.props.onClick(this);
  }, 

  render: function(){
    var style = {
      height: (window.innerHeight - this.props.height)/4
    }

    return (
      <div>
        <button style={style} className={this.props.className} onClick={this.handleClick}>
          <span className='button-text'>{this.props.singleAnswer}</span>
        </button>     
      </div>
    )
  }

});

module.exports = ButtonContainer;