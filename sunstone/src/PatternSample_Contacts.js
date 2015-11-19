var
	kind = require('enyo/kind'),
	Image = require('enyo/Image');

var
	FittableRows = require('layout/FittableRows'),
	FittableColumns = require('layout/FittableColumns');

var
	Header = require('sunstone/Header'),
	Scroller = require('sunstone/Scroller'),
	ToastPopup = require('sunstone/ToastPopup');

module.exports = kind({
	name: 'sun.sample.ContactsSample',
	kind: FittableRows,
	classes: 'contact-sample enyo-unselectable enyo-fit',
	components: [
		{kind: Header, title: 'Contacts', showBackButton: true, onBackButtonTapped: 'buttonTapped'},
		{kind: Scroller, fit: true, horizontal: 'hidden', components: [
			{classes: 'contacts-table', kind: FittableColumns, components: [
				{classes: 'contacts-table-cell', components: [
					{kind: Image, style: 'margin: 10px; width: 60px; height: 60px;', src: '@../assets/contacts_01.png'}
				]},
				{classes: 'contacts-table-cell', fit: true, components: [
					{content: 'Emil Decosta'}
				]}
			]},
			{classes: 'general-index', content: 'DISPLAY OPTIONS'},
			{classes: 'contacts-table', components: [
				{classes: 'contacts-table-cell', components: [
					{style: 'padding-left: 16px;', content: 'Contacts to display'}
				]}
			]},
			{classes: 'divider'},
			{classes: 'contacts-table two-line', components: [
				{classes: 'contacts-table-cell', components: [
					{style: 'padding-left: 16px;', content: 'Sort list by'},
					{style: 'padding-left: 16px; font-size: 14px; color: gray', content: 'Firstname'}
				]}
			]},
			{classes: 'divider'},
			{classes: 'contacts-table two-line', components: [
				{classes: 'contacts-table-cell', components: [
					{style: 'padding-left: 16px;', content: 'View contact name as'},
					{style: 'padding-left: 16px; font-size: 14px; color:gray', content: 'Firstname'}
				]}
			]},
			{classes: 'divider'},
			{classes: 'contacts-table', components: [
				{classes: 'contacts-table-cell', components: [
					{style: 'padding-left: 16px;', content: 'Only phones'}
				]}
			]}
		]},
		{name: 'toastpopup', kind: ToastPopup, showDuration: 2000, content: 'key pressed!'}
	],
	buttonTapped: function (inSender, inEvent) {
		this.$.toastpopup.show();
	}
});