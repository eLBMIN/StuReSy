exports.create = function(_data) {
	console.log(_data);
	var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	var row = Ti.UI.createTableViewRow({
		height : Ti.UI.SIZE,
		backgroundColor : 'white',
		answer : _data.answernumber,
		selected : false
	});
	row.add(Ti.UI.createLabel({
		left : '5dp',
		width : Ti.UI.SIZE,
		text : letters[_data.answernumber],
		color : '#ccc',
		font : {
			fontSize : '60dp',
			fontWeight : 'bold'
		}
	}));
	row.container = Ti.UI.createView({
		left : '60dp',
		right : '40dp',
		layout : 'vertical',
		height : Ti.UI.SIZE
	});
	row.container.add(Ti.UI.createView({
		top : 0,
		height : '5dp'
	}));
	row.container.add(Ti.UI.createLabel({
		left : 0,
		right : 0,top:0,
		color : '#000',
		height : Ti.UI.SIZE,
		text : _data.answertext,
		font : {
			fontSize : '16dp'
		}
	}));
	row.container.add(Ti.UI.createView({
		top : 0,
		height : '5dp'
	}));

	row.pb = Ti.UI.createProgressBar({
		min : 0,
		max : 10,
		bottom : '3dp',
		width : '90dp',
		height : 10,
		value : 0,
		left : '-15dp',
		opacity : 0.8,
		transform : Ti.UI.create2DMatrix({
			scale : 0.5
		})
		//					style : Titanium.UI.iPhone.ProgressBarStyle.PLAIN
	});
	row.ok = Ti.UI.createImageView({
		width : '50dp',
		height : Ti.UI.SIZE,
		right : '5dp',
		image : '/assets/ok.png',
		visible : false
	});
	row.add(row.container);
	row.add(row.pb);
	row.add(row.ok);
	return row;
}	