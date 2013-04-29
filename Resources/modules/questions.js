exports.create = function(_lecture) {
	var lecture = _lecture, md5 = '', myanswer = null, voted = false, answerRows = [];
	var BOTTOM = '100dp', TOP = '120dp'

	function updateView() {
		require('modules/sturesy').getQuestion(md5, function(_data) {
			if (_data.md5 !== md5) {
				md5 = _data.md5;
				self.answers.setData([]);
				myanswer = null;
				voted = false;
				self.button.animate({
					bottom : '-50dp'
				});
				answerRows = [];
				self.questiontext.setText(_data.question);
				for (var i = 0; i < _data.answers.length; i++) {
					answerRows[i] = require('modules/answerrow').create(_data.answers[i]);
					/*	self.answers.appendRow(answerRows[i], (Ti.Platform.name === 'iPhone OS') ? {
					 animationStyle : Ti.UI.iPhone.RowAnimationStyle.RIGHT
					 } : null);*/
				}
				self.answers.setData(answerRows);
			} else {
				var sum = 0;
				for (var i = 0; i < _data.answers.length; i++) {
					sum += parseInt(_data.answers[i].votes);
				}
				for (var i = 0; i < _data.answers.length; i++) {
					answerRows[i].pb.setMax(sum);
					answerRows[i].pb.setValue(_data.answers[i].votes);
				}
			}
		});
	}

	var self = Ti.UI.createWindow({
		backgroundColor : (Ti.Platform.name === 'iPhone OS') ? Titanium.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND : null
	});
	self.backgroundImage = '/assets/scrollview.png';
	self.icon = Ti.UI.createImageView({
		top : '5dp',
		left : '5dp',
		image : '/assets/icon.png',
		width : '70dp',
		height : '90dp'
	});
	self.button = Ti.UI.createButton({
		title : ' Abstimmung! ',
		height : '50dp',
		width : Ti.UI.SIZE,
		bottom : '-50dp',
		font : {
			fontSize : '30dp',
			fontWeight : 'bold'
		}
	});
	self.question = Ti.UI.createScrollView({
		top : '5dp',
		height : TOP,
		left : '80dp',
		showVerticalScrollIndicator : true,
		width : Ti.UI.FILL,
		contentHeight : Ti.UI.SIZE,
		contentWidth : Ti.UI.FILL
	});
	self.questiontext = Ti.UI.createLabel({
		text : 'Frage',
		top : 0,
		font : {
			fontSize : '17dp'
		},
		height : Ti.UI.FILL,
		color : 'white'
	});
	self.question.add(self.questiontext);

	/* table of answers */
	self.answers = Ti.UI.createTableView({
		top : TOP,
		backgroundColor : 'transparent'
	});

	/* alle Controler
	*
	*
	*/

	// exit:
	self.icon.addEventListener('longpress', function() {
		self.close()
	});

	//  Voting:
	self.button.addEventListener('click', function() {
		voted = true;
		self.button.animate({
			bottom : '-50dp'
		});
		self.answers.animate({
			bottom : 0
		});
		require('modules/sturesy').setAnswer(myanswer, function() {
			for (var i = 0; i < answerRows.length; i++) {
				//answerRows[i].pb.show();
			}
		});
	})
	// preVoting:
	self.answers.addEventListener('click', function(e) {
		if (voted === false) {
			if (!myanswer) {
				self.answers.bottom = BOTTOM;
				self.button.animate({
					bottom : '10dp',
					duration : 500
				});
			}
			myanswer = e.rowData.answer;
			for (var i = 0; i < answerRows.length; i++) {
				answerRows[i].selected = false;
				answerRows[i].ok.hide();
			}
			e.row.ok.show();
			//	e.rowData.selected = true;
		}
	});
	self.add(self.question);
	self.add(self.icon);

	self.add(self.button);
	self.add(self.answers);
	updateView();
	setInterval(updateView, 2500)
	return self;
}
