require('enyo/options').accessibility = true;

var
	ready = require('enyo/ready');

var
	strawman = require('./src');

ready(function () {
	new strawman.List().renderInto(document.body);
});
