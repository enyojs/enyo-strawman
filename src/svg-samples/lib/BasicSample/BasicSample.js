var
	kind = require('enyo/kind');

var
	Scroller = require('enyo/Scroller'),
	Button = require('enyo/Button');

var
	Root = require('svg/Root'),
	Rectangle = require('svg/Rectangle'),
	Circle = require('svg/Circle'),
	Path = require('svg/Path'),
	SvgText = require('svg/Text'),
	TextPath = require('svg/TextPath'),
	Arc = require('svg/Arc');


module.exports = kind({
	name: 'SvgSample',
	kind: Scroller,
	classes: 'enyo-fit sample svg-sample',
	components: [
		{content: 'Many Stacked SVG Element:', classes: 'divider'},
		{kind: Root, viewBox: '0 0 100 100', style: 'height: 250px; width: 250px;', components: [
			{kind: Rectangle, width: 100, height: 100, x: 0, y: 0, style: 'fill: cyan;'},
			{kind: Circle, cx: 30, cy: 30, r: 15, style: 'fill: #FFCB00;'},
			{name: 'path', kind: Path, style: 'fill: #459652;', d: 'M100,50c-10.6,11.9-36.5,16.5-50,0S14.4,35.1,0,50v50h100V50z'},
			{kind: Rectangle, width: 20, height: 40, x: 75, y: 30, transform: 'rotate(10,70,40)', style: 'fill: #3E57BA;'},
			{kind: SvgText, content: 'SVG Text', x: 20, y: 55, style: 'fill: #BF4C41;', classes: 'svg-sample-header-text'},
			{name: 'textPath', kind: Path, stroke: '#D9965B', d: 'M10,90c10.4-11.6,30.4-20,40-10c13.3,13.8,29,6.7,40,0'},
			{kind: SvgText, classes: 'svg-sample-header-text', components: [
				{kind: TextPath, content: 'Text on a path!', style: 'fill: blanchedalmond;', target: 'textPath'}
			]}
		]},
		{content: 'Arcs (Hollow and Filled):', classes: 'divider'},
		{kind: Button, small: true, content: 'Random Arc', ontap: 'randomArc'},
		{kind: Root, viewBox: '0 0 100 100', style: 'height: 250px; width: 250px; display: block;', components: [
			{name: 'arc1', kind: Arc, x: 50, y: 50, radius: 45, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', filled: true, style: 'fill: orange;'},
			{name: 'arc2', kind: Arc, x: 50, y: 50, radius: 45, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'},
			{name: 'arc3', kind: Arc, x: 50, y: 50, radius: 40, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'},
			{name: 'arc4', kind: Arc, x: 50, y: 50, radius: 35, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'},
			{name: 'arc5', kind: Arc, x: 50, y: 50, radius: 30, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'},
			{name: 'arc6', kind: Arc, x: 50, y: 50, radius: 25, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'}
		]},
		{content: 'Logo Hover:', classes: 'divider'},
		{kind: Root, viewBox: '0 0 100 100', style: 'height: 250px; width: 250px; display: block;', components: [
			{name: 'logo', kind: Path, classes: 'svg-sample-logo', spotlight: true, ontap: 'buttonTapped', d: 'M49.3,90c-5.7,0-11-1-15.9-3.1c-4.9-2.1-9.2-5-12.9-8.8c-3.8-3.7-6.7-7.9-8.9-12.9C9.6,60.3,8.5,55,8.5,49.3 c0-5.7,1.1-11,3.2-15.8c2.1-4.8,5.1-9.2,8.9-13c3.8-3.7,8.1-6.5,13-8.6c4.8-2.1,10.1-3.2,15.8-3.2c5.6,0,10.8,1.1,15.7,3.2 c4.9,2.1,9.3,5,13.1,8.6c3.7,3.8,6.6,8.1,8.7,13c2.1,4.8,3.2,10.1,3.2,15.8c0,5.7-1.1,11-3.2,15.9c-2.1,4.9-5,9.2-8.7,12.8 c-3.8,3.8-8.1,6.7-13,8.9C60.3,88.9,55,90,49.3,90z M50.9,15.3c-0.4-0.1-0.8-0.2-1.1-0.2c-4.8,0-9.4,0.9-13.6,2.7 c-4.2,1.8-7.9,4.3-11.1,7.4c-3.2,3.2-5.6,6.8-7.4,10.9c-1.8,4.1-2.7,8.5-2.7,13.2c0,4.7,0.9,9.1,2.8,13.2c1.9,4.1,4.4,7.7,7.6,10.9 c3.2,3.2,6.8,5.6,11,7.4c4.1,1.8,8.4,2.6,12.9,2.6c4.8,0,9.3-0.9,13.4-2.8c4.1-1.9,7.6-4.4,10.6-7.5c3-3.2,5.4-6.8,7.2-10.9 c1.8-4.1,2.8-8.4,2.9-12.9v-1.5H58.9v3.1h21.3v0.6c-0.3,4-1.3,7.8-3,11.3c-1.7,3.5-4,6.6-6.8,9.2c-2.8,2.6-6,4.7-9.6,6.2 c-3.6,1.5-7.4,2.3-11.4,2.3c-4.4,0-8.5-0.9-12.3-2.6c-3.8-1.7-7.1-4.1-9.8-7s-4.9-6.3-6.4-10c-1.5-3.7-2.3-7.5-2.3-11.5 c0-4.4,0.8-8.5,2.5-12.3c1.7-3.8,4-7,7-9.7s6.3-4.9,9.9-6.5c3.7-1.6,7.5-2.4,11.5-2.4h1.6V15.3z M36.4,41c1.2,0,2.3-0.4,3.3-1.3 c1-0.9,1.5-2,1.5-3.3c0-1.3-0.5-2.4-1.5-3.3c-1-0.9-2.1-1.4-3.3-1.4c-1.4,0-2.5,0.5-3.4,1.4c-0.9,0.9-1.3,2.1-1.3,3.3 c0,1.3,0.4,2.4,1.3,3.3C33.8,40.6,34.9,41,36.4,41z M47.6,67.2h11.3v-3.4h-8V31.6h-3.3V67.2z'}
		]},
		{classes: 'console', components: [
			{content: 'Result', classes: 'divider'},
			{name: 'result', classes: 'ouput', allowHtml: true, content: 'No button pressed yet.'}
		]}
	],
	randomArc: function () {
		var startAngle = Math.random() * 360;
		this.$.arc2.set('startAngle', startAngle );
		this.$.arc2.set('startAngle', startAngle );
		this.$.arc3.set('startAngle', startAngle );
		this.$.arc4.set('startAngle', startAngle );
		this.$.arc5.set('startAngle', startAngle );
		this.$.arc6.set('startAngle', startAngle );
		this.$.arc2.set('endAngle', startAngle + (Math.random() * 360) );
		this.$.arc3.set('endAngle', startAngle + (Math.random() * 360) );
		this.$.arc4.set('endAngle', startAngle + (Math.random() * 360) );
		this.$.arc5.set('endAngle', startAngle + (Math.random() * 360) );
		this.$.arc6.set('endAngle', startAngle + (Math.random() * 360) );
	},
	buttonTapped: function(sender, ev) {
		this.$.result.set('content', '&quot;' + sender.name + '&quot; pressed.');
	}
});