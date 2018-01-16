var checkIntent = require('./utils');
var res = {
    "email": "ankit.panchal@eternussolutions.com",
    "number": "9960014544",
    "isOnDnd": false
};
function contact() {
    this.contactInfo = function (intent, session, response, requestApi) {
        try {
            if (intent.slots.Name.value.split(' ').length == 2) {
                requestApi.get('Employee/' + intent.slots.Name.value, function (res) {
                    if (res) {
                        if (res.errorMsg) {
                            speechOut = speechOut + res.errorMsg;
                        } else {
                            if (intent.slots.info.value == 'number') {
                                if (res.isOnDnd) {
                                    session.attributes.what = 'mail';
                                    response.askWithEffects('<speak>Phone number of ' + intent.slots.Name.value + ' is <say-as interpret-as="telephone">' + res.number + '</say-as>, but, ' + intent.slots.Name.value + ' is on D n D mode, Should I send an email ?</speak>', 'yes or no');

                                }
                                else {
                                    session.attributes.what = 'repeat';
                                    session.attributes.name = intent.slots.Name.value;
                                    session.attributes.number = res.number;
                                    response.askWithEffects('<speak>Phone number of ' + intent.slots.Name.value + ' is <say-as interpret-as="telephone">' + res.number + '</say-as>. Should I repeat ?</speak>', 'yes or no');

                                }
                            }
                            else {
                                session.attributes.what = 'mail';
                                response.askWithEffects('<speak>Email address of ' + intent.slots.Name.value + ' is ' + res.email + '. Should I send an email ?</speak>', 'yes or no');
                            }
                        }
                    } else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
                    //response.askWithEffects('<speak>' + speechOut + '</speak>');

                });
            } else response.tellWithEffects('<speak>I am not able to get the full name. please try again.</speak>');
        } catch (err) {
            speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
            response.tellWithEffects('<speak>' + speechOut + '</speak>');
        }



    }
    this.sendEmail = function (intent, session, response) {
        if (checkIntent(intent))
            response.tellWithEffects('<speak>I can not understand.</speak>');
        else
            if (intent.slots.MailSend.value.toLowerCase() == 'yes') {
                if (session.attributes.what == 'repeat')
                    response.tellWithEffects('<speak>Phone number of ' + session.attributes.name + ' is <say-as interpret-as="telephone">' + session.attributes.number + '</say-as></speak>');
                else
                    response.tellWithEffects('<speak>Sending Email</speak>');
            } else response.tell('ok');

    }
}

module.exports = contact;