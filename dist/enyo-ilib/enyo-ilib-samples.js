(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = ['index'];


	if (local) {
		Object.keys(local).forEach(function (name) {
			var value = local[name];
			if (manifest.hasOwnProperty(name)) {
				if (!value || !(value instanceof Array)) return;
			}
			manifest[name] = value;
		});
	}

	function defineProperty (o, p, d) {
		if (Object.defineProperty) return Object.defineProperty(o, p, d);
		o[p] = d.value;
		return o;
	}
	
	function enyoRequire (target) {
		if (!target || typeof target != 'string') return undefined;
		if (exported.hasOwnProperty(target))      return exported[target];
		var   request = enyo.request
			, entry   = manifest[target]
			, exec
			, map
			, ctx
			, reqs
			, reqr;
		if (!entry) throw new Error('Could not find module "' + target + '"');
		if (!(entry instanceof Array)) {
			if (typeof entry == 'object' && (entry.source || entry.style)) {
				throw new Error('Attempt to require an asynchronous module "' + target + '"');
			} else if (typeof entry == 'string') {
				throw new Error('Attempt to require a bundle entry "' + target + '"');
			} else {
				throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
			}
		}
		exec = entry[0];
		map  = entry[1];
		if (typeof exec != 'function') throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
		ctx  = {exports: {}};
		if (request) {
			if (map) {
				reqs = function (name) {
					return request(map.hasOwnProperty(name) ? map[name] : name);
				};
				defineProperty(reqs, 'isRequest', {value: request.isRequest});
			} else reqs = request;
		}
		reqr = !map ? require : function (name) {
			return require(map.hasOwnProperty(name) ? map[name] : name);
		};
		exec(
			ctx,
			ctx.exports,
			scope,
			reqr,
			reqs
		);
		return exported[target] = ctx.exports;
	}

	// in occassions where requests api are being used, below this comment that implementation will
	// be injected
	

	// if there are entries go ahead and execute them
	if (entries && entries.forEach) entries.forEach(function (name) { require(name); });
})(this, function () {
	// this allows us to protect the scope of the modules from the wrapper/env code
	return {'src/ResBundle':[function (module,exports,global,require,request){
var
	ResBundle = require('enyo-ilib/ResBundle');

module.exports = new ResBundle();
}],'../strawman/LinkSupport':[function (module,exports,global,require,request){
/*
 * LinkSupport
 *
 * Add automatic on-tap support for controls with a href attribute
 */

require('enyo');

var
	kind = require('enyo/kind');

module.exports = {
	name: 'LinkSupport',
	tap: kind.inherit(function (sup) {
		return function (sender, ev) {
			sup.apply(this, arguments);
			var link = this.get('href') || ev.originator.get('href') || ev.originator.parent.get('href');
			if (link) {
				ev.preventDefault();
				window.location.href = link;
			}
		};
	})
};

}],'../strawman/Title':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

module.exports = kind({
	tag: 'h1'
});

}],'../strawman/AppRouter':[function (module,exports,global,require,request){
/*
 * AppRouter
 *
 * Hash sample routing for Enyo Strawman samples.
 */

require('enyo');

var
	kind = require('enyo/kind'),
	Router = require('enyo/Router');

module.exports = kind({
	kind: Router,
	useHistory: true,
	triggerOnStart: true,
	routes: [
		{path: ':sampleName/:locale', handler: 'handleRoute'},
		{path: ':sampleName', handler: 'handleRoute'},
		{path: '/:locale', handler: 'handleRouteLocaleOnly'}
	],
	events: {
		onRouteChange: ''
	},
	handleRoute: function (sampleName, locale) {
		this.doRouteChange({sampleName: sampleName, locale: locale || 'local'});
	},
	handleRouteLocaleOnly: function (locale) {
		this.handleRoute(null, locale);
	}
});


}],'../strawman/Link':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	LinkSupport = require('../LinkSupport');

module.exports = kind({
	name: 'Link',
	kind: Control,
	tag: 'span',
	classes: 'link',
	spotlight: true,
	mixins: [LinkSupport],
	badgeClassesChanged: function (was, is) {
		if (was) this.addRemoveClasses(was, false);
		if (is) this.addRemoveClasses(is, true);
	},
	addRemoveClasses: function (classes, state) {
		if (classes) {
			classes = classes.split(/\s+/);
			for (var i = 0; i < classes.length; i++) {
				this.addRemoveClass(classes[i], state);
			}
		}
	}
});

},{'../LinkSupport':'../strawman/LinkSupport'}],'src/ChooseLocale':[function (module,exports,global,require,request){
var
    kind = require('enyo/kind'),
    ilib = require('enyo-ilib');

var
    Select = require('enyo/Select');


module.exports = kind({
    name: 'ilib.sample.ChooseLocale',
    tag: 'span',

    published: {
        'value': 'en-US'
    },

    locales: [
        {locale: 'sq-AL', label: 'Albanian - Albania', label_ol: 'shqipe - Shqipëri'},
        {locale: 'sq-ME', label: 'Albanian - Montenegro', label_ol: 'shqipe - Montenegro'},
        {locale: 'ar-DZ', label: 'Arabic - Algeria', label_ol: 'العربية - الجزائر'},
        {locale: 'ar-BH', label: 'Arabic - Bahrain', label_ol: 'العربية - البحرين'},
        {locale: 'ar-DJ', label: 'Arabic - Djibouti', label_ol: 'العربية - جيبوتي'},
        {locale: 'ar-EG', label: 'Arabic - Egypt', label_ol: 'العربية - مصر'},
        {locale: 'ar-IQ', label: 'Arabic - Iraq', label_ol: 'العربية - العراق'},
        {locale: 'ar-JO', label: 'Arabic - Jordan', label_ol: 'العربية - الأردن'},
        {locale: 'ar-KW', label: 'Arabic - Kuwait', label_ol: 'العربية - الكويت'},
        {locale: 'ar-LB', label: 'Arabic - Lebanon', label_ol: 'العربية - لبنان'},
        {locale: 'ar-LY', label: 'Arabic - Libya', label_ol: 'العربية - ليبيا'},
        {locale: 'ar-MR', label: 'Arabic - Mauritania', label_ol: 'العربية - موريتانيا'},
        {locale: 'ar-MA', label: 'Arabic - Morocco', label_ol: 'العربية - مغربي'},
        {locale: 'ar-OM', label: 'Arabic - Oman', label_ol: 'العربية - عمان'},
        {locale: 'ar-QA', label: 'Arabic - Qatar', label_ol: 'العربية - قطر'},
        {locale: 'ar-SA', label: 'Arabic - Saudi Arabia', label_ol: 'العربية - العربية السعودية'},
        {locale: 'ar-SD', label: 'Arabic - Sudan', label_ol: 'العربية - سودان'},
        {locale: 'ar-SY', label: 'Arabic - Syria', label_ol: 'العربية - سوريا'},
        {locale: 'ar-TN', label: 'Arabic - Tunisia', label_ol: 'العربية - تونس'},
        {locale: 'ar-AE', label: 'Arabic - UAE', label_ol: 'العربية - الأمارات العربية المتحدة'},
        {locale: 'ar-YE', label: 'Arabic - Yemen', label_ol: 'العربية - يمني'},
        {locale: 'bs-Latn-BA', label: 'Bosnian - Bosnia', label_ol: 'bosanski - Bosna i Hercegovina'},
        {locale: 'bs-Latn-ME', label: 'Bosnian - Montenegro', label_ol: 'bosanski - Montenegro'},
        {locale: 'bg-BG', label: 'Bulgarian - Bulgaria', label_ol: 'български - България'},
        {locale: 'zh-Hans-CN', label: 'Chinese - China', label_ol: '中文 - 简体'},
        {locale: 'zh-Hant-HK', label: 'Chinese - Hong Kong', label_ol: '中文 - 繁体'},
        {locale: 'zh-Hant-MY', label: 'Chinese - Malaysia', label_ol: '中文 - 馬來西亞'},
        {locale: 'zh-Hans-SG', label: 'Chinese - Singapore', label_ol: '中文 - 新加坡'},
        {locale: 'zh-Hant-TW', label: 'Chinese - Taiwan', label_ol: '中文 - 台灣'},
        {locale: 'hr-HR', label: 'Croatian - Croatia', label_ol: 'Hrvatski - Hrvatska'},
        {locale: 'hr-ME', label: 'Croatian - Montenegro', label_ol: 'Hrvatski - Montenegro'},
        {locale: 'cz-CZ', label: 'Czech - Czech Republic', label_ol: 'Český - Česká republika'},
        {locale: 'da-DK', label: 'Danish - Denmark', label_ol: 'dansk - Danmark'},
        {locale: 'nl-BE', label: 'Dutch - Belgium', label_ol: 'Nederlands - België'},
        {locale: 'nl-NL', label: 'Dutch - Netherlands', label_ol: 'Nederlands - Nederland'},
        {locale: 'en-AM', label: 'English - Armenia', label_ol: 'English - Armenia'},
        {locale: 'en-AU', label: 'English - Australia', label_ol: 'English - Australia'},
        {locale: 'en-AZ', label: 'English - Azerbaijan', label_ol: 'English - Azerbaijan'},
        {locale: 'en-CA', label: 'English - Canada', label_ol: 'English - Canada'},
        {locale: 'en-ET', label: 'English - Ethiopia', label_ol: 'English - Ethiopia'},
        {locale: 'en-GM', label: 'English - Gambia', label_ol: 'English - Gambia'},
        {locale: 'en-GH', label: 'English - Ghana', label_ol: 'English - Ghana'},
        {locale: 'en-HK', label: 'English - Hong Kong', label_ol: 'English - Hong Kong'},
        {locale: 'en-IS', label: 'English - Iceland', label_ol: 'English - Iceland'},
        {locale: 'en-IN', label: 'English - India', label_ol: 'English - India'},
        {locale: 'en-IE', label: 'English - Ireland', label_ol: 'English - Ireland'},
        {locale: 'en-KE', label: 'English - Kenya', label_ol: 'English - Kenya'},
        {locale: 'en-LR', label: 'English - Liberia', label_ol: 'English - Liberia'},
        {locale: 'en-MW', label: 'English - Malawi', label_ol: 'English - Malawi'},
        {locale: 'en-MY', label: 'English - Malaysia', label_ol: 'English - Malaysia'},
        {locale: 'en-MM', label: 'English - Myanmar', label_ol: 'English - Myanmar'},
        {locale: 'en-NZ', label: 'English - New Zealand', label_ol: 'English - New Zealand'},
        {locale: 'en-NG', label: 'English - Nigeria', label_ol: 'English - Nigeria'},
        {locale: 'en-PK', label: 'English - Pakistan', label_ol: 'English - Pakistan'},
        {locale: 'en-PH', label: 'English - Philippines', label_ol: 'English - Philippines'},
        {locale: 'en-PR', label: 'English - Puerto Rico', label_ol: 'English - Puerto Rico'},
        {locale: 'en-RW', label: 'English - Rwanda', label_ol: 'English - Rwanda'},
        {locale: 'en-SL', label: 'English - Sierra Leone', label_ol: 'English - Sierra Leone'},
        {locale: 'en-SG', label: 'English - Singapore', label_ol: 'English - Singapore'},
        {locale: 'en-ZA', label: 'English - South Africa', label_ol: 'English - South Africa'},
        {locale: 'en-LK', label: 'English - Sri Lanka', label_ol: 'English - Sri Lanka'},
        {locale: 'en-SD', label: 'English - Sudan', label_ol: 'English - Sudan'},
        {locale: 'en-TZ', label: 'English - Tanzania', label_ol: 'English - Tanzania'},
        {locale: 'en-GB', label: 'English - UK', label_ol: 'English - UK'},
        {locale: 'en-US', label: 'English - USA', label_ol: 'English - USA'},
        {locale: 'en-UG', label: 'English - Uganda', label_ol: 'English - Uganda'},
        {locale: 'en-ZM', label: 'English - Zambia', label_ol: 'English - Zambia'},
        {locale: 'et-EE', label: 'Estonian - Estonia', label_ol: 'eesti - Eesti'},
        {locale: 'fa-AF', label: 'Farsi - Afghanistan', label_ol: 'فارسی - جمهوری اسلامی ایران'},
        {locale: 'fa-IR', label: 'Farsi - Iran', label_ol: 'فارسی - جمهوری اسلامی افغانستان'},
        {locale: 'fi-FI', label: 'Finnish - Finland', label_ol: 'suomi - Suomi'},
        {locale: 'fr-DZ', label: 'French - Algeria', label_ol: 'français - Algérie'},
        {locale: 'fr-BE', label: 'French - Belgium', label_ol: 'français - Belgique'},
        {locale: 'fr-BJ', label: 'French - Benin', label_ol: 'français - Bénin'},
        {locale: 'fr-BF', label: 'French - Burkina Faso', label_ol: 'français - Burkina Faso'},
        {locale: 'fr-CM', label: 'French - Cameroon', label_ol: 'français - Cameroun'},
        {locale: 'fr-CA', label: 'French - Canada', label_ol: 'français - Canada'},
        {locale: 'fr-CF', label: 'French - Central African Republic', label_ol: 'français - République centrafricaine'},
        {locale: 'fr-CD', label: 'French - Democratic Republic of the Congo', label_ol: 'français - République démocratique du Congo'},
        {locale: 'fr-DJ', label: 'French - Djibouti', label_ol: 'français - Djibouti'},
        {locale: 'fr-CQ', label: 'French - Equatorial Guinea', label_ol: 'français - Guinée équatoriale'},
        {locale: 'fr-FR', label: 'French - France', label_ol: 'français - France'},
        {locale: 'fr-GA', label: 'French - Gabon', label_ol: 'français - Gabon'},
        {locale: 'fr-GN', label: 'French - Guinea', label_ol: 'français - Guinée'},
        {locale: 'fr-CI', label: 'French - Ivory Coast', label_ol: 'français - Côte-d\'Ivoire'},
        {locale: 'fr-LB', label: 'French - Lebanon', label_ol: 'français - Liban'},
        {locale: 'fr-LU', label: 'French - Luxemburg', label_ol: 'français - Luxembourg'},
        {locale: 'fr-ML', label: 'French - Mali', label_ol: 'français - Mali'},
        {locale: 'fr-CG', label: 'French - Republic of the Congo (Congo-Brazzaville)', label_ol: 'français - République du Congo'},
        {locale: 'fr-RW', label: 'French - Rwanda', label_ol: 'français - Rwanda'},
        {locale: 'fr-SN', label: 'French - Senegal', label_ol: 'français - Sénégal'},
        {locale: 'fr-CH', label: 'French - Swizerland', label_ol: 'français - Suisse'},
        {locale: 'fr-TG', label: 'French - Togo', label_ol: 'français - Togo'},
        {locale: 'ga-IE', label: 'Gaelic - Ireland', label_ol: 'Gaeilge - Éire'},
        {locale: 'de-AT', label: 'German - Austria', label_ol: 'Deutsch - Österreich'},
        {locale: 'de-DE', label: 'German - Germany', label_ol: 'Deutsch - Deutschland'},
        {locale: 'de-LU', label: 'German - Luxemburg', label_ol: 'Deutsch - Luxemburg'},
        {locale: 'de-CH', label: 'German - Swizerland', label_ol: 'Deutsch - Schweiz'},
        {locale: 'el-CY', label: 'Greek - Cyprus', label_ol: 'Ελληνική - Κύπρος'},
        {locale: 'el-GR', label: 'Greek - Greece', label_ol: 'Ελληνική - Ελλάδα'},
        {locale: 'he-IL', label: 'Hebrew - Israel', label_ol: 'עברית - ישראל'},
        {locale: 'hi-IN', label: 'Hindi - India', label_ol: 'हिन्दी - भारत'},
        {locale: 'hu-HU', label: 'Hungarian - Hungary', label_ol: 'magyar - Magyarország'},
        {locale: 'id-ID', label: 'Indonesian - Indonesia', label_ol: 'bahasa Indonesia - Indonesia'},
        {locale: 'it-IT', label: 'Italian - Italy', label_ol: 'italiano - Italia'},
        {locale: 'it-CH', label: 'Italian - Swizerland', label_ol: 'italiano - Svizzeria'},
        {locale: 'ja-JP', label: 'Japanese - Japan', label_ol: '日本語 - 日本'},
        {locale: 'kk-Cyrl-KZ', label: 'Kazahk - Kazakhstan', label_ol: 'қазақ тілі - Қазақстан Республикасы'},
        {locale: 'ko-KR', label: 'Korean - Korea', label_ol: '한국어 - 한국'},
        {locale: 'ku-Arab-IQ', label: 'Kurdish - Iraq', label_ol: 'کوردی - العـراق'},
        {locale: 'lv-LV', label: 'Latvian - Latvia', label_ol: 'Latvijas - Latvija'},
        {locale: 'lt-LT', label: 'Lithuanian - Lithuania', label_ol: 'lietuviešu - Lietuva'},
        {locale: 'mk-MK', label: 'Macedonian - Macedonia', label_ol: 'македонски - Поранешна Југословенска Република Македонија'},
        {locale: 'ms-MY', label: 'Malaysian - Malaysia', label_ol: 'bahasa Melayu - Malaysia'},
        {locale: 'ms-SG', label: 'Malaysian - Singapore', label_ol: 'bahasa Melayu - Singapore'},
        {locale: 'mn-Cyrl-MN', label: 'Mongolian - Mongolia', label_ol: 'Монгол хэл - Монгол улс'},
        {locale: 'nb-NO', label: 'Norwegian - Norway', label_ol: 'norsk - Norge'},
        {locale: 'pl-PL', label: 'Polish - Poland', label_ol: 'polski - Polska'},
        {locale: 'pt-AO', label: 'Portuguese - Angola', label_ol: 'português - Angola'},
        {locale: 'pt-BR', label: 'Portuguese - Brazil', label_ol: 'português - Brasil'},
        {locale: 'pt-CV', label: 'Portuguese - Cape Verde', label_ol: 'português - Ilhas de Cabo Verde'},
        {locale: 'pt-CQ', label: 'Portuguese - Equatorial Guinea', label_ol: 'português - Guiné Equatorial'},
        {locale: 'pt-PT', label: 'Portuguese - Portugal', label_ol: 'português - Portugal'},
        {locale: 'ro-RO', label: 'Romanian - Romania', label_ol: 'română - România'},
        {locale: 'ru-BY', label: 'Russian - Belarus', label_ol: 'русский - Беларусь'},
        {locale: 'ru-GE', label: 'Russian - Georgia', label_ol: 'русский - Грузия'},
        {locale: 'ru-KG', label: 'Russian - Kyrgyzstan', label_ol: 'русский - Киргизия'},
        {locale: 'ru-KZ', label: 'Russian - Kazahkstan', label_ol: 'русский - Казахстан'},
        {locale: 'ru-RU', label: 'Russian - Russia', label_ol: 'русский - Русские Федерации'},
        {locale: 'ru-UA', label: 'Russian - Ukraine', label_ol: 'русский - Украина'},
        {locale: 'sr-Latn-ME', label: 'Serbian - Montenegro', label_ol: 'srpski - Montenegro'},
        {locale: 'rs-Latn-RS', label: 'Serbian - Serbia', label_ol: 'srpski - Srbija'},
        {locale: 'sk-SK', label: 'Slovakian - Slovakia', label_ol: 'slovenský - Slovensko'},
        {locale: 'sl-SI', label: 'Slovenian - Slovenia', label_ol: 'Slovenski - Slovenija'},
        {locale: 'es-AR', label: 'Spanish - Argentina', label_ol: 'español - Argentina'},
        {locale: 'es-BO', label: 'Spanish - Bolivia', label_ol: 'español - Bolivia'},
        {locale: 'es-CL', label: 'Spanish - Chile', label_ol: 'español - Chile'},
        {locale: 'es-CO', label: 'Spanish - Colombia', label_ol: 'español - Colombia'},
        {locale: 'es-CR', label: 'Spanish - Costa Rica', label_ol: 'español - Costa Rica'},
        {locale: 'es-DO', label: 'Spanish - Dominican Republic', label_ol: 'español - República Dominicana'},
        {locale: 'es-EC', label: 'Spanish - Ecuador', label_ol: 'español - Ecuador'},
        {locale: 'es-SV', label: 'Spanish - El Salvador', label_ol: 'español - El Salvador'},
        {locale: 'es-GQ', label: 'Spanish - Equatorial Guinea', label_ol: 'español - Guinea Ecuatorial'},
        {locale: 'es-GT', label: 'Spanish - Guatemala', label_ol: 'español - Guatamala'},
        {locale: 'es-HN', label: 'Spanish - Honduras', label_ol: 'español - Honduras'},
        {locale: 'es-MX', label: 'Spanish - Mexico', label_ol: 'español - México'},
        {locale: 'es-NI', label: 'Spanish - Nicaragua', label_ol: 'español - Nicaragua'},
        {locale: 'es-PA', label: 'Spanish - Panama', label_ol: 'español - Panamá'},
        {locale: 'es-PY', label: 'Spanish - Paraguay', label_ol: 'español - Paraguay'},
        {locale: 'es-PE', label: 'Spanish - Peru', label_ol: 'español - Perú'},
        {locale: 'es-PH', label: 'Spanish - Philippines', label_ol: 'español - Filipinas'},
        {locale: 'es-PR', label: 'Spanish - Puerto Rico', label_ol: 'español - Puerto Rico'},
        {locale: 'es-ES', label: 'Spanish - Spain', label_ol: 'español - España'},
        {locale: 'es-US', label: 'Spanish - USA', label_ol: 'español - Estados Unidos'},
        {locale: 'es-UY', label: 'Spanish - Uruguay', label_ol: 'español - Uruguay'},
        {locale: 'es-VE', label: 'Spanish - Venezuela', label_ol: 'español - Venezuela'},
        {locale: 'sv-FI', label: 'Swedish - Finland', label_ol: 'svenska - Finland'},
        {locale: 'sv-SE', label: 'Swedish - Sweden', label_ol: 'svenska - Sverige'},
        {locale: 'th-TH', label: 'Thai - Thailand', label_ol: 'ภาษาไทย - ประเทศไทย'},
        {locale: 'tr-AM', label: 'Turkish - Armenia', label_ol: 'Türk - Ermenistan'},
        {locale: 'tr-AZ', label: 'Turkish - Azerbaijan', label_ol: 'Türk - Azerbeycan'},
        {locale: 'tr-CY', label: 'Turkish - Cyprus', label_ol: 'Türk - Kıbrıs'},
        {locale: 'tr-TR', label: 'Turkish - Turkey', label_ol: 'Türk - Türkiye'},
        {locale: 'uk-UA', label: 'Ukranian - Ukraine', label_ol: 'Українська - Україна'},
        {locale: 'uz-Cyrl-UZ', label: 'Uzbek - Uzbekistan', label_ol: 'Ўзбек - Ўзбекистон Республикаси'},
        {locale: 'uz-Latn-UZ', label: 'Uzbek - Uzbekistan', label_ol: 'Oʻzbek - O‘zbekiston Respublikasi'},
        {locale: 'vi-VN', label: 'Vietnamese - Vietnam', label_ol: 'Việt - Việt Nam'},
        {locale: 'as-IN', label: 'Assamese - India', label_ol: 'অসমীয়া - ভাৰত'},
        {locale: 'bn-IN', label: 'Bengali - India', label_ol: 'বাংলা - ভারত'},
        {locale: 'gu-IN', label: 'Gujarati - India', label_ol: 'ગુજરાતી - ભારત'},
        {locale: 'kn-IN', label: 'Kannada - India', label_ol: 'ಕನ್ನಡ - ಭಾರತ'},
        {locale: 'ml-IN', label: 'Malayalam - India', label_ol: 'മലയാളം - ഇന്ത്യ'},
        {locale: 'mr-IN', label: 'Marathi - India', label_ol: 'मराठी - भारत'},
        {locale: 'pa-IN', label: 'Punjabi - India', label_ol: 'ਪੰਜਾਬੀ - ਭਾਰਤ'},
        {locale: 'pa-PK', label: 'Punjabi - Pakistan', label_ol: 'ਪੰਜਾਬੀ - ਪਾਕਿਸਤਾਨ'},
        {locale: 'ta-IN', label: 'Tamil - India', label_ol: 'தமிழ் - இந்தியா'},
        {locale: 'te-IN', label: 'Telugu - India', label_ol: 'తెలుగు - ఇండియా'},
        {locale: 'ur-IN', label: 'Urdu - India', label_ol: 'بھارت -  اُردُو'},
        {locale: 'ur-PK', label: 'Urdu - Pakistan', label_ol: 'پاکستان -  اُردُو'}
    ],

    components: [
        {name: 'switcherLocale', kind: Select, onchange: 'setLocale'}
    ],

    create: function () {
        this.inherited(arguments);
        var curLocale = ilib.getLocale();
        for(var i = 0; i < this.locales.length; i++) {
            this.$.switcherLocale.createComponent({value: this.locales[i].locale, content: this.locales[i].locale +' ('+ this.locales[i].label +' / '+ this.locales[i].label_ol +')', selected: this.locales[i].locale.toLowerCase() === curLocale.toLowerCase()});
        }
    },

    setLocale: function (sender, ev) {
        this.setValue(this.$.switcherLocale.value);
        this.bubble('onSelectedLocale', {content: this.$.switcherLocale.value});
    }
});
}],'src/ChooseCurrency':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Select = require('enyo/Select');

