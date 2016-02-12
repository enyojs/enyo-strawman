var platform = require('enyo/platform');

module.exports = {
	"enyo": "Enyo",
	"garnet": "Garnet",
	"layout": "Layout",
	"enyo-ilib": "iLib",
	"canvas": "Canvas",
	"svg": "Svg"
};

if(platform.webos) {
	module.exports['enyo-webos'] = 'webOS';
}
