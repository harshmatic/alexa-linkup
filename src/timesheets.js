var checkIntent = require('./utils');
function timeSheet() {
	this.pendingTimesheets = function (intent, session, response, requestApi) {
		var speechOut = '';
		var url = 'Timesheet/';
		try {
			if (intent.slots.Name.value.split(' ').length == 2) {
				requestApi.get(url + '/' + intent.slots.Name.value + '/pending for approval', function (res) {
					if (res) {
						if (res.errorMsg) {
							speechOut = speechOut + res.errorMsg;
						} else {
							speechOut = speechOut + (res.timesheetCount == 0 ? 'No ' : res.timesheetCount) + ' timesheet pending for approval of ' + intent.slots.Name.value + '.';
						}
					} else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
					response.tellWithEffects('<speak>' + speechOut + '</speak>');
				});

			} else response.tellWithEffects('<speak>I am not able to get the full name. please try again.</speak>');
		} catch (err) {
			speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
			response.tellWithEffects('<speak>' + speechOut + '</speak>');
		}
	}
	this.unsubmitted = function (intent, session, response, requestApi) {
		var speechOut = '';
		var url = 'Timesheet/';
		try {
			if (intent.slots.Name.value.split(' ').length == 2) {
				requestApi.get(url + '/' + intent.slots.Name.value + '/pending', function (res) {
					if (res) {
						if (res.errorMsg) {
							speechOut = speechOut + res.errorMsg;
						} else {
							speechOut = speechOut + (res.timesheetCount == 0 ? 'No ' : res.timesheetCount) + ' timesheet are yet to be submitted by ' + intent.slots.Name.value + '.';
						}
					} else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
					response.tellWithEffects('<speak>' + speechOut + '</speak>');
				});

			} else response.tellWithEffects('<speak>I am not able to get the full name. please try again.</speak>');
		} catch (err) {
			speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
			response.tellWithEffects('<speak>' + speechOut + '</speak>');
		}
	}
}
module.exports = timeSheet;