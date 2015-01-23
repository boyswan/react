var Avatar = React.createClass({

  handleClick: function () {
  	console.log('TEST');
  },

  render: function() {
    return (
      <div>
        <ProfilePic onClick={this.handleClick} />
      </div>
    );
  }

});

var ProfilePic = React.createClass({

  handleClick: function () {
    this.props.onClick(this);
  },

  render: function() {
    return (
      <img onClick={this.handleClick} src={'gag'} />
    );
  }

});



React.render(
  <Avatar username="jackwboyce" />,
  document.getElementById('app')
);
