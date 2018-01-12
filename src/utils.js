function checkEmptyIntent(intent) {

    var nullValues = 0;
    var slots = intent.slots;
    Object.keys(slots).forEach(function (key) {

        if (!slots[key].value) {
            nullValues++;
        }
        console.log(nullValues)
        
    })
    return nullValues == Object.keys(slots).length ? true : false;
}
module.exports = checkEmptyIntent;
