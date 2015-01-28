'Use Strict'

var Timer = React.createClass({

	render: function(){
		return(
        	<div className='quiz-timer'>{this.props.timer}</div>
    	)
	}	
})

module.exports = Timer


