var
	kind = require('enyo/kind');
	
var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('sunstone/Scroller'),
	InputDecorator = require('sunstone/InputDecorator'),
	Input = require('sunstone/Input');

module.exports = kind({
	name: "sun.sample.InputSample",
	kind: FittableRows,
	classes: "sun enyo-unselectable enyo-fit sun-input-sample",
	components: [
		{kind: Scroller, horizontal: "hidden", fit: true, components: [
			{kind: InputDecorator, components: [
				{kind: Input, classes: "sun-input", style:"width:224px", placeholder:"Enter Text", oninput:"handleInput", onchange:"handleChange"}
			]},
			{tag:"br"},
			{tag:"br"},
			{kind: InputDecorator, components: [
				{kind: Input, type: "password", classes: "sun-input", placeholder: "Enter password", oninput:"handleInput", onchange:"handleChange"}
			]},
			{tag:"br"},
			{tag:"br"},
			{kind: InputDecorator, components: [
				{kind: Input, type: "number", classes: "sun-input", placeholder: "Enter number", oninput:"handleInput", onchange:"handleChange"}
			]}
		]},
		{name: "console", allowHtml: false, content: "Input: "}
	],
	handleChange: function(inSender, inEvent) {
		this.$.console.setContent("Changed: " + inSender.getValue());
	}
});