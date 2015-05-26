var
	kind = require('enyo/kind');

var
	List = require('../List');

var
	samples = {
		ButtonGroup			: request('./lib/ButtonGroupSample'),
		Button				: request('./lib/ButtonSample'),
		Checkbox			: request('./lib/CheckboxSample'),
		ContextualPopup		: request('./lib/ContextualPopupSample'),
		DatePicker			: request('./lib/DatePickerSample'),
		Groupbox			: request('./lib/GroupboxSample'),
		IconButton			: request('./lib/IconButtonSample'),
		Input				: request('./lib/InputSample'),
		Menu				: request('./lib/MenuSample'),
		MoreToolbar			: request('./lib/MoreToolbarSample'),
		Picker				: request('./lib/PickerSample'),
		Popup				: request('./lib/PopupSample'),
		Progress			: request('./lib/ProgressSample'),
		Slider				: request('./lib/SliderSample'),
		Spinner				: request('./lib/SpinnerSample'),
		Submenu				: request('./lib/SubmenuSample'),
		TabBar				: request('./lib/TabBarSample'),
		TabPanel			: request('./lib/TabPanelSample'),
		TimePicker			: request('./lib/TimePickerSample'),
		ToggleButton		: request('./lib/ToggleButtonSample'),
		Toolbar				: request('./lib/ToolbarSample'),
		Tooltip				: request('./lib/TooltipSample')
	};

module.exports = kind({
	baseHref: 'Onyx',
	kind: List,
	classes: 'enyo-fit',
	samples: Object.keys(samples),
	sampleChanged: function () {
		this.log(this.sample);
		
		var app = this.app;
		samples[this.sample].then(function (Sample) {
			app.setupView(Sample, function () { app.reRender(); });
		});
	}
});