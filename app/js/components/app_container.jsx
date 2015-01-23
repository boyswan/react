'use strict';

// var React 		= require('React');
var QuestionContainer  = require('./quiz_container.jsx');


var QuizApp = React.createClass({

  render: function(){
    return(
      <div>
        <QuestionContainer />
      </div>
    )

  }

})


module.exports = QuizApp;