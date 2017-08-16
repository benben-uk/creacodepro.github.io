'use strict';

/********** Paste your code here! ************/

var qs = function qs(selector) {
	return document.querySelector(selector);
};
var byId = function byId(id) {
	return document.getElementById(id);
};

var APP = {

	init: function init() {

		APP.defaultProps();
		APP.eventsCatch();
		APP.fixLargeEkran();

	},

	fixLargeEkran: function fixLargeEkran() {

		var WIDTH = window.innerWidth;
		var HEIGHT = window.innerHeight;

		if(WIDTH > HEIGHT && WIDTH < 992 && HEIGHT < 600) {
			APP.CONTACTS.style.height = '200vh';
		} else if(WIDTH < 992) {
			APP.CONTACTS.style.height = '160vh';
		}

		if(WIDTH > 1500) {
			APP.STAGEBUTTON_1.style.left = `${APP.WAYLINE_1.getBoundingClientRect().left-(window.innerWidth/4.7)}px`
		}

	},

	defaultProps: function defaultProps() {

		APP.HOME = qs('section.home');
		APP.SERVICES = qs('section.services');
		APP.CONTACTS = qs('section.contacts');
		APP.WAYBUTTON_1 = qs('nav ul li:nth-child(1)');
		APP.WAYBUTTON_2 = qs('nav ul li:nth-child(2)');
		APP.WAYBUTTON_3 = qs('nav ul li:nth-child(3)');
		APP.STAGEBUTTON_1 = qs('footer nav li:nth-of-type(1) .stage');
		APP.STAGEBUTTON_2 = qs('footer nav li:nth-of-type(2) .stage');
		APP.STAGEBUTTON_3 = qs('footer nav li:nth-of-type(3) .stage');

		APP.STFAFTER_1 = qs('footer nav li:nth-of-type(1) b');
		APP.STFAFTER_2 = qs('footer nav li:nth-of-type(2) b');
		APP.STFBEFORE_1 = qs('footer nav li:nth-of-type(1) u');
		APP.STFBEFORE_2 = qs('footer nav li:nth-of-type(2) u');

		APP.BEFSTAG_1 = qs('footer nav li:nth-of-type(1) s');
		APP.BEFSTAG_2 = qs('footer nav li:nth-of-type(2) s');

		APP.F_SERVICE = byId('service_first');
		APP.S_SERVICE = byId('service_second');
		APP.T_SERVICE = byId('service_third');

		APP.WAYLINE_1 = qs('.home .wayline');
		APP.WAYLINE_2 = qs('.services .wayline');
		APP.WAYLINE_3 = qs('.contacts .wayline');

		APP.currentStage = 0;
		APP.currentSlide = 1;
		APP.showCheckTime = false;
		APP.checkResize = false;
	},

	eventsCatch: function eventsCatch() {

		document.addEventListener('click', APP.handleClick);
		document.addEventListener('focusout', APP.handleUnfocus);
		document.addEventListener('mousewheel', APP.handleScroll);
		document.addEventListener('mouseover', APP.handleHover);
		document.addEventListener('mouseout', APP.handleLeave);
		document.addEventListener('keydown', APP.handleKeys);
		window.onresize = APP.handleResize;
	},

	handleResize: function handleResize(event) {

		// APP.fixLargeEkran();

		var HEIGHT = window.innerHeight;
		var WIDTH = window.innerWidth;

		if (WIDTH < 992 && APP.checkResize === false) {
			APP.adaptive();
			setTimeout(function () {
				return APP.adaptive();
			}, 1001);
			APP.checkResize = true;
		} else if (WIDTH > 992 && APP.checkResize === true) {
			APP.showHome();
			setTimeout(function () {
				return APP.unadaptive();
			}, 1001);
			APP.checkResize = false;
		}

	},

	adaptive: function adaptive() {
		APP.HOME.style.top = '0px';
		APP.HOME.style.left = '0px';
		APP.SERVICES.style.top = '100%';
		APP.SERVICES.style.left = '0px';
		APP.CONTACTS.style.top = '200%';
		APP.CONTACTS.style.left = '0px';
	},

	unadaptive: function unadaptive() {
		APP.SERVICES.style.top = '0px';
		APP.SERVICES.style.left = '-100%';
		APP.CONTACTS.style.top = '0px';
		APP.CONTACTS.style.left = '100%';

		APP.F_SERVICE.style.display = 'block';
		APP.F_SERVICE.style.left = '16%';
		APP.S_SERVICE.style.display = 'block';
		APP.S_SERVICE.style.left = '33.5%';
		APP.S_SERVICE.style.top = '-326px';
		APP.T_SERVICE.style.display = 'block';
		APP.T_SERVICE.style.left = '57%';
		APP.T_SERVICE.style.top = '-652px';

		qs('.services .row').style.left = '52%';
	},

	handleHover: function handleHover(event) {

		var TAG = event.target;

		switch (TAG.id) {

			case 'step_one':
				APP.showFirstStage();break;
			case 'step_two':
				APP.showSecondStage();break;
			case 'step_three':
				APP.showThirdStage();break;

		}
	},

	handleLeave: function handleLeave(event) {

		var TAG = event.target;

		switch (TAG.id) {

			case 'step_one':
				APP.hideFirstStage();break;
			case 'step_two':
				APP.hideSecondStage();break;
			case 'step_three':
				APP.hideThirdStage();break;

		}
	},

	handleClick: function handleClick(event) {

		var TAG = event.target;

		switch (TAG.id) {

			case 'step_one':
				APP.showHome();break;
			case 'step_two':
				APP.showServices();break;
			case 'step_three':
				APP.showContacts();break;
			case 'previous':
				APP.showPrevSlide();break;
			case 'nextserv':
				APP.showNextSlide();break;
			case 'hidefinput':
				APP.hidePlaceholder('');break;
			case 'hidesinput':
				APP.hidePlaceholder('-2');break;
			case 'hidetinput':
				APP.hidePlaceholder('-3');break;

		}
	},

	handleUnfocus: function handleUnfocus(event) {

		var TAG = event.target;

		switch (TAG.id) {

			case 'hidefinput':
				APP.showPlaceholder(TAG, '');break;
			case 'hidesinput':
				APP.showPlaceholder(TAG, '-2');break;
			case 'hidetinput':
				APP.showPlaceholder(TAG, '-3');break;

		}
	},

	hidePlaceholder: function hidePlaceholder(num) {

		var plsh = qs('.placeholder' + num);
		plsh.style.top = num === '-3' ? '-61px' : '-11px';
		num === '-3' ? plsh.style.left = '-10px' : true;
		plsh.style['font-size'] = '11px';
	},

	showPlaceholder: function showPlaceholder(input, num) {

		if (!input.value || input.value === '') {

			var plsh = qs('.placeholder' + num);
			plsh.style.top = num === '-3' ? '-35px' : '0px';
			num === '-3' ? plsh.style.left = '0px' : true;
			plsh.style['font-size'] = '16px';
		}
	},

	showPrevSlide: function showPrevSlide() {

		if (APP.currentSlide < 1) APP.currentSlide = 3;

		if (window.innerWidth < 480) {
			APP.checkSlide('5%');
		} else if (window.innerWidth < 768) {
			APP.checkSlide('6.5%');
		} else if (window.innerWidth < 992) {
			APP.checkSlide('16%');
		}

		APP.currentSlide -= 1;
	},

	showNextSlide: function showNextSlide() {

		if (APP.currentSlide > 3) APP.currentSlide = 1;

		if (window.innerWidth < 480) {
			APP.checkSlide('5%');
		} else if (window.innerWidth < 768) {
			APP.checkSlide('6.5%');
		} else if (window.innerWidth < 992) {
			APP.checkSlide('16%');
		}

		APP.currentSlide += 1;
	},

	checkSlide: function checkSlide(prc) {

		if (APP.currentSlide === 1) {
			APP.F_SERVICE.style.display = 'block';
			APP.F_SERVICE.style.left = prc;
			APP.S_SERVICE.style.display = 'none';
			APP.T_SERVICE.style.display = 'none';
		} else if (APP.currentSlide === 2) {
			APP.S_SERVICE.style.display = 'block';
			APP.S_SERVICE.style.left = prc;
			APP.F_SERVICE.style.display = 'none';
			APP.T_SERVICE.style.display = 'none';
		} else if (APP.currentSlide === 3) {
			APP.T_SERVICE.style.display = 'block';
			APP.T_SERVICE.style.left = prc;
			APP.F_SERVICE.style.display = 'none';
			APP.S_SERVICE.style.display = 'none';
		}
	},

	handleStages: function handleStages() {

		if (APP.currentStage < 0) {
			APP.currentStage = 0;
		} else if (APP.currentStage > 2) {
			APP.currentStage = 2;
		};

		switch (APP.currentStage) {

			case 0:
				APP.showHome();break;
			case 1:
				APP.showServices();break;
			case 2:
				APP.showContacts();break;

		}
	},

	handleKeys: function handleKeys(event) {

		if (!APP.showCheckTime) {

			if (event.keyCode === 39) {
				APP.currentStage += 1;
				APP.handleStages();
			} else if (event.keyCode === 37) {
				APP.currentStage -= 1;
				APP.handleStages();
			}
		}
	},

	handleScroll: function handleScroll(event) {

		var WIDTH = window.innerWidth;

		if (WIDTH > 992 && !APP.showCheckTime) {

			event.wheelDeltaY > 0 ? APP.currentStage -= 1 : APP.currentStage += 1;

			APP.handleStages();
		}
	},

	hideAll: function hideAll(page) {
		if (page !== 'home') APP.hideHome(page);
		if (page !== 'services') APP.hideServices(page);
		if (page !== 'contacts') APP.hideContacts(page);
		APP.hideFirstStage();
		APP.hideSecondStage();
		APP.hideThirdStage();
	},

	hideHome: function hideHome(page) {
		APP.HOME.style['z-index'] = '0';
		setTimeout(function () {
			APP.hideHomeHandler();
			APP.WAYBUTTON_1.setAttribute('class', '');
		}, 1000);
	},

	hideHomeHandler: function hideHomeHandler() {
		APP.HOME.style.top = '-1000px';
	},

	hideServices: function hideServices(page) {
		APP.HOME.style['z-index'] = '0';
		if (page === 'home') {
			setTimeout(function () {
				APP.hideServicesHandler();
			}, 1000);
		} else APP.hideServicesHandler();

		setTimeout(function () {
			return APP.WAYBUTTON_2.setAttribute('class', '');
		}, 1000);
	},

	hideServicesHandler: function hideServicesHandler() {
		APP.SERVICES.style.left = '-100%';
	},

	hideContacts: function hideContacts(page) {
		APP.HOME.style['z-index'] = '0';
		if (page === 'home') {
			setTimeout(function () {
				APP.hideContactsHandler();
			}, 1000);
		} else APP.hideContactsHandler();

		setTimeout(function () {
			return APP.WAYBUTTON_3.setAttribute('class', '');
		}, 1000);
	},

	hideContactsHandler: function hideContactsHandler() {
		APP.CONTACTS.style.left = '100%';
	},

	showHome: function showHome() {
		APP.showCheckTime = true;
		APP.hideAll('home');

		APP.WAYLINE_1.style.left = '31vw';
		APP.WAYLINE_2.style.left = '31vw';
		APP.WAYLINE_3.style.left = '31vw';

		APP.HOME.style['z-index'] = '9';
		APP.HOME.style.top = '0%';
		setTimeout(function () {
			APP.WAYBUTTON_1.setAttribute('class', 'active');
			APP.STAGEBUTTON_1.style.bottom = '4px';
			APP.STAGEBUTTON_2.style.bottom = '-1px';
			APP.showCheckTime = false;
			APP.STFAFTER_1.style.left = '2.1vw';
			APP.STFAFTER_2.style.left = '1.5vw';

			APP.BEFSTAG_2.style.left = '-7.9vw';
			APP.BEFSTAG_2.style.width = '7.9vw';
			APP.BEFSTAG_1.style.left = '-7.2vw';
			APP.BEFSTAG_1.style.width = '7.2vw';
		}, 1002);
	},

	showServices: function showServices() {

		if (window.innerWidth < 992) {

			location.href = '#services';
		} else {

			APP.showCheckTime = true;
			APP.hideAll('services');

			APP.WAYLINE_1.style.left = '50.1vw';
			APP.WAYLINE_2.style.left = '50.1vw';
			APP.WAYLINE_3.style.left = '50.1vw';

			APP.SERVICES.style['z-index'] = '8';
			APP.SERVICES.style.left = '0%';
			setTimeout(function () {
				APP.WAYBUTTON_2.setAttribute('class', 'active');
				APP.STAGEBUTTON_1.style.bottom = '-1px';
				APP.STAGEBUTTON_2.style.bottom = '4px';
				APP.showCheckTime = false;
				APP.WAYLINE_2.style.bottom = '65px';
				APP.STFAFTER_1.style.left = '1.5vw';
				APP.STFAFTER_2.style.left = '2.3vw';

				APP.BEFSTAG_1.style.left = '-7.9vw';
				APP.BEFSTAG_1.style.width = '7.9vw';
				APP.BEFSTAG_2.style.left = '-7.2vw';
				APP.BEFSTAG_2.style.width = '7.2vw';
			}, 1002);
		}
	},

	showContacts: function showContacts() {
		APP.showCheckTime = true;
		APP.hideAll('contacts');

		APP.WAYLINE_1.style.left = '78.2vw';
		APP.WAYLINE_2.style.left = '78.2vw';
		APP.WAYLINE_3.style.left = '78.2vw';

		APP.CONTACTS.style['z-index'] = '8';
		APP.CONTACTS.style.left = '0%';
		setTimeout(function () {
			APP.WAYBUTTON_3.setAttribute('class', 'active');
			APP.STAGEBUTTON_1.style.bottom = '-1px';
			APP.STAGEBUTTON_2.style.bottom = '-1px';
			APP.showCheckTime = false;
			APP.WAYLINE_3.style.bottom = '65px';
			APP.STFAFTER_1.style.left = '2.1vw';
			APP.STFAFTER_2.style.left = '1.5vw';

			APP.BEFSTAG_2.style.left = '-7.9vw';
			APP.BEFSTAG_2.style.width = '7.9vw';
			APP.BEFSTAG_1.style.left = '-7.9vw';
			APP.BEFSTAG_1.style.width = '7.9vw';
		}, 1002);
	},

	showFirstStage: function showFirstStage() {
		// APP.STAGEBUTTON_1.style.opacity = '1';
	},

	showSecondStage: function showSecondStage() {
		APP.STAGEBUTTON_1.style.opacity = '1';
		APP.WAYLINE_1.style.bottom = '65px';
		APP.STFAFTER_1.style.width = '7.4vw';
		APP.STFBEFORE_1.style.width = '18vw';
	},

	showThirdStage: function showThirdStage() {
		APP.STAGEBUTTON_2.style.opacity = '1';
		APP.WAYLINE_2.style.bottom = '65px';
		APP.STFAFTER_2.style.width = '7.4vw';
		APP.STFBEFORE_2.style.width = '17.4vw';
	},

	hideFirstStage: function hideFirstStage() {
		// APP.STAGEBUTTON_1.style.opacity = '0';
	},

	hideSecondStage: function hideSecondStage() {
		APP.STAGEBUTTON_1.style.opacity = '0';
		APP.WAYLINE_1.style.bottom = '55px';
		APP.STFAFTER_1.style.width = '13.5vw';
		APP.STFBEFORE_1.style.width = '13.5vw';
	},

	hideThirdStage: function hideThirdStage() {
		APP.STAGEBUTTON_2.style.opacity = '0';
		APP.STFAFTER_2.style.width = '13.5vw';
		APP.STFBEFORE_2.style.width = '13.5vw';
		// APP.WAYLINE_2.style.bottom = '55px';
	}

};

APP.init();

function init() {

	var mapOptions = {

		zoom: 16,
		center: new google.maps.LatLng(53.57387, 10.0559828), // New York
		styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
	};

	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(53.57387, 10.0559828),
		map: map,
		icon: '../images/map_marker_2.png',
		title: 'Kleiststraße 2, 22089'
	});
}

init();