var
	Currency = require('enyo-ilib/Currency'),
	LocaleInfo = require('enyo-ilib/LocaleInfo');

var
	rb = require('./ResBundle');

module.exports = kind({
	name: 'ilib.sample.ChooseCurrency',

	published: {
		'value': ''
	},

	components: [
		{content: rb.getString('Currency'), classes: 'ilib-onyx-sample-divider'},
		{name: 'currencies', kind: Select, onselect: 'setCurrency'}
	],

	create: function () {
		this.inherited(arguments);
		this.initCurrencies();
		this.value = this.$.currencies.selected.content;
	},

	initCurrencies: function () {
		var currencies = Currency.getAvailableCurrencies();
		for (var i = 0; i < currencies.length; ++i) {
			this.$.currencies.createComponent({content: currencies[i]});
		}
		// pre-selects the current locale's currency
		this.selectCurrency();
	},

	selectCurrency: function (locale) {
		var li = new LocaleInfo(locale);
		var currency = li['info'].currency;
		var components = this.$.currencies.getClientControls();
		var selected;
		if (components[0])
			selected = components[0];
		for (var i = 0; i < components.length; ++i)
			if (components[i].content === currency) {
				selected = components[i];
				break;
			}
		this.$.currencies.setSelected(selected);
	},

	setCurrency: function (sender, ev) {
		this.setValue(ev.selected.content);
		this.bubble('onSelectedCurrency', {content: ev.selected.content});
	}
});

},{'./ResBundle':'src/ResBundle'}],'src/AddressFormatting':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Input = require('enyo/Input');

