var speed = 0.30;
var angularSpeed = 0.006;
var defaultLineWidth = 7;
var minLineWidth =10;

maxPlayerCount = 4;
minPlayerCount = 1;


var bgColor = "#000000";

var playerColors = [ "#ff4500","#22a4ff", "#22ff33", "#ff2fd3"];
var playerNames = ["Orange", "Blue", "Green", "Pink"];

var keyCodes = [
	37,
	39,
        65,
	68,
	66,
	77,
	85,
	79,
	87,
	70,
	38,
	40,
	80
]

var keyNames = [
	'left',
	'right',
	'a',
	'd',
	'b',
	'm',
	'u',
	'o',
	'w',
	'f',
	'down',
	'up' ,
	'p' ,
]

var defaultKeyCombos = [
	[0,1],
	[2,3],
	[4,5],
	[6,7]
]

var playerConfig = function(colorIndex, keyAnti, keyClocki){
	this.colorIndex = colorIndex;
	this.keyAnti = keyAnti;
	this.keyClocki = keyClocki;
}

function getDefaultPlayerConfigList(noOfPlayers){
	defaultPlayerConfigList = [];
	for(var i = 0; i < noOfPlayers; i++){
		defaultPlayerConfigList[i] = new playerConfig(i, defaultKeyCombos[i][0], defaultKeyCombos[i][1]);
	}
	return defaultPlayerConfigList;
}
var isActive;

window.onfocus = function () { 
  isActive = true; 
}; 

window.onblur = function () { 
 if(isActive==true)
 { isActive=false ;
 	pauseGame()  ; }

 }; 
