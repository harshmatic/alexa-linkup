var checkIntent = require('./utils');
varurl = 'RnR/';
function rewardPoints(){
    this.topEarners = function(intent, session, response, requestApi) {
	var speechout = '';
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
		if (intent.slots.Name.value.split(' ').length==2) {
			requestApi.get(url+'/'+intent.slots.Name.value,function(res){
				if (res) {
					if (res.balance<30) {
						speechout = speechout + "<say-as interpret-as='interjection'>aiyo.</say-as> You only have "+res.balance+" points. you cant't even buy a pen."
					} else if (res.balance>30 && res.balance<2000) {
						speechout = speechout + "<say-as interpret-as='interjection'>waaaah.</say-as> You have "+res.balance+" points. you can buy."
						if (res.itemNames.length) {
							res.itemNames.forEach(function(a) {
							speechout = speechout + a.itemName +'.';
							});
						}
					} else if (res.balance>2000) {
						speechout = speechout + "<say-as interpret-as='interjection'>baap re.</say-as> You have "+res.balance+" points. you can buy."
						if (res.itemNames.length) {
							res.itemNames.forEach(function(a) {
							speechout = speechout + a.itemName +'.';
							});
						}
					}

				} else  speechout = speechout+'Guess what! Linkup is not working as usual. Try again.';
				response.tellWithEffects('<speak>' + speechout + '</speak>');
			});
    }
	}
    this.pointsOf = function(intent, session, response, requestApi) {
	var speechout= '';
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            if (intent.slots.Name.value.split(' ').length==2) {
			requestApi.get(url+'/'+intent.slots.Name.value,function(res){
				if (res) {
					if (res.balance<30) {
						speechout = speechout + "<say-as interpret-as='interjection'>aiyo.</say-as> You only have "+res.balance+" points. you can buy even buy a pen."
					} else if (res.balance>30 && res.balance<2000) {
						speechout = speechout + "<say-as interpret-as='interjection'>waaaah.</say-as> You have "+res.balance+" points. you can buy."
						if (res.itemNames.length) {
							res.itemNames.forEach(function(a) {
							speechout = speechout + a.itemName +'.';
							});
						}
					} else if (res.balance>2000) {
						speechout = speechout + "<say-as interpret-as='interjection'>baap re.</say-as> You have "+res.balance+" points. you can buy."
						if (res.itemNames.length) {
							res.itemNames.forEach(function(a) {
							speechout = speechout + a.itemName +'.';
							});
						}
					}

				} else  speechout = speechout+'Guess what! Linkup is not working as usual. Try again.';
				response.tellWithEffects('<speak>' + speechout + '</speak>');
			});
    }
    }
    this.goodies = function(intent, session, response) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            response.tellWithEffects('<speak>Your goodies</speak>');
    }
	this.transfer = function(intent, session, response, req) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            response.tellWithEffects('<speak><say-as interpret-as="interjection">woo hoo.</say-as> Points Transferd.</speak>');
    }
}

module.exports = rewardPoints;