var requestApiModule = require('./auth');
var requestApi = new requestApiModule();
var moment  = new require('./moment');
var url = 'RnR';
requestApi.get(url+'/'+'harshit jyoti',function(res){
var speechout ='';
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
				console.log(speechout);
			});

// function auth() {
//   request.post('http://alexa.eternussolutions.com:4500/api/Auth/Token', {
//       form: {
//           Grant_Type: 'password',
//           username: 'harshit.jyoti',
//           password: 'espl@123'
//       },
//       json: true
//   }, function (err, res, body) {
//       if (err) {
//           return false;
//       } else {
//           console.log('success');
//           access_token = body.access_token;
//           return 'true';
//       }

//   })
// }
// console.log(auth());
// var request = require('request');
// var access_token = '';

// request.post('http://alexa.eternussolutions.com:4500/api/Auth/Token', {
//   form: {
//     Grant_Type:'password',
//     username:'harshit.jyoti',
//     password:'espl@123'
//   },
//   json: true
// }, function (err, res, body) {
//   access_token = body.access_token;
//   const options = {  
//     url: 'http://alexa.eternussolutions.com:4500/api/Alexa/Leave/pooja merchant/08-14-2017',
//     method: 'GET',
//     headers: {
//         'Authorization': 'bearer asda'
//     }
//   };
//   console.log(access_token);
//   request.get(options, function(err, res, body) {  
//     let json = JSON.parse(body);
//     let errJ = err;
//     let resJ = res;
//     console.log(err);
// });
// })



