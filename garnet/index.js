var
	ready = require('enyo/ready'),
	Scroller = require('garnet/Scroller'),
	kind = require('enyo/kind');

var
	SampleList = require('../src/strawman/SampleList');

var
	samples = {
		Enyo: require('../src/enyo-samples'),
		Garnet: require('./src'),
		iLib: require('../src/enyo-ilib-samples'),
		Svg: require('../src/svg-samples')
	};

var
	List = kind({
		kind: SampleList,
		title: 'Enyo Strawman Perf - Samples Gallery',
		classes: 'home',
		listType: 'grid',
		samples: samples
	});

ready(function () {
	var names = window.document.location.search.substring(1).split('&'),
		name = names[0],
		Sample;

	if (samples[name] && names.length === 2 && name !== 'Garnet') {
		Sample = kind({
			classes: 'enyo-fit g-sample',
			style: 'background:white;',
			components: [
				{content: '<', classes: 'g-sample-header g-back-enyo', ontap: 'goBack'},
				{kind:Scroller, style: 'width:100%; height:100%;', components:[
					{kind:samples[name], style: 'padding-bottom: 60px;'},
				]}
			],
			goBack: function() {
				global.history.go(-1);
				return false;
			}
		});
	} else {
		Sample = samples[name] || List;
	}
	new Sample().renderInto(document.body);
});

module.exports = {
	samples: samples,
	List: List
};
