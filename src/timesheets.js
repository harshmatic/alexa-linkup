var checkIntent = require('./utils');
function timeSheet() {
    this.pendingTimesheets = function (intent, session, response, requestApi) {
		var speechOut = '';
		var url = 'Timesheet/';
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            if (intent.slots.Name.value.split(' ').length==2) {
			requestApi.get(url+'/'+intent.slots.Name.value+'/pending',function(res){
				if (res) {
					speechOut = speechOut + (res.timesheetCount== 0 ? 'No ': res.timesheetCount) +' timsheet pending for approval ' +intent.slots.Name.value+ '.';
				} else  speechOut = speechOut+'Guess what! Linkup is not working as usual. Try again.';
				response.tellWithEffects('<speak>' + speechOut + '</speak>');
			});
			
			} else response.tellWithEffects('<speak>I want both first and last name to get you the info.</speak>');
    }
	this.unsubmitted = function (intent, session, response, requestApi) {
		var speechOut = '';
		var url = 'Timesheet/';
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            if (intent.slots.Name.value.split(' ').length==2) {
			requestApi.get(url+'/'+intent.slots.Name.value+'/pending for approval',function(res){
				if (res) {
					speechOut = speechOut + (res.timesheetCount== 0 ? 'No ': res.timesheetCount) +' timesheet are yet to be submitted by ' +intent.slots.Name.value+ '.';
				} else  speechOut = speechOut+'Guess what! Linkup is not working as usual. Try again.';
				response.tellWithEffects('<speak>' + speechOut + '</speak>');
			});
			
			} else response.tellWithEffects('<speak>I want both first and last name to get you the info.</speak>');
    }
}

module.exports = timeSheet;