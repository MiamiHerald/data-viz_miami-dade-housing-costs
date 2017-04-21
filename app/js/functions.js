'use strict';

// SET GLOBAL LAYERS TO NULL
var income;
var $zipData;
var $houseLayer = null;
var $condoLayer = null;
var $percentHouseLayer = null;
var $percentCondoLayer = null;
var $crimeLayer = null;
var $schoolLayer = null;
var $defaultLayer = null;
var $defaultHouseLayer = null;
var $defaultCondoLayer = null;
var $defaultPercentHouseLayer = null;
var $defaultPercentCondoLayer = null;
var $defaultCrimeLayer = null;
var $defaultSchoolLayer = null;

// MAKE TILE LAYER FOR ZOOMED IN VIEW
var tiles = new L.StamenTileLayer('toner-lite');

// MOBILE WIDTHS
var mobile = 992;
var w = window.innerWidth;

$(window).resize(function() {
	if (Modernizr.mq('(min-width: 992px)')) {
		$('#interface-container').show();
		$('#interface-container-mobile').hide();
	} else {
		$('#interface-container').hide();
		$('#interface-container-mobile').show();
	}
}).resize();

// FUNCTIONS TO FIX MAP POSITION
// AND ZOOM ON PAGE LOAD
function fixPosition() {
	return [25.748503, -80.286949];
}

function fixZoom() {
	if (w > mobile) {
		return 10;
	} else {
		return 8.5;
	}
}

var coordinates = fixPosition();
var lat = coordinates[0];
var lon = coordinates[1];

// BUILD MAP
var map = new L.Map('map-container', {
	center: new L.LatLng(lat, lon),
	zoom: fixZoom(),
	minZoom: 7,
	maxZoom: 16,
	zoomControl: false,
	doubleClickZoom: false,
	VML: true,
	scrollWheelZoom: false
}).addLayer(tiles);

// ADD CONTROLS
var control = L.control.zoom({
	'position': 'topleft'
});
control.addTo(map);


// ========================
// BUILD DEFAULT  GRAY MAP
// ========================

// SET DEFAULT HOUSE STYLES
function defaultLayerColor(features, layer) {
	return {
		fillColor: '#ccc',
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

// CREATE DEFAULT HOUSE VARIABLE
var $defaultLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultLayerColor
});


// ========================
// BUILD DEFAULT HOUSE MAP
// ========================


//HELPERS

function getDefaultOpacity(d) {
	if (d > 1) {
		return 0.7;
	}
	else {
		return 0;
	}
}

function getDefaultBorder(d) {
	if (d > 1) {
		return 'white';
	}
	else {
		return 'none';
	}
}

function getDefaultHouseColor(d) {

	if ((d >= 601801) && (d <= 10000000)) {
		return 'rgba(114, 191, 68, 1)';
	} else if ((d >= 425551) && (d <= 601800)) {
		return 'rgba(114, 191, 68, 0.875)';
	} else if ((d >= 319526) && (d <= 425550)) {
		return 'rgba(114, 191, 68, 0.75)';
	} else if ((d >= 284101) && (d <= 319525)) {
		return 'rgba(114, 191, 68, 0.625)';
	} else if ((d >= 237051) && (d <= 284100)) {
		return 'rgba(114, 191, 68, 0.50)';
	} else if ((d >= 200751) && (d <= 237050)) {
		return 'rgba(114, 191, 68, 0.375)';
	} else if ((d >= 157876) && (d <= 200750)) {
		return 'rgba(114, 191, 68, 0.25)';
	} else if ((d >= 1) && (d <= 157875)) {
		return 'rgba(114, 191, 68, 0.125)';
	} else {
		return '#fff';
	}
}

// SET DEFAULT HOUSE STYLES
function defaultHouseStyle(features, layer) {
	return {
		fillColor: getDefaultHouseColor(features.properties.currHousePrice),
		weight: 2,
		opacity: 1,
		color: getDefaultBorder(features.properties.currHousePrice),
		dashArray: '3',
		fillOpacity: getDefaultOpacity(features.properties.currHousePrice)
	};
}

// CREATE DEFAULT HOUSE VARIABLE
var $defaultHouseLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultHouseStyle
});

// ADD DEFAULT LAYER TO MAP
// THIS IS FIRST LAYER USERS WILL SEE
map.addLayer($defaultHouseLayer);

// ========================
// BUILD DEFAULT CONDO MAP
// ========================




function getDefaultCondoColor(d) {

	if ((d >= 298701) && (d <= 10000000)) {
		return 'rgba(114, 191, 68, 1)';
	} else if ((d >= 214401) && (d <= 298700)) {
		return 'rgba(114, 191, 68, 0.75)';
	} else if ((d >= 152051) && (d <= 214400)) {
		return 'rgba(114, 191, 68, 0.625)';
	} else if ((d >= 138601) && (d <= 152050)) {
		return 'rgba(114, 191, 68, 0.50)';
	} else if ((d >= 100601) && (d <= 138600)) {
		return 'rgba(114, 191, 68, 0.375)';
	} else if ((d >= 100601) && (d <= 100600)) {
		return 'rgba(114, 191, 68, 0.25)';
	} else if ((d >= 85826) && (d <= 100600)) {
		return 'rgba(114, 191, 68, 0.25)';
	} else if ((d >= 1) && (d <= 85825)) {
		return 'rgba(114, 191, 68, 0.125)';
	} else {
		return '#fff';
	}
}

function defaultCondoStyle(features, layer) {
	return {
		fillColor: getDefaultCondoColor(features.properties.currCondoPrice),
		weight: 2,
		opacity: 1,
		color: getDefaultBorder(features.properties.currCondoPrice),
		dashArray: '3',
		fillOpacity: getDefaultOpacity(features.properties.currCondoPrice)
	};
}

var $defaultCondoLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultCondoStyle
});

// ===============================
// BUILD DEFAULT HOUSE PERCENT MAP
// ===============================

// PERCENT HELPERS
function getDefaultPercentOpacity(d) {
	if (d > -5) {
		return 0.7;
	}
	else {
		return 0;
	}
}

function getDefaultPercentBorder(d) {
	if (d > -5) {
		return 'white';
	}
	else {
		return 'none';
	}
}


function getDefaultHousePercentColor(d) {
	if ((d >= 0.11) && (d <= 1)) {
		return 'rgba(37, 64, 143, 1)';
	} else if ((d >= 0.08) && (d < 0.11)) {
		return 'rgba(37, 64, 143, 0.75)';
	} else if ((d >= 0.04) && (d < 0.08)) {
		return 'rgba(37, 64, 143, 0.5)';
	} else if ((d >= -5) && (d < 0.10)) {
		return 'rgba(37, 64, 143, 0.25)';
	} else {
		return '#fff';
	}
}

function defaultHousePercentStyle(features, layer) {
	return {
		fillColor: getDefaultHousePercentColor(features.properties.housePricePercent),
		weight: 2,
		opacity: 1,
		color: getDefaultPercentBorder(features.properties.housePricePercent),
		dashArray: '3',
		fillOpacity: getDefaultPercentOpacity(features.properties.housePricePercent)
	};
}

