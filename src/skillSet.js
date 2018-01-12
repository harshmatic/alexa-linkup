var checkIntent = require('./utils');
function skillSet() {
    this.getPeople = function (intent, session, response) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            response.tellWithEffects('<speak>People with Skill</speak>');
    }
    this.getSkillLevel = function (intent, session, response) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            response.tellWithEffects('<speak>People skill level</speak>');
    }
    this.getSkill = function (intent, session, response) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            response.tellWithEffects('<speak>Sill of person</speak>');
    }
} 

module.exports = skillSet;