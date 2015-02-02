'Use Strict'

var MenuButton = React.createClass({

	handleClick:function(){
    	this.props.onClick(this);
	},
	
	render: function(){
		return(
    		<div onClick={this.handleClick} className='menu-button'></div>
    	)
	}	
})

module.exports = MenuButton;