var
	Address = require('enyo-ilib/Address'),
	AddressFmt = require('enyo-ilib/AddressFmt');

var
	ChooseLocale = require('./ChooseLocale'),
	rb = require('./ResBundle');

module.exports = kind({
	name: 'ilib.sample.AddressFormatting',
	kind: Control,

	components: [
		{style: 'margin: 10px;', components: [
			{kind: ChooseLocale, name: 'localeSelector'},
			{tag: 'span', style: 'display: inline-block; width: 20px'},
			{kind: Button, content: rb.getString('Apply'), ontap: 'calcFormat', style: 'vertical-align: bottom;', classes: 'onyx-affirmative'}
		]},
		{classes: 'sample-result-box', components: [
			{classes: 'sample-result-box-header', content: rb.getString('Street Address')},
			{tag: 'label', components: [
				{kind: Input, style: 'width:100%', name: 'stAddress',placeholder: rb.getString('Enter Street')}
			]}
		]},
		{classes: 'sample-result-box', components: [
			{classes: 'sample-result-box-header', content: rb.getString('City/Locality')},
			{tag: 'label', components: [
				{kind: Input, style: 'width:100%', name: 'city', placeholder: rb.getString('Enter city')}
			]}
		]},
		{classes: 'sample-result-box', components: [
			{classes: 'sample-result-box-header', content: rb.getString('postal code/Zip')},
			{tag: 'label', components: [
				{kind: Input, style: 'width:100%', name: 'postalCode', placeholder: rb.getString('Enter postalcode')}
			]}
		]},
		{classes: 'sample-result-box', components: [
			{classes: 'sample-result-box-header', content: rb.getString('State/Province')},
			{tag: 'label', components: [
				{kind: Input, style: 'width:100%', name: 'state', placeholder: rb.getString('Enter state')}
			]}
		]},
		{classes: 'sample-result-box', components: [
			{classes: 'sample-result-box-header', content: rb.getString('Country')},
			{tag: 'label', components: [
				{kind: Input, style: 'width:100%', name: 'country', placeholder: rb.getString('Enter Country')}
			]}
		]},
		{classes: 'sample-result-box', components: [
			{classes: 'sample-result-box-header', content: rb.getString('Format result: ')},
			{name: 'rtlResult', allowHtml:true, content: '-', style: 'padding: 10px'}
		]}
	],

	calcFormat: function (sender, ev) {
		// Processing parameters
		var options = {
			locale: this.$.localeSelector.getValue()
		};

		var address = new Address({
			streetAddress:this.$.stAddress.getValue(),
			locality: this.$.city.getValue(),
			postalCode: this.$.postalCode.getValue(),
			region: this.$.state.getValue(),
			country:this.$.country.getValue()
		});

		var formatter = new AddressFmt(options);
		var postFmtData = formatter.format(address);
		this.$.rtlResult.setContent(postFmtData);
	}
});

},{'./ChooseLocale':'src/ChooseLocale','./ResBundle':'src/ResBundle'}],'src/AddressParsing':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Input = require('enyo/Input');

