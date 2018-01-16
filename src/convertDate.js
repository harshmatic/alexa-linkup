var moment  = require('./moment');
function getStartEndDate(date) {
    var dates = date.split('-');
    var datesResponse = [];
    switch(dates.length) {
        case 3:
        datesResponse.push(date);
        datesResponse.push(date);
            break;
        case 2:
            if (dates[1].includes("W")) {
                datesResponse.push(moment().year(dates[0]).week(dates[1].replace('W','')).format('YYYY-MM-DD'));
                datesResponse.push(moment().year(dates[0]).week(dates[1].replace('W','')).add(7, 'days').format('YYYY-MM-DD'));
            } else {
				datesResponse.push(moment([parseInt(dates[0]), parseInt(dates[1]) - 1]).format('YYYY-MM-DD'));
                datesResponse.push(moment([parseInt(dates[0]), parseInt(dates[1]) - 1]).clone().endOf('month').format('YYYY-MM-DD'));
            }
            break;
		case 1:
			datesResponse.push(dates[0]+'-01-01');
			datesResponse.push(dates[0]+'-12-31');
            break;
        default:
            datesResponse.push(date);
            datesResponse.push(date);
    }
    console.log("DATA"+datesResponse)
    return datesResponse;
    
}
module.exports = getStartEndDate;
