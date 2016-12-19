playerScoreDivIdPrefix = "playerScoreDiv";
var highScore=0 ;



function getDefaultConfig(){
	return(getDefaultPlayerConfigList(1));
}

var config = getConfigFromUrl();
if (!config) config = getDefaultConfig();
var noOfPlayers = 1 ;


var perimeter=function(x){
 var distance= speed*timeElapsed*angularSpeed*100 ;

 distance=Math.floor(distance/36+0.5) ;

 return distance ;
} ;



//render function
var render = function(millisecs){

	if(millisecs==0) return;
	timeElapsed+=millisecs;

	if(timeElapsed < 100){
		ctx.fillStyle = bgColor;
		ctx.fillRect(0,0,canvas.width,canvas.height);
	}

	for(var i = 0; i < playerList.length; i++)
	{
		if (playerList[i].alive==false) continue;

		var oldX = playerList[i].x;
		var newX = 0;
		var oldY = playerList[i].y;
		var newY = 0;
      
		var oldDirec = playerList[i].direction;

		//console.log(pressedKeys);
		if (( keyCodes[playerList[i].keyAnti] in pressedKeys)||(keyCodes[playerList[i].keyClocki] in pressedKeys)){
			sense = ((keyCodes[playerList[i].keyAnti] in pressedKeys)?1:-1);		//sense is 1 for anticlockwise, -1 for clockwise

			//console.log(playerList[i].direction);

			playerList[i].direction += angularSpeed * millisecs * sense;
			if(playerList[i].direction > 2 * Math.PI) playerList[i].direction -= 2*Math.PI;
			if(playerList[i].direction < -2 * Math.PI) playerList[i].direction += 2*Math.PI;

			dist = speed * millisecs;
			var newX = oldX + dist * Math.cos(oldDirec);
			var newY = oldY - dist * Math.sin(oldDirec);

			playerList[i].x = newX;
			playerList[i].y = newY;
		}
		else{
			dist = speed * millisecs;
			newX = oldX + dist * Math.cos(oldDirec);
			newY = oldY - dist * Math.sin(oldDirec);

			
			playerList[i].x = newX;
			playerList[i].y = newY;

		}
		if(newX<0 || newX > canvasWidth || newY< 0 || newY > canvasHeight)
		{
			playerList[i].alive=false;
			

		}


		//Algo for colision detection.
		if(playerList[i].alive){
			playerList[0].score=perimeter(timeElapsed) ;
			showScores() ;
			for(var ii = 1; ii<=1.2; ii+= 0.1){
				testX = oldX + defaultLineWidth*(ii) * Math.cos(oldDirec);
				testY = oldY - defaultLineWidth*(ii) * Math.sin(oldDirec);		
				cols=ctx.getImageData(testX,testY,1,1).data;
				//if(cols[0]!=0){console.log("col  " + cols[0]);}

				if ((cols[0] >25 && cols[0] < 45) || (cols[0] >145 && cols[0] < 180) || (cols[0] >239))
				{
					playerList[i].alive=false;
					
				}
			}
		}

		if (playerList[i].alive==false) {
                  if(highScore<perimeter(timeElapsed)){
				  highScore=perimeter(timeElapsed) ;
				  document.getElementById("currentScore").innerHTML = highScore ;
				  }
				  else
				 showScores();
				 setTimeout(function(){
					resetCanvas();
				},1500);
			}
		

		ctx.beginPath();
		ctx.moveTo(oldX,oldY);
		ctx.lineTo(newX,newY);
		ctx.strokeStyle = playerColors[playerList[i].color];
		ctx.lineWidth = playerList[i].lineWidth;
		ctx.lineCap = "round";
		ctx.stroke();

	}
};

var main = function () {
	var now = Date.now();
	var delta = now - then;
	render(delta) ; 
	//update(delta);
	then=now ;
	if(gamePaused==false)
	{	
	 setTimeout(function(){requestAnimationFrame(main);},10);
	}
	
   		
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();

appendScoreDivs();
resetCanvas();

render(0.001);
main();