// SET DEFAULT LAYER
var $defaultPercentHouseLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultHousePercentStyle
});

// ===============================
// BUILD DEFAULT CONDO PERCENT MAP
// ===============================
function getDefaultCondoPercentColor(d) {
	if ((d >= 0.080) && (d <= 0.250)) {
		return 'rgba(37, 64, 143, 1)';
	} else if ((d >= 0.057) && (d <= 0.079)) {
		return 'rgba(37, 64, 143, 0.75)';
	} else if ((d >= 0.000) && (d <= 0.056)) {
		return 'rgba(37, 64, 143, 0.5)';
	} else if ((d >= -5) && (d <= -0.01)) {
		return 'rgba(37, 64, 143, 0.25)';
	} else {
		return '#fff';
	}
}

function defaultCondoPercentStyle(features, layer) {
	return {
		fillColor: getDefaultCondoPercentColor(features.properties.condoPricePercent),
		weight: 2,
		opacity: 1,
		color: getDefaultPercentBorder(features.properties.condoPricePercent),
		dashArray: '3',
		fillOpacity: getDefaultPercentOpacity(features.properties.condoPricePercent)
	};
}

var $defaultPercentCondoLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultCondoPercentStyle
});

// ========================
// BUILD DEFAULT CRIME MAP
// ========================

function getDefaultCrimeOpacity (d) {
	if (d > 1) {
		return 0.7;
	} else {
		return 0;
	}
}

function getDefaultCrimeBorder (d) {
	if (d > 1) {
		return 'white';
	} else {
		return 'none';
	}
}

function getDefaultCrimeColor(d) {

	if (d > 200) {
		return 'rgba(237, 25, 65, 1)';
	} else if ((d > 100) && (d < 200)) {
		return 'rgba(237, 25, 65, 0.6667)';
	} else if ((d > 0) && (d < 100)) {
		return 'rgba(237, 25, 65, 0.3333)';
	} else {
		return '#fff';
	}
}

function defaultCrimeStyle(features, layer) {
	return {
		fillColor: getDefaultCrimeColor(features.properties.crime),
		weight: 2,
		opacity: getDefaultBorder(features.properties.crime),
		color: 'white',
		dashArray: '3',
		fillOpacity: getDefaultOpacity(features.properties.crime)
	};
}

var $defaultCrimeLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultCrimeStyle
});

// ========================
// BUILD DEFAULT SCHOOL MAP
// ========================

//HELPERS

function getDefaultSchoolOpacity (d) {
	if (d > 1) {
		return 0.7;
	} else {
		return 0;
	}
}


function getDefaultSchoolBorder (d) {
	if (d > 1) {
		return 'white';
	} else {
		return 'none';
	}
}


function getDefaultSchoolColor(d) {

	if (d >= 5) {
		return 'rgba(209, 161, 13, 1)';
	} else if ((d >= 4) && (d <= 4.9)) {
		return 'rgba(209, 161, 13, 0.8)';
	} else if ((d >= 3) && (d <= 3.9)) {
		return 'rgba(209, 161, 13, 0.6)';
	} else if ((d > 2) && (d <= 2.9)) {
		return 'rgba(209, 161, 13, 0.4)';
	} else if ((d > 1) && (d <= 1.9)) {
		return 'rgba(209, 161, 13, 0.2)';
	} else {
		return '#fff';
	}
}

function defaultSchoolStyle(features, layer) {
	return {
		fillColor: getDefaultSchoolColor(features.properties.schoolGrade),
		weight: 2,
		opacity: 1,
		color: getDefaultSchoolBorder(features.properties.schoolGrade),
		dashArray: '3',
		fillOpacity: getDefaultSchoolOpacity(features.properties.schoolGrade)
	};
}

var $defaultSchoolLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultSchoolStyle
});

// ====================
// 	BUILD HOUSE MAP
//	Layers appear later
// ====================


// HELPERS
function getPriceOpacity(d) {
	if (income >= d) {
		return 0.7;
	}
	else {
		return 0;
	}
}

function getPriceBorder(d) {
	if (income >= d) {
		return 'white';
	}
	else {
		return 'none';
	}
}

// COLORS
function getHouseColor(d) {
	if ((d >= 601801) && (d <= 10000000)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 1)';
		}
	}

	else if ((d >= 425551) && (d <= 601800)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.875)';
		}

	}

	else if ((d >= 319526) && (d <= 3229000)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.75)';
		}
	}


	else if ((d >= 284101) && (d <= 319525)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.625)';
		}
	}

	else if ((d >= 237051) && (d <= 284100)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.50)';
		}

	}

	else if ((d >= 200751) && (d <= 237050)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.375)';
		}
	}


	else if ((d >= 157876) && (d <= 200750)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.25)';
		}
	}

	else if ((d >= 1) && (d <= 157875)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.125)';
		}
	} else {
		return '#fff';
	}
}


function houseStyle(features, layer) {
	return {
		fillColor: getHouseColor(features.properties.currHousePrice),
		weight: 2,
		opacity: 1,
		color: getPriceBorder(features.properties.currHousePrice),
		dashArray: '3',
		fillOpacity: getPriceOpacity(features.properties.currHousePrice)
	};
}

// ========================
// BUILD DEFAULT CONDO MAP
// ========================

function getCondoColor(d) {

	if ((d >= 298701) && (d <= 10000000)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 1)';
		}
	}

	else if ((d >= 214401) && (d <= 298700)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.875)';
		}

	}

	else if ((d >= 152051) && (d <= 394500)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.75)';
		}
	}

	else if ((d >= 138601) && (d <= 152050)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.625)';
		}
	}

	else if ((d >= 100601) && (d <= 138600)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.50)';
		}

	}

	else if ((d >= 100601) && (d <= 100600)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.375)';
		}
	}


	else if ((d >= 85826) && (d <= 100600)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.25)';
		}
	}

	else if ((d >= 1) && (d <= 85825)) {

		if (income >= d) {
			return 'rgba(114, 191, 68, 0.125)';
		}
	}

	else {
		return '#fff';
	}
}


function condoStyle(features, layer) {
	return {
		fillColor: getCondoColor(features.properties.currCondoPrice),
		weight: 2,
		opacity: 1,
		color: getPriceBorder(features.properties.currCondoPrice),
		dashArray: '3',
		fillOpacity: getPriceOpacity(features.properties.currCondoPrice)
	};
}

// ========================
// BUILD HOUSE PERCENT MAP
// ========================

// PERCENT HELPERS
function getPercentOpacity(price, d) {
	if ((income >= price) && (d > 0.00)) {
		return 0.7;
	}
	else {
		return 0;
	}
}

function getPercentBorder(price, d) {
	if ((income >= price) && (d > 0.00)) {
		return 'white';
	}
	else {
		return 'none';
	}
}

