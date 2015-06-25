var
	kind = require('enyo/kind');

var
	Binding = require('enyo/Binding');

var
	DataGridListSample = require('../DataGridListSample');

module.exports = kind({
	kind: DataGridListSample,
	populateList: function () {
		this.collection = DataGridListSample.data;
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