var
	Address = require('enyo-ilib/Address');

var
	ChooseLocale = require('./ChooseLocale'),
	rb = require('./ResBundle');

module.exports = kind({
	name: 'ilib.sample.AddressParsing',
	kind: Control,
	components: [
		{style: 'margin: 10px;', components: [
			{kind: ChooseLocale, name: 'localeSelector'},
			{tag: 'span', style: 'display: inline-block; width: 20px'},
			{kind: Button, content: rb.getString('Apply'), ontap: 'calcFormat', style: 'vertical-align: bottom;', classes: 'onyx-affirmative'}
		]},
		{classes: 'sample-result-box', components: [
			{classes: 'sample-result-box-header', content: rb.getString('Address')},
			{tag: 'label', components: [
				{kind: Input, style: 'width:100%', name: 'address', placeholder: rb.getString('Enter Address')}
			]}
		]},
		{classes: 'sample-result-box', components: [
			{classes: 'sample-result-box-header', content: rb.getString('Format result: ')},
			{name: 'rtlResult', allowHtml: true, content: '-', style: 'padding: 10px'}
		]}
	],

	calcFormat: function (sender, ev) {
		// Formatting
		var parsedAddress = new Address(this.$.address.getValue());

		var output = '';

		if (parsedAddress) {
			if (parsedAddress.streetAddress) {
				output += 'streetAddress: ' + parsedAddress.streetAddress + '<br>';
			}
			if (parsedAddress.locality) {
				output += 'locality: ' + parsedAddress.locality + '<br>';
			}
			if (parsedAddress.region) {
				output += 'region: ' + parsedAddress.region + '<br>';
			}
			if (parsedAddress.postalCode) {
				output += 'Postal code: ' + parsedAddress.postalCode + '<br>';
			}
			if (parsedAddress.country) {
				output += 'country: ' + parsedAddress.country + '<br>';
			}
			if (parsedAddress.countryCode) {
				output += 'countryCode: ' + parsedAddress.countryCode + '<br>';
			}
		}

		this.$.rtlResult.setContent(output);
	}
});

},{'./ChooseLocale':'src/ChooseLocale','./ResBundle':'src/ResBundle'}],'src/LocaleInfo':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Group = require('enyo/Group'),
	TextArea = require('enyo/TextArea');