function getHousePercentColor(price, d) {
	if ((income >= price) && (d >= 1)) {
		return 'rgba(37, 64, 143, 1)';
	} else if ((income >= price) && ((d >= 0.12) && (d <= 0.26))) {
		return 'rgba(37, 64, 143, 0.75)';
	} else if ((income >= price) && ((d >= 0.084) && (d <= 0.11))) {
		return 'rgba(37, 64, 143, 0.50)';
	} else if ((income >= price) && ((d > 0.0) && (d <= 0.083))) {
		return 'rgba(37, 64, 143, 0.25)';
	} else {
		'#fff';
	}
}

function housePercentStyle(features, layer) {
	return {
		fillColor: getHousePercentColor(features.properties.currHousePrice, features.properties.housePricePercent),
		weight: 2,
		opacity: 1,
		color: getPercentBorder(features.properties.currHousePrice, features.properties.housePricePercent),
		dashArray: '3',
		fillOpacity: getPercentOpacity(features.properties.currHousePrice, features.properties.housePricePercent)
	};
}

// ========================
// BUILD CONDO PERCENT MAP
// ========================

function getCondoPercentColor(price, d) {

	if ((income >= price) && (d >= 0.25)) {
		return 'rgba(37, 64, 143, 1)';
	} else if ((income >= price) && ((d >= 0.08) && (d <= 0.24))) {
		return 'rgba(37, 64, 143, 0.75)';
	} else if ((income >= price) && ((d >= 0.06) && (d <= 0.08))) {
		return 'rgba(37, 64, 143, 0.50)';
	} else if ((income >= price) && ((d >= -0.03) && (d <= 0.06))) {
		return 'rgba(37, 64, 143, 0.25)';
	} else {
		return '#fff';
	}
}

function condoPercentStyle(features, layer) {
	return {
		fillColor: getCondoPercentColor(features.properties.currCondoPrice, features.properties.condoPricePercent),
		weight: 2,
		opacity: 1,
		color: getPercentBorder(features.properties.currCondoPrice, features.properties.condoPricePercent),
		dashArray: '3',
		fillOpacity: getPercentOpacity(features.properties.currCondoPrice, features.properties.condoPricePercent)
	};
}

// ================
// BUILD CRIME MAP
// ================

// HELPERS
// PERCENT HELPERS
function getBuiltCrimeOpacity(house, condo, crime) {

	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));

	// CEHCK IF HOUSE OR CONDO IS CHECKED
	if ((houseCheck === true) && (condoCheck === false)) {

		if ((income >= house) && ((crime > 0))) {
			return 0.7;
		} else {
			return 0;
		}

	} else if ((houseCheck === false) && ((condoCheck === true))) {

		if ((income >= condo) && ((crime > 0))) {
			return 0.7;
		} else {
			return 0;
		}
	}
}

function getBuiltCrimeBorder(house, condo, crime) {
	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));

	// CEHCK IF HOUSE OR CONDO IS CHECKED
	if ((houseCheck === true) && (condoCheck === false)) {

		if ((income >= house) && ((crime > 0))) {
			return 'white';
		} else {
			return 'none';
		}

	} else if ((houseCheck === false) && ((condoCheck === true))) {

		if ((income >= condo) && ((crime > 0))) {
			return 'white';
		} else {
			return 'none';
		}
	}
}

function getCrimeColor(crime, house, condo) {

	// SET VARIBLES TO GET CRIME
	var incomeInput = $('.income-box').val();
	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));
	var inputEmpty = (incomeInput === '');

	// CEHCK IF HOUSE OR CONDO IS CHECKED
	if ((houseCheck === true) && ((condoCheck === false) && (inputEmpty === false))) {

		if ((income >= house) && ((crime > 200))) {
			return 'rgba(237, 25, 65, 1)';
		} else if ((income >= house) && ((crime > 100) && (crime < 200))) {
			return 'rgba(237, 25, 65, 0.6667)';
		} else if ((income >= house) && ((crime > 0) && (crime < 100))) {
			return 'rgba(237, 25, 65, 0.3333)';
		}

	} else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === false))) {

		if ((income >= condo) && ((crime > 200))) {
			return 'rgba(237, 25, 65, 1)';
		} else if ((income >= condo) && ((crime > 100) && (crime < 200))) {
			return 'rgba(237, 25, 65, 0.6667)';
		} else if ((income >= condo) && ((crime > 0) && (crime < 100))) {
			return 'rgba(237, 25, 65, 0.3333)';
		}
	}
}

function crimeStyle(features, layer) {
	return {
		fillColor: getCrimeColor(features.properties.crime, features.properties.currHousePrice, features.properties.currCondoPrice),
		weight: 2,
		opacity: 1,
		color: getBuiltCrimeBorder(features.properties.currHousePrice, features.properties.currCondoPrice, features.properties.crime),
		dashArray: '3',
		fillOpacity: getBuiltCrimeOpacity(features.properties.currHousePrice, features.properties.currCondoPrice, features.properties.crime)
	};
}

// ========================
// BUILD DEFAULT SCHOOL MAP
// ========================

function getBuiltSchoolOpacity(school,house,condo) {

	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));

	// CEHCK IF HOUSE OR CONDO IS CHECKED
	if ((houseCheck === true) && (condoCheck === false)) {

		if ((income >= house) && ((school > 0))) {
			return 0.7;
		} else {
			return 0;
		}

	} else if ((houseCheck === false) && ((condoCheck === true))) {

		if ((income >= condo) && ((school > 0))) {
			return 0.7;
		} else {
			return 0;
		}
	}
}

function getBuiltSchoolBorder(school,house,condo) {
	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));

	// CEHCK IF HOUSE OR CONDO IS CHECKED
	if ((houseCheck === true) && (condoCheck === false)) {

		if ((income >= house) && ((school > 0))) {
			return 'white';
		} else {
			return 'none';
		}

	} else if ((houseCheck === false) && ((condoCheck === true))) {

		if ((income >= condo) && ((school > 0))) {
			return 'white';
		} else {
			return 'none';
		}
	}
}


function getSchoolColor(school, house, condo) {

	var incomeInput = $('.income-box').val();
	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));
	var inputEmpty = (incomeInput === '');

	if ((houseCheck === true) && ((condoCheck === false) && (inputEmpty === false))) {

		if ((income >= house) && (school === 5)) {
			return 'rgba(209, 161, 13, 1)';
		} else if ((income >= house) && ((school >= 4.0) && (school <= 4.9))) {
			return 'rgba(209, 161, 13, 0.8)';
		} else if ((income >= house) && ((school >= 3.0) && (school <= 3.9))) {
			return 'rgba(209, 161, 13, 0.6)';
		} else if ((income >= house) && ((school >= 2.0) && (school <= 2.9))) {
			return 'rgba(209, 161, 13, 0.4)';
		} else if ((income >= house) && ((school >= 1.0) && (school <= 1.9))) {
			return 'rgba(209, 161, 13, 0.2)';
		}
	} else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === false))) {

		if ((income >= condo) && (school === 5)) {
			return 'rgba(209, 161, 13, 1)';
		} else if ((income >= condo) && ((school >= 4.0) && (school <= 4.9))) {
			return 'rgba(209, 161, 13, 0.8)';
		} else if ((income >= condo) && ((school >= 3.0) && (school <= 3.9))) {
			return 'rgba(209, 161, 13, 0.6)';
		} else if ((income >= condo) && ((school >= 2.0) && (school <= 2.9))) {
			return 'rgba(209, 161, 13, 0.4)';
		} else if ((income >= condo) && ((school >= 1.0) && (school <= 1.9))) {
			return 'rgba(209, 161, 13, 0.2)';
		}
	}
}

