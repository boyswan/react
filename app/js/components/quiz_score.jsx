'Use Strict'


var Score = React.createClass({

	render: function(){
		return(
    		<div>{this.props.currentScore}</div>
    	)
	}	
})

module.exports = Score;