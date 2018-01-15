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
		var url = 'Leave/';
        //if (checkIntent(intent)){
			if (intent.slots.Name.value.split(' ').length==2) {
			requestApi.get(url+'/'+intent.slots.Name.value+'/'+'01-01-2018',function(res){
				if (res) {
					if (res.isOnLeave)
					speechOut = speechOut + 'Yes, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ') + 'is on ' + res.leaveType + '.';
				else {
					speechOut = speechOut + 'No, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ');
						if (res.isSmoker) speechOut = speechOut + ' Must be smoking on terrace.';
						else if (res.isPoolPlayer) speechOut = speechOut + ' Must be at the snooker table.';
						else speechOut = speechOut + ' Must be taking nap on terrace.';
					}
				} else  speechOut = speechOut+'Guess what! Linkup is not working as usual. Try again.';
				response.tellWithEffects('<speak>' + speechOut + '</speak>');
			});
			
			} else response.tellWithEffects('<speak>I want both first and last name to get you the info.</speak>');
			//}
		//else response.askWithEffects('<speak>Sorry I could not understand. Please repeat.</speak>','Please repeat.');

        
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