function schoolStyle(features, layer) {
	return {
		fillColor: getSchoolColor(features.properties.schoolGrade, features.properties.currHousePrice, features.properties.currCondoPrice),
		weight: 2,
		opacity: 1,
		color: getBuiltSchoolBorder(features.properties.schoolGrade, features.properties.currHousePrice, features.properties.currCondoPrice),
		dashArray: '3',
		fillOpacity: getBuiltSchoolOpacity(features.properties.schoolGrade, features.properties.currHousePrice, features.properties.currCondoPrice)
	};
}


//===========//
// HOVER BOX //
//===========//

// SET POSITION OF HOVER BOX ON MOUSEMOVE
function getPos(event) {
	var w = $('#map-container').width();
	var h = $('#map-container').height();
	var posX = event.pageX + 20;
	var posY = event.pageY - 150;
	var x = 0;
	var y = 0;

	// HORIZONTAL CONDITIONS
	if (posX < w) {
		x = posX - 150;
	} else {
		x = posX - ($('#hover-box').outerWidth(true) + 100);
	}

	// VERTICAL CONDITIONS
	if (posY > h) {
		y = (posY - $('#hover-box').outerHeight(true) - 375);
	} else {
		y = posY;
	}

	// HOVER BOX CSS
	$('#hover-box').css({
		'left': x,
		'top': y + 150
	});
}

// ACTIVATE HOVER
function initHover() {
	$(document).bind('mousemove', getPos);
}

// END HOVER
function endHover() {
	$(document).unbind('mousemove', getPos);
}

//=========//
// NUMBERS //
//=========//

// GET MONEY THAT CAN BE SPENT ON HOUSING
function getIncome(num) {

	var incomeCheckbox = $('.income:checkbox');
	var savingsCheckbox = $('.savings:checkbox');
	var incomeCheck = (incomeCheckbox.is(':checked'));
	var savingsCheck = (savingsCheckbox.is(':checked'));

	if (incomeCheck === true && savingsCheck === false) {
		var income = numeral().unformat(num) * 3.5;
		return income;
	} else if (incomeCheck === false && savingsCheck === true) {
		var income = numeral().unformat(num);
		return income;
	}
	$('.income').html('$' + num);
}

// CHANGE NUMBER TO DOLLAR
function numberChange(number) {
	if (number === 'No data') {
		return 'No data';
	} else {
		return '$' + numeral(number).format('0,0');
	}
}

// FORMAT INCREASE/DECREASE PERCENTAGE
function percentChange(number) {

	if ((number < 1) && (number >= 0)) {
		var percent = Math.floor(number * 100);
		if (percent > 0) {
			return '+' + percent + '%';
		} else if (number === 'No data') {
			return 'No data';
		} else if (percent === 0) {
			return 0 + '%';
		} else {
			return percent + '%';
		}
	} else {
		var percent = Math.floor(number);
		if (percent > 0) {
			return '+' + percent + '%';
		} else if (number === 'No data') {
			return 'No data';
		} else if (percent === 0) {
			return 0 + '%';
		} else {
			return percent + '%';
		}
	}
}

//===========================//
// ERROR HANDLING FUNCTIONS  //
//===========================//

function flagError() {
	$('.error').slideDown('fast');
	$('.alert').html('<i class=\'fa fa-info-circle\'></i> Error: Please enter a valid number.');
}

function flagSelectionError() {
	$('.error').slideDown('fast');
	$('.alert').html('<i class=\'fa fa-info-circle\'></i> Error: Please choose house or condo.');
}

function flagMoneyError() {
	$('.error').slideDown('fast');
	$('.alert').html('<i class=\'fa fa-info-circle\'></i> Error: Please choose income or price.');
}

function removeError() {
	$('.error').slideUp('fast');
}

//====================================
// INCOME INPUT AND HOUSING SELECTION
//====================================

function checkInput(income) {

	var incomeInput = $('.income-box').val();
	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var incomeCheckbox = $('.income:checkbox');
	var savingsCheckbox = $('.savings:checkbox');
	var inputBoxError = (isNaN(income)) || (incomeInput === '');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));
	var incomeCheck = (incomeCheckbox.is(':checked'));
	var savingsCheck = (savingsCheckbox.is(':checked'));

	condoCheckbox.attr('disabled', true);
	houseCheckbox.attr('disabled', true);


	// ERROR HANDLING

	// NO ERRORS
	if ((inputBoxError === false) && (houseCheck === true) && (condoCheck === false) && ((incomeCheck === true) || (savingsCheck === true))) {
		buildHouseMap(income);
		removeError();
	}

	// IF NOTHING'S SELECTED. THROW SELECTION ERROR
	else if ((inputBoxError === true) && ((houseCheck === false) && condoCheck === false) && ((incomeCheck === false) && (savingsCheck === false))) {

		condoCheckbox.attr('disabled', false);
		houseCheckbox.attr('disabled', false);

		flagSelectionError();
	}

	// IF PAYMENT AND HOUSING ARE CHECKED, BUT INPUT IS EMPTY
	// THROW NUMBER ERROR
	else if ((inputBoxError === true) && ((houseCheck === true) || condoCheck === true) && ((incomeCheck === true) || (savingsCheck === true))) {
		flagError();
	}

	// IF PAYMENT IS SELECTED AND INPUT IS FILLED,
	// BUT PAYMENT IS NOT CHECKED, THROW MONEY ERROR
	else if ((inputBoxError === false) && ((houseCheck === true) || condoCheck === true) && ((incomeCheck === false) && (savingsCheck === false))) {
		flagMoneyError();
	}

	// IF ONLY HOUSING IS SELECTED, THROW MONEY ERROR
	else if ((inputBoxError === true) && ((houseCheck === true) || condoCheck === true) && ((incomeCheck === false) && (savingsCheck === false))) {
		flagMoneyError();
	}

	// IF INCOME IS CHECKED AND INPUT IS FILLED,
	// THROW SELECTION ERROR
	else if ((inputBoxError === false) && ((houseCheck === false) && (condoCheck === false)) && ((incomeCheck === true) || (savingsCheck === true))) {
		flagSelectionError();
	}

	// IF ONLY PAYMENT IS SELECTED, THROW SELECTION ERROR
	else if ((inputBoxError === true) && ((houseCheck === false) && (condoCheck === false)) && ((incomeCheck === true) || (savingsCheck === true))) {
		flagSelectionError();
	} else if ((inputBoxError === false) && (houseCheck === false) && (condoCheck === true) && ((incomeCheck === true) || (savingsCheck === true))) {
		buildCondoMap(income);
		removeError();
	}

	var income = getIncome(incomeInput);
	return income;
}

