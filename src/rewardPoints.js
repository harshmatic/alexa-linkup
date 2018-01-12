var checkIntent = require('./utils');
function rewardPoints(){
    this.topEarners = function(intent, session, response) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            response.tellWithEffects('<speak>Top Earners</speak>');
    }
    this.pointsOf = function(intent, session, response) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            response.tellWithEffects('<speak>Points of</speak>');
    }
    this.goodies = function(intent, session, response) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            response.tellWithEffects('<speak>Your goodies</speak>');
    }
}

module.exports = rewardPoints;