var
	ilib = require('enyo-ilib'),
	LocaleInfo = require('enyo-ilib/LocaleInfo');

var
	ChooseLocale = require('../ChooseLocale'),
	rb = require('../ResBundle');


module.exports = kind({
	name: 'ilib.sample.LocaleInfo',
	classes: 'onyx ilib-onyx-sample enyo-fit',

	components: [
		/* Header with selecting locale */
		{kind: ChooseLocale, onSelectedLocale: 'setLocale'},
		{tag: 'br'},
		{kind: Group, classes: 'onyx-sample-result-box', components: [
			{content: rb.getString('Current Locale')},
			{name: 'currentLocateData', kind: TextArea, style: 'box-sizing: border-box; width: 100%; height: 600px;'}
		]}
	],

	create: function () {
		this.inherited(arguments);
		/* Fill in info on current locale */
		this.printItemLocale(ilib.getLocale());
	},

	setLocale: function (sender, ev) {
		/* Fill in info on selected locale */
		this.printItemLocale(ev.content);
	},

	printItemLocale: function (locale) {
		if (this.$['currentLocateData']) {
			this.$.currentLocateData.destroyComponents();
			this.$.currentLocateData.createComponent({content: 'getLocale : ' + locale, style: 'font-size: 16px'});
			var localeInfo = new LocaleInfo(locale);
			var str = JSON.stringify(localeInfo, null, '\t').replace(/"([^"]+)"/g, '$1').replace(/,$/mg, '');
			this.$.currentLocateData.set('value', str);
		}
	}
});

},{'../ChooseLocale':'src/ChooseLocale','../ResBundle':'src/ResBundle'}],'../strawman/List':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Scroller = require('enyo/Scroller'),
	DataRepeater = require('enyo/DataRepeater');

