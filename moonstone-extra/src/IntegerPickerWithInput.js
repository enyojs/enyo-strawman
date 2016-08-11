(function (scope) {
	var require, manifest, exported, entries;

	// if there is already a global require method exposed from somewhere we will find it now
	require = scope.require;

	// below is where the generated manifest will be placed
	manifest = {'src/views/main':[function (module,exports,global,require,request){
/*jslint white: true*/
var
    kind = require('enyo/kind');
var
    IntegerPickerWithInput = require('moonstone/IntegerPickerWithInput'),
    InputDecorator = require('moonstone/InputDecorator'),
    IntegerPicker = require('moonstone/IntegerPicker'),
    SimpleIntegerPicker = require('moonstone/SimpleIntegerPicker'),
    DataList = require('moonstone/DataList'),
    Collection = require('enyo/Collection'),
    enyoInput = require('enyo/Input')
Input = require('moonstone/Input');


module.exports = kind({
    name: "containerMain",
    classes: "wrapperClass",
    components: [{
            name: 'title',
            content: "Sample for IntegerPickerWithInput",
            tag: 'h2'
        }, {
            name: 'title2',
            content: "Clicking the Enter/Ok button on the component enables 'Input field' in the component.",
            tag: 'p'
        }, {
            name: 'title3',
            content: "After the value is inputted, confirm the number by pressing Enter/Ok button again.",
            tag: 'p'
        }, {
            name: "newPickerSample",
            components: [{
                content: "Contrast :",
                tag: "span"
            }, {
                kind: IntegerPickerWithInput,
                type: 'number',
                name: 'newIntegerPicker',
                min: -10,
                max: 10,
                unit: ''
            }]
        }, {
            name: "newPickerSample2",
            components: [{
                content: "Brightnesss :",
                tag: "span"
            }, {
                kind: IntegerPickerWithInput,
                type: 'number',
                name: 'newIntegerPicker2',
                min: 1,
                value: 50,
                max: 100,
                unit: ''
            }]
        }, {
            name: "newPickerSample3",
            components: [{
                content: "Volume :",
                tag: "span"
            }, {
                kind: IntegerPickerWithInput,
                type: 'number',
                name: 'newIntegerPicker3',
                value: 45,
                min: 1,
                max: 100,
                unit: ''
            }]
        }

    ],
    handlers: {
        onSpotlightDown: "spottedOnInput"
    },
    spottedOnInput: function() {},
    create: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
        };
    })

});

}],'src/apps/Application':[function (module,exports,global,require,request){
var kind = require('enyo/kind');
var Application = require('enyo/Application');
var MainView = require('./../views/main');

module.exports = kind({
    name: "MyApp.Application",
    kind: Application,
    view: MainView
})

},{'./../views/main':'src/views/main'}],'index':[function (module,exports,global,require,request){
var
	ready = require('enyo/ready');
var
	MyApp = require('./src/apps/Application');

ready(function () {
	new MyApp({
		name: "app"
	});
});
},{'./src/apps/Application':'src/apps/Application'}]
	};


	// below is where the generated entries list will be assigned if there is one
	entries = ['index'];


	// if a different require exists then we can't actually work because we don't know the call-
	// pattern of the existing function to be able to consume it
	// @todo it could be possible to use an alternate name internally when another one exists but
	// this would lead to inconsistency of expectations to end-devs in the promise that we expose
	// our module's via the require function
	if (require && !require.hasOwnProperty('enyo')) {
		throw new Error('Incompatible require function found in scope');
	}
	if (!require || typeof require != 'function') {
		require = scope.require = function (target) {
			var entry, exports, ctx, map, mod, value, lreq;
			// it may have already been resolved
			if (exported.hasOwnProperty(target)) return exported[target];
			entry = manifest[target];
			if (!entry) throw new Error(
				'Could not find the required module: "' + target + '"'
			);
			if (!(entry instanceof Array)) {
				if (typeof entry == 'object' && (entry.source || entry.style)) {
					throw new Error(
						'Attempt to require a requested module: "' + target + '"'
					);
				} else if (typeof entry == 'string') {
					throw new Error(
						'Attempt to require a bundle entry: "' + target + '"'
					);
				}
				throw new Error(
					'The shared manifest has been corrupted, the module is invalid: "' + target + '"'
				);
			}
			mod = entry[0];
			map = entry[1];
			if (typeof mod != 'function') throw new Error(
				'The shared manifest has been corrupted, the module is invalid: "' + target + '"'
			);
			ctx = {exports: {}};
			if (scope.request) {
				if (map) {
					lreq = function (name) {
						return scope.request(map.hasOwnProperty(name) ? map[name] : name);
					};
					lreq.isRequest = scope.request.isRequest;
				} else lreq = scope.request;
			}
			mod(
				ctx,
				ctx.exports,
				scope,
				// primarily for sanity/debugging will give a little bit more context when errors
				// are encountered
				!map ? scope.require : function (name) {
					return require(map.hasOwnProperty(name) ? map[name] : name);
				},
				lreq
			);
			exports = exported[target] = ctx.exports;
			return exports;
		};
		if (Object.defineProperty) Object.defineProperty(require, 'enyo', {
			value: true,
			enumerable: false,
			configurable: false,
			writable: false
		});
		else require.enyo = true;
	}

	// in occassions where requests api are being used, below this comment that implementation will
	// be injected
	

	// if another bundle has already established the shared manifest we need to update it with
	// our modules
	if (require.manifest) {
		Object.keys(manifest).forEach(function (key) {
			var value = manifest[key], existing;
			if ((existing = require.manifest[key])) {
				// if it is an array, we automatically accept it because it is a module definition
				// and one definition should never overwrite another, the potential fail cases are
				// if two requested bundles reference another external bundle and the second
				// removes the first one
				if (!(value instanceof Array)) return;
			}
			require.manifest[key] = value;
		});
		manifest = require.manifest;
		exported = require.exported;
	}
	// otherwise we need to set it to our manifest
	else {
		if (Object.defineProperties) {
			Object.defineProperties(require, {
				manifest: {
					value: manifest,
					enumerable: false,
					configurable: false,
					writable: false
				},
				exported: {
					value: (exported = {}),
					enumerable: false,
					configurable: false,
					writable: false
				}
			});
		} else {
			require.manifest = manifest;
			require.exported = (exported = {});
		}
	}

	// if this bundle contains any entries that need to be executed it will do that now
	if (entries && entries instanceof Array) entries.forEach(function (name) { require(name); });
})(this);
//# sourceMappingURL=IntegerPickerDemoSample.js.map