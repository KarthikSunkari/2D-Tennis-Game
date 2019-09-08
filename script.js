	var ballx = 350;var ballSpeedx = 10;
		var bally = 250;var ballSpeedy = 5;

		var fps = 30;		//Frames per sec

		var canvas = document.getElementById("CanvasGame");
		var	canvasContext = canvas.getContext('2d');

		var pad1x = 0;			//Player
		var pad1y = 220;

		var pad2x = 690;		//Computer
		var pad2y = 220;

		var ballradius = 5;
		var paddleheight = 60;
		var paddlewidth = 10
		var e = 0.35;

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
			ballSpeedx = -ballSpeedx;
			ballSpeedy = 5;
		}

		function myfunc(){
				if (ballx+paddlewidth>=canvas.width-ballradius){
					if(bally+ballradius>=pad2y-paddleheight/2 && bally-ballradius<=pad2y+paddleheight/2){
						ballSpeedx = -ballSpeedx;
						ballSpeedy = (bally -pad2y)*e;
					}
				else
					ballReset();
				}

				if(ballx<=ballradius+paddlewidth) {
					if(bally+ballradius>=pad1y-paddleheight/2 && bally-ballradius<=pad1y+paddleheight/2){
						ballSpeedx = -ballSpeedx;
						ballSpeedy = (bally -pad1y)*e;
					}
				else
					ballReset();
				}
			
			if (bally>canvas.height-ballradius || bally<ballradius) {
				ballSpeedy = -ballSpeedy;
			}

			//console.log(ballx + "*" + bally);
			//console.log(ballSpeedy);
			console.log(bally+"-"+pad2y);
			canvasContext.fillStyle="black";
			canvasContext.fillRect(0,0,canvas.width,canvas.height);
			//Player
			canvasContext.fillStyle = 'white';
			canvasContext.fillRect(pad1x,pad1y-paddleheight/2,paddlewidth,paddleheight);
			//Computer
			pad2y = bally;
			canvasContext.fillStyle = 'white';
			canvasContext.fillRect(pad2x,pad2y-paddleheight/2,paddlewidth,paddleheight);
			//ball
			canvasContext.fillStyle='red';
			canvasContext.beginPath();
			canvasContext.arc(ballx,bally,ballradius,0,Math.PI*2,true);
			canvasContext.fill();

			ballx+=ballSpeedx;
			bally+=ballSpeedy;
		}