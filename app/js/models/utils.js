'use strict';

var Data  = require('./data_list.js');


module.exports = function() {
    return Math.floor((Math.random() * Data.quiz.length) + 0);
};