var
	Link = require('../Link');

module.exports = kind({
	kind: Scroller,
	classes: 'strawman-list enyo-fit',
	samples: null,
	libraryName: '',
	listType: 'list',
	components: [
		{name: 'repeater', classes: 'list-frame', kind: DataRepeater, components: [
			{kind: Link, classes: 'item', bindings: [
				{from: 'model.name', to: 'href', transform: function (v) {
						var href = "#" + v;
						if (!this.owner.libraryName) { href = v + '/index.html'; }
						return href;
					}
				},
				{from: 'model.name', to: 'content', transform: function (v) {
						var name = v.replace(/Sample$/i, '');
						if (!this.owner.libraryName) {
							name = this.owner.samples[v] || name;
						}
						return name;
					}
				},
				{from: 'model.badgeClasses', to: 'badgeClasses'}
			]}
		]}
	],
	bindings: [
		{from: 'samples', to: '$.repeater.collection', transform: function (v) {
				if (!v) { return v; }
				return (v instanceof Collection) ? v : new Collection(Object.keys(v).map(function (key) {
					// Make an object that contains all of the strings and booleans etc that we can use as a model for our sample collection.
					var sampleModel = {name: key};
					for (var prop in v[key]) {
						// Don't bother copying functions
						if (typeof v[key][prop] != 'function') {
							sampleModel[prop] = v[key][prop];
						}
					}
					return sampleModel;
				}));
			}
		}
	],
	create: function () {
		this.inherited(arguments);
		this.listTypeChanged();
	},
	listTypeChanged: function (old) {
		this.$.repeater.removeClass(old);
		this.$.repeater.addClass(this.get('listType'));
	}
});

},{'../Link':'../strawman/Link'}],'src/NameFormatting':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	Checkbox = require('enyo/Checkbox'),
	Group = require('enyo/Group'),
	Input = require('enyo/Input'),
	Scroller = require('enyo/Scroller');

var
	Name = require('enyo-ilib/Name'),
	NameFmt = require('enyo-ilib/NameFmt');

var
	ChooseLocale = require('../ChooseLocale'),
	rb = require('../ResBundle');


module.exports = kind({
	name: 'ilib.sample.NameFormatting',
	classes: 'onyx ilib-onyx-sample enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{components: [
				/* Header with selecting locale */
				{kind: ChooseLocale, name: 'localeSelector'},
				{style: 'width: 20px'},
				{kind: Button, content: rb.getString('Apply'), ontap: 'nameFormat', style: 'vertical-align: bottom;', classes: 'onyx-affirmative'},
				{fit: true}
			]},
			{tag: 'br'},

			{content: rb.getString('Length'), classes: 'ilib-onyx-sample-divider'},
			{kind: Group, defaultKind: Button, name: 'length', onActivate: 'buttonActivated', components: [
				{content: 'Short', active: true, name:'short'},
				{content: 'Medium'},
				{content: 'Long'}
			]},

			{content: rb.getString('(or) Parts'), classes: 'ilib-onyx-sample-divider'},
			{classes: 'namepart', components: [
				{kind: Checkbox, name: 'prefixCbox', content: 'Prefix ', onchange:'checkboxChanged'},
				{kind: Checkbox, name: 'givenCbox',  content: 'Given ',  onchange:'checkboxChanged'},
				{kind: Checkbox, name: 'middleCbox', content: 'Middle ', onchange:'checkboxChanged'},
				{kind: Checkbox, name: 'familyCbox', content: 'Family ',  onchange:'checkboxChanged'},
				{kind: Checkbox, name: 'suffixCbox', content: 'Suffix ',  onchange:'checkboxChanged'}
			]},

			{components: [
				{content: rb.getString('Prefix'), classes: 'ilib-onyx-sample-divider'},
				{kind: Input, name: 'prefixInput', placeholder: rb.getString('Prefix')},
				{content: rb.getString('Given Name'), classes: 'ilib-onyx-sample-divider'},
				{kind: Input, name: 'givenInput', placeholder: rb.getString('Given Name')},
				{content: rb.getString('Middle Name'), classes: 'ilib-onyx-sample-divider'},
				{kind: Input, name: 'middleInput', placeholder: rb.getString('Middle Name')},
				{content: rb.getString('Family Name'), classes: 'ilib-onyx-sample-divider'},
				{kind: Input, name: 'familyInput', placeholder: rb.getString('Family Name')},
				{content: rb.getString('Suffix'), classes: 'ilib-onyx-sample-divider'},
				{kind: Input, name: 'suffixInput', placeholder: rb.getString('Suffix')}
			]}
		]},
		{tag: 'br'},
		{kind: Group, classes:'onyx-sample-result-box', components: [
			{content: rb.getString('Format result:')},
			{name: 'rtlResult', fit: true, content: '-', style: 'padding: 10px'}
		]}
	],

	buttonActivated: function (sender, ev) {

		if (this.$.length.getActive().content === 'Short') {
			this.$.prefixCbox.setChecked(false);
			this.$.givenCbox.setChecked(true);
			this.$.middleCbox.setChecked(false);
			this.$.familyCbox.setChecked(true);
			this.$.suffixCbox.setChecked(false);
		} else if (this.$.length.getActive().content === 'Medium') {
			this.$.prefixCbox.setChecked(false);
			this.$.givenCbox.setChecked(true);
			this.$.middleCbox.setChecked(true);
			this.$.familyCbox.setChecked(true);
			this.$.suffixCbox.setChecked(false);
		} else if (this.$.length.getActive().content === 'Long') {
			this.$.prefixCbox.setChecked(true);
			this.$.givenCbox.setChecked(true);
			this.$.middleCbox.setChecked(true);
			this.$.familyCbox.setChecked(true);
			this.$.suffixCbox.setChecked(true);
		}
	},

	checkboxChanged: function (sender, ev) {
		if (!this.$.prefixCbox.getChecked() && !this.$.givenCbox.getChecked() && !this.$.middleCbox.getChecked() &&
			!this.$.familyCbox.getChecked() && !this.$.suffixCbox.getChecked()) {
			this.$['short'].setActive(true);
		} else {
			this.$.length.setActive(false);
		}
	},

	nameFormat: function (sender, ev) {

		// Processing parameters

		var nameLength = this.$.length.getActive().content;
		var parts = [];

		if (this.$.prefixCbox.getChecked()) {
			parts.push('p');
		}
		if (this.$.givenCbox.getChecked()) {
			parts.push('g');
		}
		if (this.$.middleCbox.getChecked()) {
			parts.push('m');
		}
		if (this.$.familyCbox.getChecked()) {
			parts.push('f');
		}
		if (this.$.suffixCbox.getChecked()) {
			parts.push('s');
		}

		var options = {
			locale : this.$.localeSelector.getValue()
		};

		if (nameLength) {
			options.style = nameLength;
		}

		if (parts.length > 0) {
			options.components = parts.join('');
		}

		var n = {
			prefix: this.$.prefixInput.getValue(),
			givenName: this.$.givenInput.getValue(),
			middleName: this.$.middleInput.getValue(),
			familyName: this.$.familyInput.getValue(),
			suffix: this.$.suffixInput.getValue(),
			locale: this.$.localeSelector.getValue()
		};
		// Formatting
		var name = new Name(n);
		var fmt = new NameFmt(options);
		var postFmtData = 'The name is: ' + fmt.format(name);
		// Output results
		this.$.rtlResult.setContent(postFmtData);
	}
});
},{'../ChooseLocale':'src/ChooseLocale','../ResBundle':'src/ResBundle'}],'src/NameParsing':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Group = require('enyo/Group'),
	Input = require('enyo/Input'),
	Scroller = require('enyo/Scroller');

