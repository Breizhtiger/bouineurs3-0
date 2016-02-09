var _ = require("underscore");

var tools = {};

var dayTable =
	[
	{"key":"day1", "fullDateString":"16 Février 2016", "dateString":"16/02/2016"},
	{"key":"day2", "fullDateString":"17 Février 2016", "dateString":"17/02/2016"},
	{"key":"day3", "fullDateString":"18 Février 2016", "dateString":"18/02/2016"},
	{"key":"day4", "fullDateString":"19 Février 2016", "dateString":"19/02/2016"},
	{"key":"day5", "fullDateString":"20 Février 2016", "dateString":"20/02/2016"},
	{"key":"day6", "fullDateString":"21 Février 2016", "dateString":"21/02/2016"},
	{"key":"day7", "fullDateString":"22 Février 2016", "dateString":"22/02/2016"},
	{"key":"day8", "fullDateString":"23 Février 2016", "dateString":"23/02/2016"},
	{"key":"day9", "fullDateString":"24 Février 2016", "dateString":"24/02/2016"},
	{"key":"day10", "fullDateString":"25 Février 2016", "dateString":"25/02/2016"},
	{"key":"day11", "fullDateString":"26 Février 2016", "dateString":"26/02/2016"},
	{"key":"day12", "fullDateString":"27 Février 2016", "dateString":"27/02/2016"},
	{"key":"day13", "fullDateString":"28 Février 2016", "dateString":"28/02/2016"},
	{"key":"day14", "fullDateString":"29 Février 2016", "dateString":"29/02/2016"},
	{"key":"day15", "fullDateString":"01 Mars 2016", "dateString":"01/03/2016"},
	{"key":"day16", "fullDateString":"02 Mars 2016", "dateString":"02/03/2016"},
	{"key":"day17", "fullDateString":"03 Mars 2016", "dateString":"03/03/2016"}
	];

/*
*	Get various information about the day
*	@param day : Wanted day @ format dayX where X is the day number
*	@return : Object with all information for the day, null if invalid entry day
*/
tools.getVariousInformationForADay = function(day){
	tabIndex = tools.extractDayNumber(day);

	if(tabIndex != -1)
		return dayTable[tabIndex-1];
	else
		return null;
}


tools.extractDayNumber = function (longDay){
	dayNumberArray = longDay.match(/\d+/g);
	
	if(!_.isNull(dayNumberArray) && !_.isEmpty(dayNumberArray)){
		return dayNumberArray;
	}
	else{
		return -1;
	}
}

tools.getFirstTimeOfTheDay = function (keyDay){
	dayInformation = tools.getVariousInformationForADay(keyDay);
	
	if(!_.isNull(dayInformation)){
		dayElements = dayInformation.dateString.split("/");
		test = new Date(dayElements[2],parseInt(dayElements[1])-1, dayElements[0],0,0,0).toISOString();
		return test;
	}
	else{
		return null;
	}
}

tools.getLastTimeOfTheDay = function (keyDay){
	dayInformation = tools.getVariousInformationForADay(keyDay);
	
	if(!_.isNull(dayInformation)){
		dayElements = dayInformation.dateString.split("/");
		test = new Date(dayElements[2],parseInt(dayElements[1])-1, dayElements[0],23,59,59).toISOString();
		return test;
	}
	else{
		return null;
	}
}

tools.isBeforeToday = function (dayInformation){
	if(dayInformation != null){
		var dayElements = dayInformation.dateString.split("/");
		var queriedDate = new Date(dayElements[2],parseInt(dayElements[1])-1, dayElements[0]);
		var currentDate = Date.now();

		return (queriedDate.getTime() > currentDate);
	}
	else{
		return true;
	}
}

module.exports = tools;