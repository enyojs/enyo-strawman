require('enyo/options').accessibility = true;

var
	ready = require('enyo/ready');

var
	Strawman = require('./src').List;

ready(function () {
	new Strawman().renderInto(document.body);
});
