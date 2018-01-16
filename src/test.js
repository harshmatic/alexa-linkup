var requestApiModule = require('./auth');
var requestApi = new requestApiModule();
var moment  = require('./moment');
var StartDate = moment();
var StartDate = moment(StartDate).format('YYYY-MM-DD');
var getDates = require('./convertDate');
var value = {f:''}
var dates = '2018'.split('-');
console.log(value.g ? '2': '1');
var datesResponse = [];
//     switch(dates.length) {
//         case 3:
//         datesResponse.push(2018-W50);
//         datesResponse.push(2018-W50);
//             break;
//         case 2:
//             if (dates[1].includes("W")) {
//                 datesResponse.push(moment().year(dates[0]).week(dates[1].replace('W','')).format('YYYY-MM-DD'));
//                 datesResponse.push(moment().year(dates[0]).week(dates[1].replace('W','')).add(7, 'days').format('YYYY-MM-DD'));
//             } else {
// 				datesResponse.push(moment([parseInt(dates[0]), parseInt(dates[1]) - 1]).format('YYYY-MM-DD'));
//                 datesResponse.push(moment([parseInt(dates[0]), parseInt(dates[1]) - 1]).clone().endOf('month').format('YYYY-MM-DD'));
//             }
//             break;
// 		case 1:
// 			datesResponse.push(dates[0]+'-01-01');
// 			datesResponse.push(dates[0]+'-12-31');
//             break;
//         default:
//     }
// console.log(datesResponse);
var url = 'Leave';
var speechOut = '';
var dates = getDates('2018-W03');
requestApi.get(url+'/'+'Ashwini singh/' + dates[0] + '/' + dates[1],function(res){
	var speechOut = '';
	if (res)
		if (res.empLeaveDetails) {
			speechOut = speechOut + 'Yes, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ') + 'is on ';
			res.empLeaveDetails.forEach(function (item) {
				speechOut = speechOut + item.type +' ';
				if (item.startDate == item.endDate)
					speechOut = speechOut + 'for ' + ' <say-as interpret-as="date">'+item.startDate+'</say-as>.' ;
				else 
					speechOut = speechOut + 'from ' + ' <say-as interpret-as="date">'+item.startDate+'</say-as> to  <say-as interpret-as="date">'+item.endDate+'</say-as>.' ;
			});
		}
		else {
			speechOut = speechOut + 'No, ' + (res.gender.toLowerCase() == 'female' ? 'She ' : 'He ');
			speechOut = speechOut + ' will be working.';
		}
	else speechOut = speechOut + 'Guess what! Linkup is not working as usual. Try again.';
	console.log(speechOut);
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



