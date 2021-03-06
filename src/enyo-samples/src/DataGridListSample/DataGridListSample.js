var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	DataGridList = require('enyo/DataGridList');

var data = [
	{ classes: 'repeater-item class1 item', firstName: 'Alejandra', lastName: 'Walsh' },
	{ classes: 'repeater-item class2 item', firstName: 'Marquez', lastName: 'James' },
	{ classes: 'repeater-item class3 item', firstName: 'Barr', lastName: 'Lott' },
	{ classes: 'repeater-item class4 item', firstName: 'Everett', lastName: 'Maddox' },
	{ classes: 'repeater-item class5 item', firstName: 'Crane', lastName: 'Bryant' },
	{ classes: 'repeater-item class1 item', firstName: 'Raymond', lastName: 'Faulkner' },
	{ classes: 'repeater-item class2 item', firstName: 'Petersen', lastName: 'Murray' },
	{ classes: 'repeater-item class3 item', firstName: 'Kristina', lastName: 'Porter' },
	{ classes: 'repeater-item class4 item', firstName: 'Barbra', lastName: 'Barrett' },
	{ classes: 'repeater-item class5 item', firstName: 'Tracey', lastName: 'Melton' },
	{ classes: 'repeater-item class1 item', firstName: 'Effie', lastName: 'Pierce' },
	{ classes: 'repeater-item class2 item', firstName: 'Webb', lastName: 'Sloan' },
	{ classes: 'repeater-item class3 item', firstName: 'Diana', lastName: 'Castaneda' },
	{ classes: 'repeater-item class4 item', firstName: 'Gaines', lastName: 'Hampton' },
	{ classes: 'repeater-item class5 item', firstName: 'Ebony', lastName: 'Stanley' },
	{ classes: 'repeater-item class1 item', firstName: 'Anne', lastName: 'Moses' },
	{ classes: 'repeater-item class2 item', firstName: 'Mercer', lastName: 'Skinner' },
	{ classes: 'repeater-item class3 item', firstName: 'Williams', lastName: 'Booker' },
	{ classes: 'repeater-item class4 item', firstName: 'Pearson', lastName: 'Blevins' },
	{ classes: 'repeater-item class5 item', firstName: 'Pearl', lastName: 'Mcknight' },
	{ classes: 'repeater-item class1 item', firstName: 'Mcconnell', lastName: 'Jenkins' },
	{ classes: 'repeater-item class2 item', firstName: 'Ava', lastName: 'Deleon' },
	{ classes: 'repeater-item class3 item', firstName: 'Emily', lastName: 'Goodwin' },
	{ classes: 'repeater-item class4 item', firstName: 'Richmond', lastName: 'Hess' },
	{ classes: 'repeater-item class5 item', firstName: 'Pitts', lastName: 'Osborn' },
	{ classes: 'repeater-item class1 item', firstName: 'Lela', lastName: 'Page' },
	{ classes: 'repeater-item class2 item', firstName: 'Carmen', lastName: 'Maxwell' },
	{ classes: 'repeater-item class3 item', firstName: 'Dana', lastName: 'Thompson' },
	{ classes: 'repeater-item class4 item', firstName: 'Dominique', lastName: 'Jensen' },
	{ classes: 'repeater-item class5 item', firstName: 'Freda', lastName: 'Short' },
	{ classes: 'repeater-item class1 item', firstName: 'Cynthia', lastName: 'Bass' },
	{ classes: 'repeater-item class2 item', firstName: 'Laurie', lastName: 'Kim' },
	{ classes: 'repeater-item class3 item', firstName: 'Suarez', lastName: 'Jarvis' },
	{ classes: 'repeater-item class4 item', firstName: 'Esperanza', lastName: 'Camacho' },
	{ classes: 'repeater-item class5 item', firstName: 'Rachelle', lastName: 'Lynch' },
	{ classes: 'repeater-item class1 item', firstName: 'Sonja', lastName: 'Lowery' },
	{ classes: 'repeater-item class2 item', firstName: 'Nelda', lastName: 'Benton' },
	{ classes: 'repeater-item class3 item', firstName: 'Bernadine', lastName: 'Pratt' },
	{ classes: 'repeater-item class4 item', firstName: 'Welch', lastName: 'Russo' },
	{ classes: 'repeater-item class5 item', firstName: 'Eileen', lastName: 'Mays' },
	{ classes: 'repeater-item class1 item', firstName: 'Nell', lastName: 'Conner' },
	{ classes: 'repeater-item class2 item', firstName: 'Carolina', lastName: 'Hodges' },
	{ classes: 'repeater-item class3 item', firstName: 'Polly', lastName: 'Mueller' },
	{ classes: 'repeater-item class4 item', firstName: 'Jimenez', lastName: 'Goodman' },
	{ classes: 'repeater-item class5 item', firstName: 'Fowler', lastName: 'Haley' },
	{ classes: 'repeater-item class1 item', firstName: 'Rios', lastName: 'Watson' },
	{ classes: 'repeater-item class2 item', firstName: 'Kidd', lastName: 'Mcmahon' },
	{ classes: 'repeater-item class3 item', firstName: 'Audrey', lastName: 'Buchanan' },
	{ classes: 'repeater-item class4 item', firstName: 'Mcdonald', lastName: 'Miles' },
	{ classes: 'repeater-item class5 item', firstName: 'Marcia', lastName: 'Collins' },
	{ classes: 'repeater-item class1 item', firstName: 'Mason', lastName: 'Owens' },
	{ classes: 'repeater-item class2 item', firstName: 'Hopper', lastName: 'Hanson' },
	{ classes: 'repeater-item class3 item', firstName: 'Good', lastName: 'Jacobs' },
	{ classes: 'repeater-item class4 item', firstName: 'Bryan', lastName: 'Francis' },
	{ classes: 'repeater-item class5 item', firstName: 'Chris', lastName: 'Payne' },
	{ classes: 'repeater-item class1 item', firstName: 'Russo', lastName: 'Burgess' },
	{ classes: 'repeater-item class2 item', firstName: 'Carla', lastName: 'Burke' },
	{ classes: 'repeater-item class3 item', firstName: 'Herman', lastName: 'Stephenson' },
	{ classes: 'repeater-item class4 item', firstName: 'Garrison', lastName: 'Santana' },
	{ classes: 'repeater-item class5 item', firstName: 'Freida', lastName: 'Stevenson' },
	{ classes: 'repeater-item class1 item', firstName: 'Macias', lastName: 'Bright' },
	{ classes: 'repeater-item class2 item', firstName: 'Wiley', lastName: 'Simon' },
	{ classes: 'repeater-item class3 item', firstName: 'Cook', lastName: 'Farmer' },
	{ classes: 'repeater-item class4 item', firstName: 'Baldwin', lastName: 'Burch' },
	{ classes: 'repeater-item class5 item', firstName: 'Sabrina', lastName: 'Schwartz' },
	{ classes: 'repeater-item class1 item', firstName: 'Hudson', lastName: 'Medina' },
	{ classes: 'repeater-item class2 item', firstName: 'Jodi', lastName: 'Wells' },
	{ classes: 'repeater-item class3 item', firstName: 'Curry', lastName: 'Oneil' },
	{ classes: 'repeater-item class4 item', firstName: 'Mejia', lastName: 'Mcneil' },
	{ classes: 'repeater-item class5 item', firstName: 'Carrie', lastName: 'Rivas' },
	{ classes: 'repeater-item class1 item', firstName: 'Lowery', lastName: 'Murphy' },
	{ classes: 'repeater-item class2 item', firstName: 'Pace', lastName: 'Rivera' },
	{ classes: 'repeater-item class3 item', firstName: 'Gonzales', lastName: 'Ramos' },
	{ classes: 'repeater-item class4 item', firstName: 'Irwin', lastName: 'Rivers' },
	{ classes: 'repeater-item class5 item', firstName: 'Angelique', lastName: 'Hardy' },
	{ classes: 'repeater-item class1 item', firstName: 'Branch', lastName: 'Little' },
	{ classes: 'repeater-item class2 item', firstName: 'Yang', lastName: 'Case' },
	{ classes: 'repeater-item class3 item', firstName: 'Douglas', lastName: 'Marsh' },
	{ classes: 'repeater-item class4 item', firstName: 'Velma', lastName: 'Joyner' },
	{ classes: 'repeater-item class5 item', firstName: 'Susanna', lastName: 'Park' },
	{ classes: 'repeater-item class1 item', firstName: 'Billie', lastName: 'Kirk' },
	{ classes: 'repeater-item class2 item', firstName: 'Melendez', lastName: 'Fischer' },
	{ classes: 'repeater-item class3 item', firstName: 'Summer', lastName: 'Reeves' },
	{ classes: 'repeater-item class4 item', firstName: 'Contreras', lastName: 'Bradley' },
	{ classes: 'repeater-item class5 item', firstName: 'Taylor', lastName: 'Miller' },
	{ classes: 'repeater-item class1 item', firstName: 'Hopkins', lastName: 'Aguilar' },
	{ classes: 'repeater-item class2 item', firstName: 'Cleo', lastName: 'Sullivan' },
	{ classes: 'repeater-item class3 item', firstName: 'Vazquez', lastName: 'Flowers' },
	{ classes: 'repeater-item class4 item', firstName: 'Gibson', lastName: 'Gilliam' },
	{ classes: 'repeater-item class5 item', firstName: 'Zimmerman', lastName: 'Riggs' },
	{ classes: 'repeater-item class1 item', firstName: 'Mcintyre', lastName: 'Mcgee' },
	{ classes: 'repeater-item class2 item', firstName: 'Hall', lastName: 'Caldwell' },
	{ classes: 'repeater-item class3 item', firstName: 'Felicia', lastName: 'Fitzpatrick' },
	{ classes: 'repeater-item class4 item', firstName: 'Delgado', lastName: 'Cole' },
	{ classes: 'repeater-item class5 item', firstName: 'Burns', lastName: 'Summers' },
	{ classes: 'repeater-item class1 item', firstName: 'Durham', lastName: 'Dickerson' },
	{ classes: 'repeater-item class2 item', firstName: 'Lavonne', lastName: 'Robles' },
	{ classes: 'repeater-item class3 item', firstName: 'Roberts', lastName: 'Adams' },
	{ classes: 'repeater-item class4 item', firstName: 'Ayala', lastName: 'Lawson' },
	{ classes: 'repeater-item class5 item', firstName: 'Lori', lastName: 'Nolan' }
];

module.exports = kind({
	name: 'enyo.sample.DataGridListSample',
	classes: 'data-grid-list-sample data-repeater-sample enyo-fit',
	components: [
		{name: 'repeater', kind: DataGridList, components: [
			{components: [
				{classes: 'name-wrapper', components: [
					{name: 'firstName', classes: 'name', tag: 'span'},
					{name: 'lastName', classes: 'name last', tag: 'span'},
					{name: 'lastNameLetter', classes: 'name last-letter', tag: 'span'}
				]}
			], bindings: [
				{from: '.model.firstName', to: '.$.firstName.content'},
				{from: '.model.lastName', to: '.$.lastName.content'},
				{from: '.model.lastName', to: '.$.lastNameLetter.content', transform: function (v) { return v && v.charAt(0); }},
				{from: '.model.classes', to: '.classes'}
			]}
		], minWidth: 320, minHeight: 100, spacing: 10}
	],
	bindings: [
		{from: '.collection', to: '.$.repeater.collection'}
	],
	populateList: function () {
		this.collection = new Collection(data);
	},
	create: kind.inherit(function (sup) {
		return function () {
			this.populateList();
			sup.apply(this, arguments);
		};
	})
});

module.exports.data = data;
