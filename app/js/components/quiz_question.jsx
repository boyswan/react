'Use Strict'

var QuestionContainer = React.createClass({

	render: function(){
		return(
    		<div className='quiz-question'>{this.props.answerQuestion}</div>
    	)
	}	
})

module.exports = QuestionContainer;