//=============//
// MAPS TOOLS  //
//=============//

// BUILD KEY
function buildKey(housing) {
	var currYear = $zipData[0].features[0].properties.currYear;
	var currMonth = $zipData[0].features[0].properties.currMonth;
	var currMonthShort = $zipData[0].features[0].properties.currMonthShort;

	$('.legend-block').remove();

	if (housing === 'price') {
		var green = ['rgba(114, 191, 68, 0.125)', 'rgba(114, 191, 68, 0.25)', 'rgba(114, 191, 68, 0.375)', 'rgba(114, 191, 68, 0.50)', 'rgba(114, 191, 68, 0.625)', 'rgba(114, 191, 68, 0.75)', 'rgba(114, 191, 68, 0.875)', 'rgba(114, 191, 68, 1)'];

		for (var i = 0; i < green.length; i++) {
			$('.key').append('<div class=\'legend-block\' style=\'color:' + green[i] + '\'</div>');
		}
		$('.legend-block').css('width', '12.5%');

		console.log('Build price key');

		$('.key-standfirst').html('Median value <span class="key-sub">(' + currMonth + ' ' + currYear + ')</span>');
		console.log(housing);

	} else if (housing === 'percent') {
		var blue = ['rgba(37, 64, 143, 0.25)', 'rgba(37, 64, 143, 0.50)', 'rgba(37, 64, 143, 0.75)', 'rgba(37, 64, 143, 1)'];

		for (var i = 0; i < blue.length; i++) {

			$('.key').append('<div class=\'legend-block\' style=\'color:' + blue[i] + '\'</div>');
		}

		$('.legend-block').css('width', '25%');
		console.log('Build percent key');

		$('.key-standfirst').html('Median value change <span class="key-sub">(' + currMonthShort + ' ' + currYear + ' vs. ' + currMonthShort + ' ' + (currYear - 1) + ')</span>');

	} else if (housing === 'crime') {
		var red = ['rgba(237, 25, 65, 0.3333)', 'rgba(237, 25, 65, 0.6667)', 'rgba(237, 25, 65, 1)'];

		for (var i = 0; i < red.length; i++) {
			$('.key').append('<div class=\'legend-block\' style=\'color:' + red[i] + '\'</div>');
		}
		$('.legend-block').css('width', '33.3333%');

		$('.key-standfirst').html('Crime rate <span class="key-sub">(' + (currYear - 1) + ')</span>');
	} else {
		var yellow = ['rgba(209, 161, 13, 1)', 'rgba(209, 161, 13, 0.8)','rgba(209, 161, 13, 0.6)','rgba(209, 161, 13, 0.4)','rgba(209, 161, 13, 0.2)'];

		for (var i = 0; i < yellow.length; i++) {
			$('.key').append('<div class=\'legend-block\' style=\'color:' + yellow[i] + '\'</div>');
			$('.legend-block').css('width', '20%');
		}

		$('.key-standfirst').html('Average school grade <span class="key-sub">(' + (currYear - 1) + ' school year)</span>');
	}
}

// EXPLAINER FUNCTIONS
function showExplainer() {
	var query = Modernizr.mq('(min-width: 992px)');
	if (query) {
		$('.explainer').slideDown('fast');
		$('.tool-list-container').slideUp('fast');
	} else {
		$('.explainer').show();
		$('.tool-list-container').hide();
	}

	$('.explainer').find('span').each(function() {
		$(this).css({
			'color': '#008FD5',
			'font-weight': 'bold'
		});
	});
}

function hideExplainer() {
	var query = Modernizr.mq('(min-width: 992px)');
	if (query) {
		$('.explainer').slideUp('fast');
		$('#button-container').slideDown('fast');
		$('.tool-list-container').slideDown('fast');
	} else {
		$('.explainer').hide();
		$('#button-container').show();
		$('.tool-list-container').show();
	}
}

// CLEAR LAYER FUNCTIONS
function clearDefaultLayers() {
	map.removeLayer($defaultLayer);
	map.removeLayer($defaultHouseLayer);
	map.removeLayer($defaultCondoLayer);
	map.removeLayer($defaultPercentHouseLayer);
	map.removeLayer($defaultPercentCondoLayer);
	map.removeLayer($defaultCrimeLayer);
	map.removeLayer($defaultSchoolLayer);
	console.log('Clear defaults!');
}

function clearAllLayers() {
	if ($houseLayer) {
		map.removeLayer($houseLayer);
	}
	if ($condoLayer) {
		map.removeLayer($condoLayer);
	}
	if ($percentCondoLayer) {
		map.removeLayer($percentCondoLayer);
	}
	if ($percentHouseLayer) {
		map.removeLayer($percentHouseLayer);
	}
	if ($crimeLayer) {
		map.removeLayer($crimeLayer);
	}
	if ($schoolLayer) {
		map.removeLayer($schoolLayer);
	}
	if ($defaultLayer) {
		map.removeLayer($defaultLayer);
	}
	if ($defaultHouseLayer) {
		map.removeLayer($defaultHouseLayer);
	}
	if ($defaultCondoLayer) {
		map.removeLayer($defaultCondoLayer);
	}
	if ($defaultPercentHouseLayer) {
		map.removeLayer($defaultPercentHouseLayer);
	}
	if ($defaultPercentCondoLayer) {
		map.removeLayer($defaultPercentCondoLayer);
	}
	if ($defaultCrimeLayer) {
		map.removeLayer($defaultCrimeLayer);
	}
	if ($defaultSchoolLayer) {
		map.removeLayer($defaultSchoolLayer);
	}
	console.log('Clear everything!');
}