var
	Name = require('enyo-ilib/Name');

var
	ChooseLocale = require('../ChooseLocale'),
	rb = require('../ResBundle');

module.exports = kind({
	name: 'ilib.sample.NameParsing',
	classes: 'onyx ilib-onyx-sample enyo-fit',
	components: [
		{kind: Scroller, fit: false, components: [
			{components: [
				/* Header with selecting locale */
				{kind: ChooseLocale, name: 'localeSelector'},
				{style: 'width: 20px'},
				{kind: Button, content: rb.getString('Apply'), ontap: 'calcFormat', style: 'vertical-align: bottom;', classes: 'onyx-affirmative'}
			]}
		]},
		{tag: 'br'},
		{kind: Group, classes:'onyx-sample-result-box', components: [
			{content: rb.getString('Name')},
			{kind: Input, style:'width:100%', name: 'name', placeholder: rb.getString('Enter Name')}
		]},
		{tag: 'br'},
		{kind: Group, classes:'onyx-sample-result-box', components: [
			{content: rb.getString('Parsed result:')},
			{name: 'rtlResult', fit: true, content: '-', allowHtml:true, style: 'padding: 10px'}
		]}
	],

	calcFormat: function (sender, ev) {
		// Processing parameters
		var options = {
			locale: this.$.localeSelector.getValue()
		};

		// Parsing
		var nameStr = this.$.name.getValue();
		var name = new Name(nameStr, options);
		var output = '';
		if (name.prefix) {
			output += 'Prefix: ' + name.prefix + '<br>';
		}
		if (name.givenName) {
			output += 'Given name: ' + name.givenName + '<br>';
		}
		if (name.middleName) {
			output += 'Middle name: ' + name.middleName + '<br>';
		}
		if (name.familyName) {
			output += 'Family name: ' + name.familyName + '<br>';
		}
		if (name.suffix) {
			output += 'Suffix: ' + name.suffix + '<br>';
		}
		output += '<br/>';
		this.$.rtlResult.setContent(output);
	}
});
},{'../ChooseLocale':'src/ChooseLocale','../ResBundle':'src/ResBundle'}],'src/NumberFormatting':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Group = require('enyo/Group'),
	Input = require('enyo/Input'),
	Scroller = require('enyo/Scroller'),
	Select = require('enyo/Select');

var
	Num = require('enyo-ilib/INumber'),
	NumFmt = require('enyo-ilib/NumFmt');

var
	ChooseLocale = require('../ChooseLocale'),
	ChooseCurrency = require('../ChooseCurrency'),
	rb = require('../ResBundle');

