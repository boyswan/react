'Use Strict'

var cx = React.addons.classSet;


var RetryButton = React.createClass({

	render: function(){

	    var style = {
	      height: (window.innerHeight - this.props.height)/4
	    }

	    var retryStyle = cx({
	      "retry-button": true,
	      "retry-button active": this.props.status == 'fail'
	    })

		return(
    		<button style={style} className={retryStyle} onClick={this.props.onClick}>Retry</button>
    	)
	}	
})

module.exports = RetryButton;