// WRITE HOVER BOX
function writeHoverBox (feature,layer) {
	initHover();
	var zip = parseInt(layer.feature.properties.zipcode);
	var city = layer.feature.properties.cities;
	var housePriceFourteen = layer.feature.properties.prevHousePrice;
	var housePriceFifteen = layer.feature.properties.currHousePrice;
	var housePercent = layer.feature.properties.housePricePercent;
	var condoPriceFourteen = layer.feature.properties.prevCondoPrice;
	var condoPriceFifteen = layer.feature.properties.currCondoPrice;
	var condoPercent = layer.feature.properties.condoPricePercent;
	var currMonth = layer.feature.properties.currMonth;
	var currYear = layer.feature.properties.currYear;
	var prevYear = layer.feature.properties.currYear - 1;
	var schoolData = layer.feature.properties.schools;
	var neighborhoodNames = layer.feature.properties.neighborhoods;
	var crimeRate = layer.feature.properties.crime;
	var schoolGrade = layer.feature.properties.schoolGrade;
	var	crimeRateButton = $('.crime-rate');
	var	schoolTable = $('.school-list');

	// CHANGE COLOR OF HOUSE AND
	// CONDO VALUES BY PERCENT

	// CHANGE CONDO 2014 COLOR
	if (condoPriceFourteen === 'No data') {
		$('.condo-price-fourteen').css('color', '#ccc');
	} else {
		$('.condo-price-fourteen').css('color', '#00AE4D');
	}
	// CHANGE CONDO 2015 COLOR
	if (condoPriceFifteen === 'No data') {
		$('.condo-price-fifteen').css('color', '#ccc');
	} else {
		$('.condo-price-fifteen').css('color', '#00AE4D');
	}

	// CHANGE HOUSE 2014 COLOR
	if (housePriceFourteen === 'No data') {
		$('.house-price-fourteen').css('color', '#ccc');
	} else {
		$('.house-price-fourteen').css('color', '#00AE4D');
	}
	// CHANGE HOUSE 2015 COLOR
	if (housePriceFifteen === 'No data') {
		$('.house-price-fifteen').css('color', '#ccc');
	} else {
		$('.house-price-fifteen').css('color', '#00AE4D');
	}

	// WRITE DATA FROM GEOJSON FILE
	$('.zip-code').html(zip);
	$('.city').html(city);
	$('.house-price-fourteen').html(numberChange(housePriceFourteen));
	$('.house-price-fifteen').html(numberChange(housePriceFifteen));
	$('.house-percent').html(percentChange(housePercent));
	$('.condo-price-fourteen').html(numberChange(condoPriceFourteen));
	$('.condo-price-fifteen').html(numberChange(condoPriceFifteen));
	$('.condo-percent').html(percentChange(condoPercent));
	$('.hoods').html(neighborhoodNames);
	$('.housing-year--prev').html(prevYear);
	$('.housing-year--curr').html(currYear);
	$('.current-month').html('(' + currMonth + ')');

	if ((crimeRate > 0) && (crimeRate < 100)) {
		$('.crime-level')
			.css({
				'background': 'rgba(237, 25, 65, 0.3333)',
				'color': '#000'
			});
		$('.crime-rate').html('Low crime');

	} else if ((crimeRate > 100) && (crimeRate < 200)) {
		$('.crime-level')
			.css({
				'background': 'rgba(237, 25, 65, 0.6667)',
				'color': '#000'
			});
		$('.crime-rate').html('Medium crime');
	} else if (crimeRate > 200) {
		$('.crime-level')
			.css({
				'background': 'rgba(237, 25, 65, 1)',
				'color': '#000'
			});
		$('.crime-rate').html('High crime');
	} else {
	 	$('.crime-level')
			.css({
				'background': '#ccc',
				'color': '#000'
			});
		$('.crime-rate').html('No crime data');
	}

	// HANDLE CHANGE SCREEN SIZE
	var mobile = 992;
	var w = window.innerWidth;

	if (schoolGrade === 'No data') {
		$('.average-grade').html('no grade available');
	} else {

		var schoolCount = 0;

		for (var i = 0; i < schoolData.length; i++) {
			schoolCount++;
		}

		if ((schoolCount === 0) || (schoolCount > 1) ) {
			$('.school-number').html(schoolCount+ ' schools');
		} else if (schoolCount === 1) {
			$('.school-number').html(schoolCount + ' school');
		}
	}

	if (schoolGrade >= 4) {
		$('.average-grade').html('A');
	} else if ((schoolGrade >= 3) && (schoolGrade < 4)){
		$('.average-grade').html('B');
	} else if ((schoolGrade >= 2) && (schoolGrade < 3)){
		$('.average-grade').html('C');
	} else if ((schoolGrade >= 1) && (schoolGrade < 2)){
		$('.average-grade').html('D');
	} else if ((schoolGrade >= 0) && (schoolGrade < 1)){
		$('.average-grade').html('F');
	} else {
		$('.average-grade').html('no grade available');
	 	$('.school-number').html('0 schools');
	}

	if (schoolData === 'No data') {
		$('.no-school').show();
		$('.school-table').hide();
	} else {
		// LOOP THROUGH SCHOOL LIST AND BUILD TABLE
		for (var i = 0; i < schoolData.length; i++) {
			$('.no-school').hide();
			$('.school-table').show();
			$('.school-head').after('<tr class=\'schools-row\'><td class=\'name\'>' + schoolData[i].name + '</td><td class="grade">' + schoolData[i].grade2014 + '</td><td class="grade">' + schoolData[i].grade2015 + '</td><td class="grade">' + schoolData[i].grade2016 + '</td></tr>');
		}
	}

	$(window).resize(function() {
		if (Modernizr.mq('(min-width: 992px)')) {
			$('#hover-box-mobile').hide();
			$('#hover-box').show();
		} else {
			$('#hover-box').hide();
		}
	}).resize();

	schoolTable.show();
	$('.hover-instructions').hide();
	if (Modernizr.mq('(max-width: 992px)')) {
		$('.map-button__outer').css({
			'top': '123px'
		});
	} else {
		$('.map-button__outer').css({
			'top': '10px'
		});
	}

	$('#hover-box-mobile').on('click', '.hover-box-close', function(event) {
		$('#hover-box-mobile').hide();
	});

	crimeRateButton.show();
}

// EVENT FOR EACH ZIP LAYER
function onEachFeature(feature, layer) {
	layer.on({

		mouseover: function(e) {
			var query = Modernizr.mq('(max-width: 992px)');
			var x = e.containerPoint.x;
			var y = e.containerPoint.y;
			if (query) {
				$('.map-tooltip').css({
					'display': 'block',
					'top': y + 100,
					'left': x + 40
				});
			} else {
				$('.map-tooltip').css({
					'display': 'block',
					'top': y,
					'left': x + 40
				});
			}
			$('.map-tooltip').html(feature.id);
		},

		mouseout: function(e) {
			$('.map-tooltip').hide();
			endHover();
		},

		mousemove: function(e) {
			var query = Modernizr.mq('(max-width: 992px)');
			var x = e.containerPoint.x;
			var y = e.containerPoint.y;

			if (query) {
				$('.map-tooltip').css({
					'display': 'block',
					'top': y + 100,
					'left': x + 40
				});
			} else {
				$('.map-tooltip').css({
					'display': 'block',
					'top': y,
					'left': x + 40
				});
			}

			$('.map-tooltip').html(feature.id);
		},

		click: function(e) {
			$('path.leaflet-interactive').css({
				'stroke': '#FFF'
			});

			$(e.target.getElement()).css({
				'stroke': '#000'
			});
			e.target.bringToFront();

			$('#hover-box-mobile').show();
			$('.schools-row').empty();

			$('#hover-box-mobile').css({
				'position': 'relative',
				'right': 0,
				'left': 0,
				'bottom': '0%',
				'top': '50%',
				'width': '100%',
				'height': '100%'
			});

			writeHoverBox(feature,layer);
		},

		tap: function(e) {
			var query = Modernizr.mq('(max-width: 992px)');

			var layer = e.target;
			layer.setStyle({
				'color': '#000'
			});
			layer.bringToFront();

			$('#hover-box-mobile').show();
			$('.schools-row').empty();

			$('#hover-box-mobile').css({
				'position': 'relative',
				'right': 0,
				'left': 0,
				'bottom': '0%',
				'top': '50%',
				'width': '100%',
				'height': '100%'
			});

			writeHoverBox(feature,layer);
		}
	});
}

