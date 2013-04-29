exports.create = function(_options, _callback) {
	var scanner = function() {
		var Barcode = require('ti.barcode');
		Barcode.allowRotation = true;
		Barcode.displayedMessage = '';
		Barcode.useLED = false;
		Barcode.capture({
			animate : false,
			showCancel : true,
			keepOpen : false
		});
		Barcode.addEventListener('success', function(_e) {
			var url = _e.result;
			var lecture = url.split('?lecture=')[1];
			var endpoint = url.split('?lecture=')[0];

			require('modules/sturesy').setLecture(endpoint, lecture)
			/*message.setText(lecture);
			 message.setFont({
			 fontSize : 25,
			 fontWeight : 'bold'
			 });*/
			_callback();
			Barcode.cancel();
		});
		Barcode.addEventListener('cancel', function(_e) {
			if (Ti.Platform.model == "Simulator") {
				require('modules/sturesy').setLecture('http://lab.min.uni-hamburg.de/sturesy/', 'Titanium');
				Barcode.cancel();
				_callback();
			}
		});
	};
	var win = Titanium.UI.createWindow({
		backgroundColor : '#EFEFEF'
	});
	var logo = Ti.UI.createImageView({
		image : '/Default.png'
	});
	win.add(logo);
	var lecture = Ti.App.Properties.getString('lecture');
	var options = ['QR einscannen', 'Demonstration (Jagdschein)'];
	if (lecture && lecture !== 'Demonstration')
		options.push(lecture);
	var dialog = Titanium.UI.createOptionDialog({
		options : options,
		title : 'Auswahl der Lektion',
		cancel : options.length - 1
	});
	dialog.addEventListener('click', function(e) {
		switch(e.index) {
			case 0:
				scanner();
				break;
			case 1:
				require('modules/sturesy').setLecture('http://lab.min.uni-hamburg.de/sturesy/', 'Demonstration');
				_callback();
				break;
			case 2 : 
			break;	
			case 3:
				_callback();
				break;
		}
	});
	win.addEventListener('focus', function() {
		logo.animate({
			bottom : 100,
			duration : 700
		}, function() {
			dialog.show();
		});
	});
	return win;
}