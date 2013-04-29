exports.setLecture = function(_endpoint, _lecture) {
	var date = new Date();
	Ti.App.Properties.setString('lecture', _lecture);
	Ti.App.Properties.setString('endpoint', _endpoint);
	Ti.App.Properties.setInt('lecture_ctime', date.getTime() / 1000);
}
exports.getURL = function() {
	if (Ti.App.Properties.getString('lecture') && Ti.App.Properties.getString('endpoint'))
		return Ti.App.Properties.getString('endpoint') + '?lecture=' + Ti.App.Properties.getString('lecture');
	return null;
}
exports.getLecture = function() {
	if (Ti.App.Properties.getString('lecture'))
		return Ti.App.Properties.getString('lecture');
	return null;
};

exports.getQuestion = function(_md5, _callback) {
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			if (xhr.status == 200) {
				try {
					_callback(JSON.parse(this.responseText));
				} catch(E) {
					console.log(E);
				}
			};
		},
		onerror : function() {
			console.log(this.error);
		}
	});
	var url = Ti.App.Properties.getString('endpoint') + '?lastquestion=' + _md5 + '&lecture=' + Ti.App.Properties.getString('lecture');
	xhr.open('GET', url);console.log(url);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Accept-Charset", "charset=utf-8");
	xhr.setRequestHeader("User-Agent", "StuReSy 1.0");
	xhr.send();
};

exports.setAnswer = function(_answer, _callback) {
	var json = JSON.stringify({
		id : Ti.Platform.id,
		answer : _answer,
		lecture : Ti.App.Properties.getString('lecture')
	});
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		if (xhr.status == 200) {
			Ti.Media.vibrate();
			_callback(this.responseText);
		};
	};
	var url = Ti.App.Properties.getString('endpoint') + '?lecture=' + Ti.App.Properties.getString('lecture');
	xhr.open('POST', url);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json", true);
	xhr.setRequestHeader("Accept-Charset", "charset=utf-8");
	xhr.send({
		json : json
	});
};
