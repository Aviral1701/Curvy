function getConfigFromUrl(){
	var querySring = location.search;
	var index1 = querySring.indexOf('config=');
	if (index1 != -1){
		index2 = querySring.indexOf('&',index1+7);
		if (index2 != -1){
			configString = querySring.slice(index1+7,index2);
		} else {
			configString = querySring.slice(index1+7);
		}
		return(JSON.parse(atob(decodeURIComponent(configString))));
	}
	return null;
}

var canvasWidth=700, canvasHeight = 510;

var player = function(direc , xx, yy , col, keyAnti, keyClocki, prevScore) {
	this.direction = direc;
	this.x = xx;
	this.y = yy;
	this.color = col;
	this.keyAnti =  keyAnti;
	this.keyClocki = keyClocki;
	this.alive = true;
	this.lineWidth = defaultLineWidth;
	this.score = prevScore;
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;


var playerList = [];
var timeElapsed=0;
var noOfAlivePlayers;
var gamePaused=false ;

var resetCanvas =  function(){
	
	ctx.fillStyle = bgColor;
	ctx.fillRect(0,0,canvas.width,canvas.height);

	if(!playerList) playerList = [];
	for(var iitu = 0; iitu < noOfPlayers; iitu++){
		console.log(playerList[iitu]);
		console.log("playerList[iitu].score");
		console.log(playerList[iitu]?playerList[iitu].score:0);
		playerList[iitu] =  new player(
			Math.floor((Math.random() * 2 * Math.PI)),
			Math.floor((Math.random() * canvasWidth * (0.6)) + canvasWidth * (0.2)),
			Math.floor((Math.random() * canvasHeight * (0.6)) + canvasHeight * (0.2)),
			config[iitu].colorIndex,
			config[iitu].keyAnti,
			config[iitu].keyClocki,
			(playerList[iitu]?playerList[iitu].score:0)
		);
	}

	timeElapsed=0;
	noOfAlivePlayers = noOfPlayers;
	if(gamePaused==true)
	{
		pauseGame() ;
	}
		
     		
}


//pressed keys
var pressedKeys = {};



//add key
addEventListener("keydown", function (e) {
	pressedKeys[e.keyCode] = true;
	if(80 in pressedKeys)
	{    
       pauseGame() ;        
        }
	console.log(e.keyCode);
}, true);		


//remove key
addEventListener("keyup", function (e) 
{	delete pressedKeys[e.keyCode];
}, true);


var pauseGame=function(){
  if(gamePaused==false)
  {
	gamePaused=true ;  
  }
  else
  {  then=Date.now() ;
     gamePaused=false ; 
     main() ;
  }

} ;


var appendScoreDivs = function(){
	for(var i = 0; i < noOfPlayers; i++){
		newDiv = document.createElement("div");
		newDiv.className = "playerStatusDiv";
		
		newDivName = document.createElement("div");
		newDivName.className = "playerNameStatusDiv"
		newDivName.innerHTML = playerNames[config[i].colorIndex];

		newDivColor = document.createElement("div");
		newDivColor.className = "playerColorStatusDiv";
		newDivColor.style.backgroundColor = playerColors[config[i].colorIndex];

		newDivScore = document.createElement("div");
		newDivScore.className = "playerScoreStatusDiv";
		newDivScore.id = playerScoreDivIdPrefix + i;
		newDivScore.innerHTML = "0";

		newDiv.appendChild(newDivName);
		newDiv.appendChild(newDivColor);
		newDiv.appendChild(newDivScore);

		document.getElementById("scores").appendChild(newDiv);
	}
}

var showScores = function(){
	for(var ioi = 0; ioi < noOfPlayers; ioi++){
		document.getElementById(playerScoreDivIdPrefix + ioi).innerHTML = playerList[ioi].score;
	} 
}

var increaseSpeed=function(){

	speed=speed+0.1  ;
	resetCanvas() ;
        
} ;
var decreaseSpeed=function(){
	if(speed>0.4) 
	{speed=speed-0.1 ;
         resetCanvas() ;
   }
};
var incAngularSpeed=function(){
	angularSpeed+=0.001 ;
	resetCanvas() ;
} ;
var decAngularSpeed=function(){
	if(angularSpeed>0.007)
	{angularSpeed-=0.001 ;
    resetCanvas() ; }
} ;


