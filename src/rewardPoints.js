var checkIntent = require('./utils');
var url = 'RnR';
function rewardPoints() {
	this.topEarners = function (intent, session, response, requestApi) {
		var speechOut = '';
		var rank = intent.slots.TopNumber.value ? intent.slots.TopNumber.value : '1';
		try {
			requestApi.get(url + '/Rank/' + rank, function (res) {
				if (res) {
					if (res.errorMsg) {
						speechOut = speechOut + res.errorMsg;
					} else {
						res.items.forEach(function (item) {
							speechOut = speechOut + item.employee.Name + ' has ' + item.balance + ' points. ';
						})
					}

				} else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
				response.tellWithEffects('<speak>' + speechOut + '</speak>');
			});
		} catch (err) {
			speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
			response.tellWithEffects('<speak>' + speechOut + '</speak>');
		}
	}
	this.pointsOf = function (intent, session, response, requestApi) {
		var speechOut = '';
		try {
			if (intent.slots.Name.value.split(' ').length == 2) {
				requestApi.get(url + '/' + intent.slots.Name.value, function (res) {
					if (res) {
						if (res.errorMsg) {
							speechOut = speechOut + res.errorMsg;
						} else {
							if (res.balance < 30) {
								speechOut = speechOut + "<say-as interpret-as='interjection'>aiyo.</say-as> You only have " + res.balance + " points. you can not even buy a pen."
							} else if (res.balance > 30 && res.balance < 2000) {
								speechOut = speechOut + "<say-as interpret-as='interjection'>waaaah.</say-as> You have " + res.balance + " points. you can buy."
								if (res.itemNames.length) {
									res.itemNames.forEach(function (a) {
										speechOut = speechOut + a.itemName + '.';
									});
								}
							} else if (res.balance > 2000) {
								speechOut = speechOut + "<say-as interpret-as='interjection'>baap re.</say-as> You have " + res.balance + " points. you can buy."
								if (res.itemNames.length) {
									res.itemNames.forEach(function (a) {
										speechOut = speechOut + a.itemName + '.';
									});
								}
							}
						}

					} else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
					response.tellWithEffects('<speak>' + speechOut + '</speak>');
				});
			}
		} catch (err) {
			speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
			response.tellWithEffects('<speak>' + speechOut + '</speak>');
		}
	}
	this.goodies = function (intent, session, response, requestApi) {
		var speechOut = '';
		var endPoints = intent.slots.EndNumber.value ? intent.slots.EndNumber.value : intent.slots.StartNumber.value;
		try {
			requestApi.get(url + '/' + intent.slots.StartNumber.value + '/' + endPoints, function (res) {
				if (res) {
					if (res.errorMsg) {
						speechOut = speechOut + res.errorMsg;
					} else {
						if (!res.items) {
							speechOut = speechOut + "<say-as interpret-as='interjection'>aiyo.</say-as> There are no goodies available in this range."
						} else {
							speechOut = speechOut + 'Goodies available are '
							res.items.forEach(function (item) {
								speechOut = speechOut + item.itemName + ' for ' + item.points + 'points. ';
							})
						}

					}
				} else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
				response.tellWithEffects('<speak>' + speechOut + '</speak>');
			});
		} catch (err) {
			speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
			response.tellWithEffects('<speak>' + speechOut + '</speak>');
		}
	}
	this.transfer = function (intent, session, response, req) {
		if (checkIntent(intent))
			response.tellWithEffects('<speak>I can not understand.</speak>');
		else
			response.tellWithEffects('<speak><say-as interpret-as="interjection">woo hoo.</say-as> Points Transferd.</speak>');
	}
}
module.exports = rewardPoints;