//=============//
//	BUILD MAPS //
//=============//

// START HOUSE MAP ON PAGE LOAD
function setDefaultMap() {
	buildDefaultHouse();
}

function buildDefaultLayer() {

	$('#house-price').css({
		'float': 'left',
		'width' : '50%',
		'border-right': '1px dashed #ccc'
	});

	$('#condo-price').css({
		'float': 'left',
		'width' : '50%'
	});

	$('.income:checkbox').removeAttr('checked');
	$('.savings:checkbox').removeAttr('checked');

	clearDefaultLayers();
	map.addLayer($defaultLayer);
}


function buildDefaultHouse() {

	$('.price-select').addClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');

	var price = 'price';
	var houseCheckbox = $('.house:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));

	buildKey(price);

	$('.housing-type')
		.html('Median value of single-family homes')
		.css({
			'color': '#006d2c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' in South Florida.');
	$('.percent-year').css('display', 'none');

	// TOGGLE HOVER PRICE TABLES
	if (houseCheck === false) {
		$('#house-price').css({
			'float': 'left',
			'width': '50%',
			'border-right': '1px dashed #ccc',
			'border-right-style': 'dashed'
		});
		$('#condo-price').css('display', 'block');
	} else {
		$('#house-price').css({
			'float': 'none',
			'border': 'none',
			'width': '100%'
		});
		$('#condo-price').css('display', 'none');
	}

	$('.label-left')
		.html('Less Expensive')
		.css({
			'width': '50%',
			'text-align': 'left'
		});

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('More Expensive')
		.css({
			'width': '50%',
			'text-align': 'right'
		});

	$('.d-grade').css('display', 'none');
	$('.b-grade').css('display', 'none');

	clearDefaultLayers();
	map.addLayer($defaultHouseLayer);
}

function buildDefaultCondo() {
	$('.price-select').addClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');

	var price = 'price';

	buildKey(price);

	$('.housing-type')
		.html('Median value of condos/townhomes')
		.css({
			'color': '#006d2c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' in South Florida.');
	$('.percent-year').css('display', 'none');

	$('.label-left')
		.html('Less Expensive')
		.css({
			'width': '50%',
			'text-align': 'left'
		});

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('More Expensive')
		.css({
			'width': '50%',
			'text-align': 'right'
		});

	$('.d-grade').css('display', 'none');
	$('.b-grade').css('display', 'none');

	clearDefaultLayers();
	map.addLayer($defaultCondoLayer);
}


function buildDefaultPercentHouse() {

	$('.percent-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');

	var percent = 'percent';
	var houseCheckbox = $('.house:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));

	buildKey(percent);

	// TOGGLE HOVER TABLE PRICE
	if (houseCheck === false) {
		$('#house-price').css({
			'float': 'left',
			'width': '50%',
			'border-right': '1px dashed #ccc',
			'border-right-style': 'dashed'
		});
		$('#condo-price').css('display', 'block');
	} else {
		$('#house-price').css({
			'float': 'none',
			'border': 'none',
			'width': '100%'
		});
		$('#condo-price').css('display', 'none');
	}

	$('.housing-type')
		.html('Value change of single-family homes')
		.css({
			'color': '#08519c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' in South Florida');
	$('.percent-year').css('display', 'inline');

	$('.label-left')
		.html('1%')
		.css({
			'width': '50%',
			'text-align': 'left'
		});

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('28%')
		.css({
			'width': '50%',
			'text-align': 'right'
		});

	$('.d-grade').css('display', 'none');
	$('.b-grade').css('display', 'none');

	clearDefaultLayers();
	map.addLayer($defaultPercentHouseLayer);
}

function buildDefaultPercentCondo() {

	$('.percent-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');

	var percent = 'percent';
	var condoCheckbox = $('.condo:checkbox');
	var condoCheck = (condoCheckbox.is(':checked'));

	buildKey(percent);

	if (condoCheck === false) {
		$('#condo-price').css({
			'float': 'right',
			'width': '50%',
			'border': 'none'
		});
		$('#house-price').css('display', 'block');
	} else {
		$('#condo-price').css({
			'float': 'none',
			'border': 'none',
			'width': '100%'
		});
		$('#house-price').css('display', 'none');
	}

	$('.housing-type')
		.html('Value change of condos/townhomes')
		.css({
			'color': '#08519c',
			'font-weight': 'bold'
		});

	$('.housing-explainer').html(' in South Florida');
	$('.percent-year').css('display', 'inline');


	$('.label-left')
		.html('1%')
		.css({
			'width': '50%',
			'text-align': 'left'
		});

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('25%')
		.css({
			'width': '50%',
			'text-align': 'right'
		});

	clearDefaultLayers();
	map.addLayer($defaultPercentCondoLayer);
}


function buildDefaultCrime() {

	$('.crime-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');

	var crime = 'crime';
	buildKey(crime);

	$('.label-left')
		.html('Low')
		.css({
			'width': '33%',
			'text-align': 'left'

		});

	$('.label-middle')
		.html('Average')
		.css({
			'display': 'inline-block',
			'text-align': 'center',
			'width': '33%'
		});

	$('.label-right')
		.html('High')
		.css({
			'width': '33%',
			'text-align': 'right'

		});

	$('.d-grade').css('display', 'none');
	$('.b-grade').css('display', 'none');

	$('.housing-type')
		.html('Crime rates ')
		.css({
			'color': '#a50f15',
			'font-weight': 'bold'
		});

	$('.housing-explainer').html(' by ZIP code across South Florida.');
	$('.percent-year').css('display', 'none');

	clearDefaultLayers();
	map.addLayer($defaultCrimeLayer);
}


function buildDefaultSchool() {

	$('.school-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');

	var school = 'school';
	buildKey(school);

	$('.housing')
		.html('School rates')
		.css({
			'color': '#54278f',
			'font-weight': 'bold'
		});


	$('.label-left')
		.css({
			'width':'20%',
			'text-align':'center'
		})
		.html('A');

	$('.b-grade')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('B');

	$('.label-middle')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('C');

	$('.d-grade')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('D');


	$('.label-right')
		.css({
			'width':'20%',
			'text-align':'center'
		})
		.html('F');

	$('.housing-type')
		.html('Average school grade ')
		.css({
			'color': '#54278f',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' determined by the Florida Department of Education.');
	$('.percent-year').css('display', 'none');

	clearDefaultLayers();
	map.addLayer($defaultSchoolLayer);
}


// BUILD HOUSE MAP
function buildHouseMap() {

	var price = 'price';
	var incomeInput = $('.income-box').val();
	var income = getIncome(incomeInput);

	console.log(income, incomeInput);

	$('.income-ammount').html('$' + numeral(incomeInput).format('0,0'));
	$('.income-spend').html('$' + numeral(income).format('0,0'));
	$('.income-button').attr('disabled', 'disabled');
	$('.price-select').addClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');

	var count = 0;

	$zipData.forEach(function(d) {
		d.features.forEach(function(i) {
			if (income >= i.properties.currHousePrice) {
				return count++;
			}
		})
	});

	if (count >= 1) {
		$('.no-data').hide();
	}

	console.log('Houses:' + count);

	$('.housing').html('single-family homes');
	$('.zip-count').html(count);

	$('.money').html('$'+numeral(income).format('0,0'));

	$('.key-holder').css('display', 'block');
	$('.housing-type')
		.html('Affordable ')
		.css({
			'color': '#006d2c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' single-family houses in South Florida.');
	$('.percent-year').css('display', 'none');

	$('.label-left')
		.html('Less expensive')
		.css({
			'width': '50%',
			'text-align': 'left'
	});

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('More expensive')
		.css({
			'width': '50%',
			'text-align': 'right'
	});

	$('.d-grade').css('display', 'none');
	$('.b-grade').css('display', 'none');

	buildKey(price);
	showExplainer();
	clearAllLayers();
	map.addLayer($houseLayer);
}

// BUILD CONDO MAP
function buildCondoMap() {

	var price = 'price';
	var incomeInput = $('.income-box').val();
	var income = getIncome(incomeInput);

	$('.income-ammount').html('$' + numeral(incomeInput).format('0,0'));
	$('.income-spend').html('$' + numeral(income).format('0,0'));
	$('.income-button').attr('disabled', 'disabled');
	$('.percent-select').removeClass('selected-interface');
	$('.price-select').addClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');

	$('.key-holder').css('display', 'block');
	$('.housing-type')
		.html('Affordable ')
		.css({
			'color': '#006d2c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' condos in South Florida.');
	$('.percent-year').css('display', 'none');

	$('.label-left')
		.html('Less expensive')
		.css({
			'width': '50%',
			'text-align': 'left'
	});

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('More expensive')
		.css({
			'width': '50%',
			'text-align': 'right'
	});

	$('.d-grade').css('display', 'none');
	$('.b-grade').css('display', 'none');

	var count = 0;

	$zipData.forEach(function(d) {
		d.features.forEach(function(i) {
			if (income >= i.properties.currCondoPrice) {
				return count++;
			}
		})
	});

	if (count >= 1) {
		$('.no-data').hide();
	}

	$('.income').html('$' + numeral(income).format('0,0'));
	$('.housing').html('condo or townhouse');
	$('.zip-count').html(count);

	$('.money').html('$'+numeral(income).format('0,0'));

	console.log('Condos: ' + count);

	buildKey(price);
	clearAllLayers();
	showExplainer();
	map.addLayer($condoLayer);
}

function buildHousePercentMap() {

	var legendColors = ['#eff3ff', 'rgba(37, 64, 143, 0.25)', 'rgba(37, 64, 143, 0.50)', 'rgba(37, 64, 143, 0.75)', 'rgba(37, 64, 143, 1)'];

	$('.income-button').attr('disabled', 'disabled');
	$('.percent-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.key-holder').css('display', 'block');
	$('.legend-block').remove();
	$('.housing-type')
		.html('Value change ')
		.css({
			'color': '#08519c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' of single-family houses since 2014 in the ZIP Codes you can afford.');
	$('.percent-year').css('display', 'none');

	$('.label-left')
		.html('1%')
		.css({
			'width': '50%',
			'text-align': 'left'
		});

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('28%')
		.css({
			'width': '50%',
			'text-align': 'right'
		});

	$('.d-grade').css('display', 'none');
	$('.b-grade').css('display', 'none');

	for (var i = 0; i < legendColors.length; i++) {
		$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
	}

	showExplainer();
	clearAllLayers();
	map.addLayer($percentHouseLayer);
}

function buildCondoPercentMap() {

	var legendColors = ['#eff3ff', 'rgba(37, 64, 143, 0.25)', 'rgba(37, 64, 143, 0.50)', 'rgba(37, 64, 143, 0.75)', 'rgba(37, 64, 143, 1)'];

	$('.income-button').attr('disabled', 'disabled');
	$('.percent-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.key-holder').css('display', 'block');
	$('.legend-block').remove();
	$('.housing-type')
		.html('Price change ')
		.css({
			'color': '#08519c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' for condos and townhouses since 2014 in the ZIP Codes you can afford.');
	$('.percent-year').css('display', 'none');

	$('.label-left')
		.html('1%')
		.css({
			'width': '50%',
			'text-align': 'left'
		});

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('25%')
		.css({
			'width': '50%',
			'text-align': 'right'
		});

	$('.d-grade').css('display', 'none');
	$('.b-grade').css('display', 'none');

	for (var i = 0; i < legendColors.length; i++) {
		$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
	}

	clearAllLayers();
	showExplainer();
	map.addLayer($percentCondoLayer);
}


function buildCrimeMap() {
	var currYear = $zipData[0].features[0].properties.currYear;
	var legendColors = ['rgba(237, 25, 65, 0.3333)', 'rgba(237, 25, 65, 0.6667)', 'rgba(237, 25, 65, 1)'];

	$('.income-button').attr('disabled', 'disabled');
	$('.crime-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('.key-holder').css('display', 'block');
	$('.legend-block').remove();
	$('.key-standfirst').html('Crime rate <span class="key-sub">(' + (currYear - 1) + ')</span>');
	$('.housing-type')
		.html('Crime rates ')
		.css({
			'color': '#a50f15',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' for ZIP Codes you can afford.');
	$('.percent-year').css('display', 'none');

	$('.label-left')
		.html('Low')
		.css({
			'width': '33%',
			'text-align': 'left'
		});

	$('.label-middle')
		.html('Average')
		.css({
			'display': 'inline-block',
			'width': '33%'
		});

	$('.label-right')
		.html('High')
		.css({
			'width': '33%',
			'text-align': 'right'
		});

	$('.d-grade').css('display', 'none');
	$('.b-grade').css('display', 'none');

	for (var i = 0; i < legendColors.length; i++) {
		$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
	}

	$('.legend-block').css('width', '33%');

	clearAllLayers();
	map.addLayer($crimeLayer);
}

function buildSchoolMap() {

	var legendColors = ['rgba(209, 161, 13, 1)', 'rgba(209, 161, 13, 0.8)', 'rgba(209, 161, 13, 0.6)', 'rgba(209, 161, 13, 0.4)', 'rgba(209, 161, 13, 0.2)'];

	$('.income-button').attr('disabled', 'disabled');
	$('.crime-select').removeClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('.school-select').addClass('selected-interface');
	$('.key-holder').css('display', 'block');
	$('.legend-block').remove();
	$('.housing-type')
		.html('Average school grade ')
		.css({
			'color': '#54278f',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' for ZIP Codes you can afford.');
	$('.percent-year').css('display', 'none');

	$('.label-left')
		.css({
			'width':'20%',
			'text-align':'center'
		})
		.html('A');

	$('.b-grade')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('B');

	$('.label-middle')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('C');

	$('.d-grade')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('D');

	$('.label-right')
		.css({
			'width':'20%',
			'text-align':'center'
		})
		.html('F');

	for (var i = 0; i < legendColors.length; i++) {
		$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
	}

	clearAllLayers();
	map.addLayer($schoolLayer);
}
