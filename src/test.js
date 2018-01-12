var requestApiModule = require('./auth');
var requestApi = new requestApiModule();
var request = require('request');
requestApi.get('Leave/pooja merchant/1-01-2018',function(body){
  console.log(body)
})

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



