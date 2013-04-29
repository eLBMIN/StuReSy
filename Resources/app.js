var intro = require('modules/intro').create({}, function() {
	var questions = require('modules/questions').create();
	questions.open((Ti.Platform.name === 'iPhone OS') ? {
		transition : Ti.UI.iPhone.AnimationStyle.CURL_UP
	} : null);
});

intro.open();
