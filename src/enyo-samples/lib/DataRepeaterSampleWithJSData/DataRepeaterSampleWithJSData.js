var
	kind = require('enyo/kind');

var
	Binding = require('enyo/Binding');

var
	DataRepeaterSample = require('../DataRepeaterSample');

module.exports = kind({
	kind: DataRepeaterSample,
	populateList: function () {
		this.collection = DataRepeaterSample.data;
	},
	create: kind.inherit(function (sup) {
		return function () {
			Binding.defaultBindingKind = Binding.PassiveBinding;
			sup.apply(this, arguments);
		};
	}),
	destroy: kind.inherit(function (sup) {
		return function () {
			Binding.defaultBindingKind = Binding;
			sup.apply(this ,arguments);
		};
	})

});