var speed = 0.30;
var angularSpeed = 0.006;
var defaultLineWidth = 7;
var minLineWidth =10;

maxPlayerCount = 4;
minPlayerCount = 1;


var bgColor = "#000000";

var playerColors = [ "#ff4500","#22a4ff", "#22ff33", "#ff2fd3"];
var playerNames = ["Orange", "Blue", "Green", "Pink"];

var increasespeed=function(){
	if(speed<0.6)
<<<<<<< HEAD
	{speed=speed+0.1  ;
	resetCanvas() ;
        }
} ;
var decreasespeed=function(){
	if(speed>0.4) 
	{speed=speed-0.1 ;
   resetCanvas() ;
   }
};
var incangspeed=function(){
	angularSpeed+=0.001 ;
	resetCanvas() ;
} ;
var decangspeed=function(){
	if(angularSpeed>0.007)
	{angularSpeed-=0.001 ;
    resetCanvas() ; }
=======
	{
            speed=speed+0.1  ;
	    resetCanvas() ;
	}
} ;
var decreasespeed=function(){
      if(speed>0.4) 
    {
   speed=speed-0.1 ;
   resetCanvas() ;
    }
};
var incangspeed=function(){
	
  angularSpeed+=0.001 ;
  resetCanvas() ;
	
} ;
var decangspeed=function(){
    if(angularSpeed>0.007)
  {
    angularSpeed-=0.001 ;
    resetCanvas() ; 
  }
>>>>>>> origin/gh-pages
} ;

var keyCodes = [
	37,
	39,
	83,
	68,
	66,
	78,
	192,
	49,
	65,
	87,
	70,
	38,
	40,
	80
]

var keyNames = [
	'left',
	'right',
	's',
	'd',
	'b',
	'n',
	'`',
	'1',
	'a',
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
