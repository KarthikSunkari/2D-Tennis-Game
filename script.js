const initialspeedX = 7.5;		//Initial Speeds
const initialspeedY = 1.5;
const DimensionX = 1200;		//Dimensions
const DimensionY = 500;


var ballx = DimensionX/2;
var ballSpeedx = initialspeedX;

var bally = DimensionY/2;
var ballSpeedy = initialspeedY;

var fps = 60;		//Frames per sec

var canvas = document.getElementById("CanvasGame");
var	canvasContext = canvas.getContext('2d');
var scoreUpdate = document.getElementById("ScoreCard");
var	scoreContext = scoreUpdate.getContext('2d');

var pad1x = 0;			//Player
var pad1y = 250;

var pad2x = 1190;		//Computer
var pad2y = 250;

var ballradius = 5;		//Ball Dimensions

const paddleheight = 80;	//Paddle Dimensions
const paddlewidth = 10;

var e = 0.35*6;
var speedMultiplier=1.009;		//Speed Enhancers

var xScore=0;
var yScore=0;

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return{
		x : mouseX,
		y : mouseY
		};
}

window.onload = function () {
	console.log("Hello");
	setInterval(myfunc,1000/fps);

	canvas.addEventListener('mousemove',
		function(evt){
			//pad1x=calculateMousePos(evt).x;
			pad1y=calculateMousePos(evt).y;
		}
		);
}

function ballReset(){
	ballx = canvas.width/2;
	bally = canvas.height/2;
	if(ballSpeedx<0)
	ballSpeedx = -initialspeedX;
	else
	ballSpeedx = initialspeedX;
	ballSpeedy = 0;
}

function finishGame(){
	if(xScore==7)
		window.alert("You Win!");
	else
		window.alert("Computer Wins!");
	scoreReset();
}

function scoreReset(){
	xScore=yScore=0;
}

function ComputerMov(){
	if(ballSpeedx>0){
		if(Math.abs(ballSpeedy)>5){
			if(pad2y<=bally)
				pad2y+=6;
			else if(pad2y>bally)
				pad2y-=6;
		}
		else if(Math.abs(ballSpeedy)!=0){
			if(pad2y<=bally)
				pad2y+=2;
			else if(pad2y>bally)
				pad2y-=2;
		}
		else{
			pad2y=bally;
		}
		console.log(pad2y + "-" + bally);
	}

}

function myfunc(){
	if(xScore==7 || yScore==7)
		finishGame();

	ComputerMov();

	if (ballx+paddlewidth>=canvas.width-1.2*ballradius){
		if(bally+ballradius>=pad2y-paddleheight/2 && bally-ballradius<=pad2y+paddleheight/2){
			ballSpeedx = -speedMultiplier*ballSpeedx;
			ballSpeedy = speedMultiplier*Math.cbrt(bally-pad1y)*e;
		}
		else{
			ballReset();
			xScore++;
		}
	}

	if(ballx<=1.2*ballradius+paddlewidth) {
		if(bally+2*ballradius>=pad1y-paddleheight/2 && bally-2*ballradius<=pad1y+paddleheight/2){
			ballSpeedx = -ballSpeedx;
			ballSpeedy = Math.cbrt(bally-pad1y)*e;
		}
		else{
			ballReset();
			yScore++;
		}
	}
			
	if (bally>canvas.height-ballradius || bally<ballradius) {
		ballSpeedy = -ballSpeedy;
		console.log(bally);
	}

	//background
	canvasContext.fillStyle="black";
	canvasContext.fillRect(0,0,canvas.width,canvas.height);

	//Score
	scoreContext.fillStyle = "gray";
	scoreContext.fillRect(0,0,scoreUpdate.width,scoreUpdate.height );


	scoreContext.fillStyle = "blue";
	scoreContext.font = "18px Arial";
	scoreContext.fillText("Player: "+xScore,210,20);
	scoreContext.fillText("CPU: "+yScore,940,20);

	//Player
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(pad1x,pad1y-paddleheight/2,paddlewidth,paddleheight);

	//Computer
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(pad2x,pad2y-paddleheight/2,paddlewidth,paddleheight);

	//ball
	canvasContext.fillStyle='red';
	canvasContext.beginPath();
	canvasContext.arc(ballx,bally,ballradius,0,Math.PI*2,true);
	canvasContext.fill();

	//Position Update 
	ballx+=ballSpeedx;
	bally+=ballSpeedy;


}