var checkIntent = require('./utils');
function timeSheet() {
    this.pendingTimesheets = function (intent, session, response) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            response.tellWithEffects('<speak>Timesheet</speak>');
    }
}

module.exports = timeSheet;