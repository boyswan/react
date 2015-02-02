'Use Strict'

var Score = React.createClass({

	render: function(){
		return(
    		<div className='quiz-score'>{this.props.currentScore}</div>
    	)
	}	
})

module.exports = Score;