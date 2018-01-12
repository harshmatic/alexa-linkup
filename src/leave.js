var checkIntent = require('./utils');
var res = {
    isOnLeave: true,
    leaveType: 'Leave',
    isToday: false,
    isSmoker: true,
    isPoolPlayer: true,
    gender: 'Female'
};
var res1= 
{
    "empLeaveDetails": [
        {
            "startDate": "5/8/2017",
            "endDate": "5/12/2017",
            "type": "Leave",
            "status": "Approved"
        },
        {
            "startDate": "5/5/2017",
            "endDate": "5/5/2017",
            "type": "Leave",
            "status": "Approved"
        },
        {
            "startDate": "5/31/2017",
            "endDate": "5/31/2017",
            "type": "Leave",
            "status": "Approved"
        }
    ],
    "gender": "Female"
}
var speechOut = '';
function leave() {
    this.handleLeaveToday = function (intent, session, response, requestApi) {
        speechOut = '';
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else {
            if (res.isOnLeave)
                speechOut = speechOut + 'Yes, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ') + 'is on ' + res.leaveType + '.';
            else {
                speechOut = speechOut + 'No, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ');
                if (res.isSmoker) speechOut = speechOut + ' Must be smoking on terrace.';
                else if (res.isPoolPlayer) speechOut = speechOut + ' Must be at the snooker table.';
                else speechOut = speechOut + ' Must be taking nap on terrace.';

            }
        }
        response.tellWithEffects('<speak>' + speechOut + '</speak>');
    }

    this.handleLeaveOn = function (intent, session, response, requestApi) {
        speechOut = '';
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else {
            if (res.isOnLeave)
                speechOut = speechOut + 'Yes, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ') + 'is on ' + res.leaveType + 'for '+intent.slots.TimeDate.value+'.';
            else {
                speechOut = speechOut + 'No, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ')+' is working on'+intent.slots.TimeDate.value+'.';

            }
        }
        response.tellWithEffects('<speak>' + speechOut + '</speak>');
    }

    this.handleLeavePlans = function (intent, session, response, requestApi) {
        speechOut = '';
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
        speechOut = speechOut+(res.gender.toLowerCase() == 'female' ? 'She ' : 'He ')+ 'is ';
        res1.empLeaveDetails.forEach(function(leave,index) {
            speechOut = speechOut+ + 'on' +leave.type + ' from <say-as interpret-as="date"> '+leave.startDate+'</say-as> to ' +leave.endDate;
            res1.empLeaveDetails.length == index+1 ? (speechOut = speechOut+ '.') : (speechOut = speechOut+ ', and ')
        });
            response.tellWithEffects('<speak>'+speechOut+'</speak>');
    }

}

module.exports = leave;