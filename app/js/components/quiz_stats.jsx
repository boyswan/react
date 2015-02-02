'Use Strict'

var StatContainer = React.createClass({

	render: function(){
		return(
    		<div className='quiz-stats'>Best: {this.props.highScore}</div>
    	)
	}	
})

module.exports = StatContainer;