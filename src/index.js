
var request = require('request');
var leaveModule = require('./leave');
var contactModule = require('./contact');
var skillSetModule = require('./skillSet');
var timesheetModule = require('./timesheets');
var rpModule = require('./rewardPoints');
var requestApiModule = require('./auth');

var AlexaSkill = require('./AlexaSkill');
var config = require('./config');
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var leave = new leaveModule();
var contact = new contactModule();
var skillSet = new skillSetModule();
var rewardPoints = new rpModule();
var timesheets = new timesheetModule();
var requestApi = new requestApiModule();

var Linkup = function () {
  AlexaSkill.call(this, APP_ID);
};

Linkup.prototype = Object.create(AlexaSkill.prototype);
Linkup.prototype.constructor = Linkup;

Linkup.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log("Linkup onSessionStarted requestId: " + sessionStartedRequest.requestId
    + ", sessionId: " + session.sessionId);
};

Linkup.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log("Linkup onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
};


Linkup.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log("Linkup onSessionEnded requestId: " + sessionEndedRequest.requestId
    + ", sessionId: " + session.sessionId);
};

Linkup.prototype.intentHandlers = {
  LeaveToday: function (intent, session, response) {
    leave.handleLeaveToday(intent, session, response, requestApi);
  },
  LeaveOn: function (intent, session, response) {
    leave.handleLeaveOn(intent, session, response, requestApi);
  },
  LeavePlans: function (intent, session, response) {
    leave.handleLeavePlans(intent, session, response, requestApi);
  },
  
  ContactInfo : function (intent, session, response) {
    contact.contactInfo(intent, session, response);
  },
  SendEmail : function (intent, session, response) {
    contact.sendEmail(intent, session, response);
  },

  TopEarner : function (intent, session, response) {
    rewardPoints.topEarners(intent, session, response);
  },
  RewardPoints : function (intent, session, response) {
    rewardPoints.pointsOf(intent, session, response);
  },
  Goodies : function (intent, session, response) {
    rewardPoints.goodies(intent, session, response);
  },

  GetPeople : function (intent, session, response) {
    skillSet.getPeople(intent, session, response);
  },
  GetSkill : function (intent, session, response) {
    skillSet.getSkill(intent, session, response);
  },
  GetSkillLevel : function (intent, session, response) {
    skillSet.getSkillLevel(intent, session, response);
  }, 

  Timesheets : function (intent, session, response) {
    timesheets.pendingTimesheets(intent, session, response);
  },
  HelpIntent: function (intent, session, response) {
    response.ask("You can ask Linkup to check for the questions pasted above !");
  },
  WifeIntent: function (intent, session, response) {
    response.tell("There is a research going on in oxford univeristy from past 900 years, I will let you know once they find way. Keep trying till then.");
  },
  Unhandled: function (event, context, response) {
    response.tell('I am dumb');
  }

};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the Linkup skill.
  var linkup = new Linkup();
  linkup.execute(event, context);
};