module.exports = kind({
	name: 'ilib.sample.NumberFormatting',
	classes: 'onyx ilib-onyx-sample enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{components: [
				/* Header with selecting locale */
				{kind: ChooseLocale, name: 'localeSelector', onSelectedLocale: 'setLocale'},
				{style: 'width: 20px'},
				{kind:  Button, content: rb.getString('Apply'), ontap: 'calcFormat', style: 'vertical-align: bottom;', classes: 'onyx-affirmative'},
				{fit: true}
			]},
			{tag: 'br'},

			{content: rb.getString('Type'), classes: 'ilib-onyx-sample-divider'},
			{kind: Group, defaultKind: Button, name: 'type', onActivate: 'buttonActivated', components: [
				{content: 'number', active: true},
				{content: 'percentage'},
				{content: 'currency'}
			]},


			{components: [
				{components: [
					{content: rb.getString('Max Frac Digits'), classes: 'ilib-onyx-sample-divider'},
					{kind: Input, name: 'maxFractionDigits', placeholder: rb.getString('Enter number')}
				]},
				{style: 'width: 20px'},
				{components: [
					{content: rb.getString('Min Frac Digits'), classes: 'ilib-onyx-sample-divider'},
					{kind: Input, name: 'minFractionDigits', placeholder: rb.getString('Enter number')}
				]},
				{fit: true}
			]},


			{content: rb.getString('Rounding Mode'), classes: 'ilib-onyx-sample-divider'},
			{kind: Group, defaultKind: Button, name: 'roundingMode', components: [
				{content: 'up'},
				{content: 'down'},
				{content: 'ceiling'},
				{content: 'floor'},
				{content: 'half up', active: true},
				{content: 'half down'},
				{content: 'half even'},
				{content: 'half odd'}
			]},

			{name: 'numberParams', components: [
				{content: rb.getString('Style'), classes: 'ilib-onyx-sample-divider'},

				{name: 'styleOfNumber', kind: Select, components: [
					{content: 'standard', active: true},
					{content: 'scientific'}
				]}

			]},

			{name: 'currencyParams', components: [
				{content: rb.getString('Style'), classes: 'ilib-onyx-sample-divider'},

				{name: 'styleOfCurrency', kind: Select, components: [
					{content: 'common', active: true},
					{content: 'iso'}
				]},

				{kind: ChooseCurrency, name: 'currency'}
			]},

			{tag: 'br'}
		]},

		{kind: Group, classes:'onyx-sample-result-box', components: [
			{content: rb.getString('Number')},
			{kind: Input, name: 'number', placeholder: rb.getString('Enter number')}
		]},
		{tag: 'br'},
		{kind: Group, classes:'onyx-sample-result-box', components: [
			{content: rb.getString('Format result:')},
			{name: 'rtlResult', fit: true, content: '-', style: 'padding: 10px'}
		]}
	],

	setLocale: function (sender, ev) {
		if (this.$['currency'])
			this.$.currency.selectCurrency(this.$.localeSelector.getValue());
	},

	buttonActivated: function (sender, ev) {
		this.updateParameters();
	},

	updateParameters: function () {
		this.$.numberParams.setShowing(this.$.type.getActive().content === 'number');
		this.$.currencyParams.setShowing(this.$.type.getActive().content === 'currency');
	},

	calcFormat: function (sender, ev) {
		// Processing parameters
		var options = {
			locale: this.$.localeSelector.getValue(),
			type: this.$.type.getActive().content,
			roundingMode: this.$.roundingMode.getActive().content
		};
		if ((parseInt(this.$.maxFractionDigits.getValue(), 10) || 0) !== 0)
			options.maxFractionDigits = parseInt(this.$.maxFractionDigits.getValue(), 10);
		if ((parseInt(this.$.minFractionDigits.getValue(), 10) || 0) !== 0)
			options.minFractionDigits = parseInt(this.$.minFractionDigits.getValue(), 10);
		if (options.type === 'number')
			options.style = this.$.styleOfNumber.getSelected().content;
		if (options.type === 'currency') {
			options.style = this.$.styleOfCurrency.getSelected().content;
			options.currency = this.$.currency.getValue();
		}
		// Formatting
		var num = new Num(this.$.number.getValue());
		var fmt = new NumFmt(options);
		var postFmtData = fmt.format(num);
		// Output results
		this.$.rtlResult.setContent(postFmtData);
	}
});

},{'../ChooseLocale':'src/ChooseLocale','../ChooseCurrency':'src/ChooseCurrency','../ResBundle':'src/ResBundle'}],'../strawman/SampleList':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	Link = require('../Link'),
	List = require('../List'),
	Title = require('../Title'),
	AppRouter = require('../AppRouter');

module.exports = kind({
	title: 'Samples',
	classes: 'strawman',
	published: {
		sample: null,
		locale: 'local'
	},
	handlers: {
		onRouteChange: 'handleRoute'
	},
	listComponents: [
		{name: 'title', kind: Title},
		{name: 'back', kind: Link, classes: 'back-button', content: 'Back', href: '../index.html'},
		{name: 'list', kind: List}
	],
	create: function () {
		this.inherited(arguments);
		this.createComponent({name: 'router', kind: AppRouter});
		if (this.libraryName && this.version) {
			// only display version information for individual libraries that are versioned
 			console.log('%c%s: %s', 'color:blue', this.libraryName, this.version);
 		}
 	},
 	handleRoute: function (sender, ev) {
		this.set('locale', ev.locale);
		this.set('sample', ev.sampleName);
	},
	sampleChanged: function (was, is) {
		if (was) {
			if(this.$[was]) { this.$[was].destroy(); }
		} else {
			if(this.$.title) { this.$.title.destroy(); }
			if(this.$.back) { this.$.back.destroy(); }
			if(this.$.list) { this.$.list.destroy(); }
		}
		if (is && this.samples[is]) {
			if(platform.webos && global.screen.width<=400 && this.libraryName!=='Garnet') {
				this.addClass('wearable-sample');
			}
			global.sample = this.createComponent({name:is, kind: this.samples[is], classes:'strawman-sample'});
		} else {
			// We have no sample, just render out the list.
			this.removeClass('wearable-sample');
			this.createComponents(this.listComponents);
			this.binding({from: 'title',       to: '$.title.content'});
			this.binding({from: 'samples',     to: '$.list.samples'});
			this.binding({from: 'listType',    to: '$.list.listType'});
			this.binding({from: 'libraryName', to: '$.list.libraryName'});

			// Don't show back if we're at home.
			this.$.back.set('showing', !!this.libraryName);
		}
		this.render();
	}
});

},{'../Link':'../strawman/Link','../List':'../strawman/List','../Title':'../strawman/Title','../AppRouter':'../strawman/AppRouter'}],'../strawman/ScrollingSampleList':[function (module,exports,global,require,request){
var
	Scroller = require('enyo/Scroller');

var
	SampleList = require('./SampleList');

module.exports = SampleList.kind({
	components: [
		{name: 'client', kind: Scroller, classes: 'enyo-fit'},
		{content: '<', classes: 'strawman-sample-back', ontap:'goBack'}
	],
	goBack: function() {
 		global.history.go(-1);
 		return false;
  	}
});

},{'./SampleList':'../strawman/SampleList'}],'index':[function (module,exports,global,require,request){
// For simplicity, we'll require the full ilib since this is the root of the sample 'app'. The
// individual samples can then safely import the root enyo-ilib package knowing that the app
// registered which version it wanted.
// require('enyo-ilib/full');

require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Enyo_iLib = require('enyo-ilib');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		AddressFormatting	: require('./src/AddressFormatting'),
		AddressParsing		: require('./src/AddressParsing'),
		// AdvDateFormatting	: require('./src/AdvDateFormatting'), //still has onyx timepicker
		// DateFormatting: require('./src/DateFormatting'),
		LocaleInfo: require('./src/LocaleInfo'),
		NameFormatting: require('./src/NameFormatting'),
		NameParsing: require('./src/NameParsing'),
		NumberFormatting: require('./src/NumberFormatting')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'iLib Samples',
	version: Enyo_iLib.enyo.version,
	libraryName: 'iLib',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});


},{'../strawman/ScrollingSampleList':'../strawman/ScrollingSampleList','./src/AddressFormatting':'src/AddressFormatting','./src/AddressParsing':'src/AddressParsing','./src/LocaleInfo':'src/LocaleInfo','./src/NameFormatting':'src/NameFormatting','./src/NameParsing':'src/NameParsing','./src/NumberFormatting':'src/NumberFormatting'}]
	};

});
//# sourceMappingURL=enyo-ilib-samples.js.map