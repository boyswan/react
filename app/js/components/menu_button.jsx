'Use Strict'

var MenuButton = React.createClass({

	handleClick:function(){
		console.log('click')
	},
	
	render: function(){
		return(
    		<div onClick={this.handleClick} className='menu-button'></div>
    	)
	}	
})

module.exports = MenuButton;