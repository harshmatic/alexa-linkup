var checkIntent = require('./utils');
var url ='Skills';
function skillSet() {
    this.getPeople = function (intent, session, response, requestApi) {
        var speechOut = '';
        try {
            requestApi.get(url + '/GetCountBySkill/' + intent.slots.Skills.value, function (res) {
                if (res) {
                    if (res.errorMsg) {
						speechOut = speechOut + res.errorMsg;
					} else {
							speechOut = speechOut + res.empCountHavingSpecifiedSkill + ' employees has ' + intent.slots.Skills.value + ' skill. ';
					}
                } else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
                response.tellWithEffects('<speak>' + speechOut + '</speak>');
            });
        } catch (err) {
            speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
            response.tellWithEffects('<speak>' + speechOut + '</speak>');
        }
    }
    this.getSkillLevel = function (intent, session, response, requestApi) {
        var speechOut = '';
        try {
            requestApi.get(url + '/EmployeeSkill/' + intent.slots.Name.value +'/'+intent.slots.Skills.value , function (res) {
                if (res) {
                    if (res.errorMsg) {
						speechOut = speechOut + res.errorMsg;
					} else {
                        if(res.doesHaveSpecifiedSkill)
							speechOut = speechOut + intent.slots.Name.value +' is ' + res.skillLevel +' in '+intent.slots.Skills.value;
					}
                } else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
                response.tellWithEffects('<speak>' + speechOut + '</speak>');
            });
        } catch (err) {
            speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
            response.tellWithEffects('<speak>' + speechOut + '</speak>');
        }
    }
    this.getSkill = function (intent, session, response, requestApi) {
        var speechOut = '';
        try {
            requestApi.get(url + '/EmployeeSkill/' + intent.slots.Name.value +'/'+intent.slots.Skills.value+'/'+intent.slots.SkillLevel.value , function (res) {
                if (res) {
                } else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
                response.tellWithEffects('<speak>' + speechOut + '</speak>');
            });
        } catch (err) {
            speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
            response.tellWithEffects('<speak>' + speechOut + '</speak>');
        }
    }
}

module.exports = skillSet;