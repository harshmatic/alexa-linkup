// JavaScript File
var checkIntent = require('./utils');
var getDates = require('./convertDate');
var speechOut = '';
var moment = require('./moment');
function leave() {

    this.handleLeavePlans = function (intent, session, response, requestApi) {
        speechOut = '';
        var url = 'Leave';

        var dates = getDates(intent.slots.TimeDate.value);
        console.log('In Intent');
        try {
            if (intent.slots.Name.value.split(' ').length == 2) {
                requestApi.get(url + '/' + intent.slots.Name.value + '/' + dates[0] + '/' + dates[1], function (res) {
                    console.log('Api Hit');
                    if (res) {
                        if (res.errorMsg) {
                            speechOut = speechOut + res.errorMsg;
                        } else {
                            if (res.empLeaveDetails) {
                                speechOut = speechOut + 'Yes, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ') + 'is on ';
                                res.empLeaveDetails.forEach(function (item) {
                                    speechOut = speechOut + item.type + ' ';
                                    if (item.startDate == item.endDate)
                                        speechOut = speechOut + 'for ' + ' <say-as interpret-as="date">' + item.startDate + '</say-as>. ';
                                    else
                                        speechOut = speechOut + 'from ' + ' <say-as interpret-as="date">' + item.startDate + '</say-as> to  <say-as interpret-as="date">' + item.endDate + '</say-as>. ';
                                });
                            }
                            else {
                                speechOut = speechOut + 'No, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ') + ' will be working.';
                            }
                        }

                    } else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';

                    response.tellWithEffects('<speak>' + speechOut + '</speak>');
                });

            } else response.tellWithEffects('<speak>I am not able to get the full name. please try again.</speak>');
        } catch (err) {
            speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
            response.tellWithEffects('<speak>' + speechOut + '</speak>');
        }
        //console.log(speechOut);
        //response.tellWithEffects('<speak>' + speechOut + '</speak>');
    }
    this.handleLeaveToday = function (intent, session, response, requestApi) {
        speechOut = '';
        var url = 'Leave';
        var StartDate = moment();
        StartDate = moment(StartDate).format('YYYY-MM-DD');
        //if (checkIntent(intent)){
        try {
            if (intent.slots.Name.value.split(' ').length == 2) {
                requestApi.get(url + '/' + intent.slots.Name.value + '/' + StartDate, function (res) {
                    if (res) {
                        if (res.errorMsg) {
                            speechOut = speechOut + res.errorMsg;
                        } else {
                            if (res.isOnLeave)
                                speechOut = speechOut + 'Yes, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ') + 'is on ' + res.leaveType + '.';
                            else {
                                speechOut = speechOut + 'No, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ');
                                if (res.isSmoker) speechOut = speechOut + ' Must be smoking on terrace.';
                                else if (res.isPoolPlayer) speechOut = speechOut + ' Must be at the snooker table.';
                                else speechOut = speechOut + ' Must be taking nap on terrace.';
                            }
                        }
                    } else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
                    response.tellWithEffects('<speak>' + speechOut + '</speak>');
                });

            } else response.tellWithEffects('<speak>I am not able to get the full name. please try again.</speak>');
            //}
            //else response.askWithEffects('<speak>Sorry I could not understand. Please repeat.</speak>','Please repeat.');
        } catch (err) {
            speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
            response.tellWithEffects('<speak>' + speechOut + '</speak>');
        }

    }

    this.handleLeaveOn = function (intent, session, response, requestApi) {
        speechOut = '';
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else {
            if (res.isOnLeave)
                speechOut = speechOut + 'Yes, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ') + 'is on ' + res.leaveType + 'for ' + intent.slots.TimeDate.value + '.';
            else {
                speechOut = speechOut + 'No, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ') + ' is working on' + intent.slots.TimeDate.value + '.';

            }
        }
        response.tellWithEffects('<speak>' + speechOut + '</speak>');
    }


}

module.exports = leave;