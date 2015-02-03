'Use Strict'

var cx = React.addons.classSet;

var StatContainer = React.createClass({

	render: function(){

	    var statStyle = cx({
			"secondary-stats": true
	    })

		return(
    		<div className='quiz-stats'>
	    		Top Score: {this.props.highScore} <br />
	    		<div className={statStyle}>
		    		Average Score: {isNaN(this.props.avScore) ? this.props.avScore = 0 : this.props.avScore = this.props.avScore} <br />
		    		Average Click: {isNaN(this.props.avTime) ? this.props.avTime = 0 : this.props.avTime = this.props.avTime}s
		    	</div>
    		</div>

    	)
	}	
})

module.exports = StatContainer;