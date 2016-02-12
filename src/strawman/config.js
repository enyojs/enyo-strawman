var platform = require('enyo/platform');

module.exports = {
	"enyo": "Enyo",
	"moonstone": "Moonstone",
	"moonstone-light": "Moonstone Light",
	"layout": "Layout",
	"spotlight": "Spotlight",
	"enyo-ilib": "iLib",
	"onyx": "Onyx",
	"canvas": "Canvas",
	"svg": "Svg"
};

if(platform.webos) {
	module.exports['enyo-webos'] = 'webOS';
}
