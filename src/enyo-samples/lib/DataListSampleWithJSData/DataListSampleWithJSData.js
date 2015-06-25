var
	kind = require('enyo/kind');

var
	Binding = require('enyo/Binding');

var
	DataListSample = require('../DataListSample');

module.exports = kind({
	kind: DataListSample,
	populateList: function () {
		this.collection = DataListSample.data;
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
			sup.apply(this.arguments);
		}
	})

});