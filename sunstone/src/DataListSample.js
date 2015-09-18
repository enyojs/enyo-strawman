var 
	kind = require('enyo/kind');

var 
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	Img = require('enyo/Image');

var
	DataList = require('sunstone/DataList'),
	playFeedback = require('sunstone/feedback');

var data = [
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Alejandra', lastName: 'Walsh' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Marquez', lastName: 'James',disabled:true },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Barr', lastName: 'Lott' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Everett', lastName: 'Maddox' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Crane', lastName: 'Bryant' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Raymond', lastName: 'Faulkner' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Petersen', lastName: 'Murray' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Kristina', lastName: 'Porter' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Barbra', lastName: 'Barrett' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Tracey', lastName: 'Melton' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Effie', lastName: 'Pierce' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Webb', lastName: 'Sloan' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Diana', lastName: 'Castaneda' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Gaines', lastName: 'Hampton' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Ebony', lastName: 'Stanley' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Anne', lastName: 'Moses' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Mercer', lastName: 'Skinner' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Williams', lastName: 'Booker' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Pearson', lastName: 'Blevins' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Pearl', lastName: 'Mcknight' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Mcconnell', lastName: 'Jenkins' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Ava', lastName: 'Deleon' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Emily', lastName: 'Goodwin' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Richmond', lastName: 'Hess' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Pitts', lastName: 'Osborn' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Lela', lastName: 'Page' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Carmen', lastName: 'Maxwell' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Dana', lastName: 'Thompson' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Dominique', lastName: 'Jensen' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Freda', lastName: 'Short' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Cynthia', lastName: 'Bass' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Laurie', lastName: 'Kim' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Suarez', lastName: 'Jarvis' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Esperanza', lastName: 'Camacho' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Rachelle', lastName: 'Lynch' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Sonja', lastName: 'Lowery' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Nelda', lastName: 'Benton' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Bernadine', lastName: 'Pratt' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Welch', lastName: 'Russo' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Eileen', lastName: 'Mays' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Nell', lastName: 'Conner' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Carolina', lastName: 'Hodges' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Polly', lastName: 'Mueller' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Jimenez', lastName: 'Goodman' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Fowler', lastName: 'Haley' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Rios', lastName: 'Watson' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Kidd', lastName: 'Mcmahon' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Audrey', lastName: 'Buchanan' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Mcdonald', lastName: 'Miles' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Marcia', lastName: 'Collins' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Mason', lastName: 'Owens' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Hopper', lastName: 'Hanson' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Good', lastName: 'Jacobs' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Bryan', lastName: 'Francis' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Chris', lastName: 'Payne' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Russo', lastName: 'Burgess' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Carla', lastName: 'Burke' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Herman', lastName: 'Stephenson' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Garrison', lastName: 'Santana' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Freida', lastName: 'Stevenson' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Macias', lastName: 'Bright' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Wiley', lastName: 'Simon' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Cook', lastName: 'Farmer' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Baldwin', lastName: 'Burch' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Sabrina', lastName: 'Schwartz' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Hudson', lastName: 'Medina' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Jodi', lastName: 'Wells' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Curry', lastName: 'Oneil' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Mejia', lastName: 'Mcneil' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Carrie', lastName: 'Rivas' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Lowery', lastName: 'Murphy' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Pace', lastName: 'Rivera' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Gonzales', lastName: 'Ramos' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Irwin', lastName: 'Rivers' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Angelique', lastName: 'Hardy' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Branch', lastName: 'Little' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Yang', lastName: 'Case' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Douglas', lastName: 'Marsh' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Velma', lastName: 'Joyner' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Susanna', lastName: 'Park' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Billie', lastName: 'Kirk' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Melendez', lastName: 'Fischer' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Summer', lastName: 'Reeves' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Contreras', lastName: 'Bradley' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Taylor', lastName: 'Miller' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Hopkins', lastName: 'Aguilar' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Cleo', lastName: 'Sullivan' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Vazquez', lastName: 'Flowers' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Gibson', lastName: 'Gilliam' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Zimmerman', lastName: 'Riggs' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Mcintyre', lastName: 'Mcgee' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Hall', lastName: 'Caldwell' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Felicia', lastName: 'Fitzpatrick' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Delgado', lastName: 'Cole' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Burns', lastName: 'Summers' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Durham', lastName: 'Dickerson' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_wifi.png',      firstName: 'Lavonne', lastName: 'Robles' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_bluetooth.png', firstName: 'Roberts', lastName: 'Adams' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_graph.png',     firstName: 'Ayala', lastName: 'Lawson' },
	{ classes: 'repeater-item', imageSrc: '@../assets/ic_list_ring.png',      firstName: 'Lori', lastName: 'Nolan' }
];

var ListItem = kind({
	kind: Control,
	classes: 'sun-datalist-item',
	handlers: {
		ondown: 'down',
		onup: 'up',
		onleave: 'up',
		ontap: 'tap'
	},
	components: [
		{name: 'iconImage', kind: Img, sizing: 'cover', classes: 'icon-image'},
		{name: 'firstName', kind: Control, classes: 'name'}
	],
	bindings: [
		{from: '.model.imageSrc', to: '.$.iconImage.src'},
		{from: '.model.firstName', to: '.$.firstName.content'}
	],
	down: function (inSender, inEvent) {
		inSender.addClass('down');
	},
	up: function (inSender, inEvent) {
		inSender.removeClass('down');
	},
	tap: function (inSender, inEvent) {
		playFeedback();
	}
});

module.exports = kind({
	name: 'sun.sample.DataListSample',
	kind: Control,
	classes: 'data-list-sample enyo-fit enyo-unselectable',
	components: [
		{name: 'repeater', kind: DataList, components: [{kind: ListItem}]}
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