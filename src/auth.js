var request = require('./request');
var access_token = '';
    var options = {
        baseUrl: 'http://alexa.eternussolutions.com:4500/api/Alexa',
        url: '',
        method: '',
        headers: {
            'Authorization': 'bearer ' + access_token
        }
    };
var auth = function(callback) {
    request.post('http://alexa.eternussolutions.com:4500/api/Auth/Token', {
        form: {
            Grant_Type: 'password',
            username: 'harshit.jyoti',
            password: 'espl@123'
        },
        json: true
    }, function (err, res, body) {
        if (err) {
            callback(false);
        } else {
            access_token = body.access_token;
            options = {
                baseUrl: 'http://alexa.eternussolutions.com:4500/api/Alexa',
                url: '',
                method: '',
                headers: {
                    'Authorization': 'bearer ' + access_token
                }
            };
            callback(true);
        }

    })
}

function requestApi() {

    //this.auth();
    this.get = function (url,callback) {
        options.url = url;
        options.method = 'get';
        request.get(options, function (err, res, body) {
            if (err) {
                console.log(err);
                callback(false)
            }
            else if (res.statusCode == 200) {
                callback(JSON.parse(body));
            } else {
                auth(function(gotToken){
                    if (gotToken) {
                        options = {
                            baseUrl: 'http://alexa.eternussolutions.com:4500/api/Alexa/',
                            url: url,
                            method: 'get',
                            headers: {
                                'Authorization': 'bearer ' + access_token
                            }
                        }
                        
                        request.get(options, function (err, res, body) {
                            if (err) {
                                callback(JSON.parse(body))
                            }
                            else if (res.statusCode == 200) {
                                callback(JSON.parse(body));
                            }
                        });
                    } else {
                        callback(false);
                    };
                });
                
            } 
        });
    }
    this.post = function (url) {
        options.url = url;
        options.method = 'get';
        request.get(options, function (err, res, body) {
            if (err) {
                callback(JSON.parse(body))
            }
            else if (res.statusCode == 200) {
                callback(JSON.parse(body));
            } else {
                auth(function(gotToken){
                    if (gotToken) {
                        options = {
                            baseUrl: 'http://alexa.eternussolutions.com:4500/api/Alexa/',
                            url: url,
                            method: 'get',
                            headers: {
                                'Authorization': 'bearer ' + access_token
                            }
                        }
                        
                        request.get(options, function (err, res, body) {
                            if (err) {
                                callback(JSON.parse(body))
                            }
                            else if (res.statusCode == 200) {
                                callback(JSON.parse(body));
                            }
                        });
                    } else {
                        callback(false);
                    };
                });
                
            } 
        });
    }
}

module.exports = requestApi;