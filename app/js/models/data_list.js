var exportAll = require('../models/number_gen.js');

exportAll.init('medium', function(question, answer, choices){
  currentQuestion = question
  currentAnswer = answer
  currentChoices = choices
})


module.exports = [

    {
        "question" : currentQuestion,

        "answer" : currentChoices,

        "correct" : answer
    }

]