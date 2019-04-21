var canvas;
var myContext;
var ballX = 50;
var ballY = 15;
var ballSpeedX = 20;
var ballSpeedY = 20;
var paddle_1_y = 250;
var paddle_2_y = 250;
var player1Score = 0;
var player2Score = 0;
var showWinScreen = false;
const PADDLE_HEIGHT = 100;
const WINNING_SCORE = 3;
const PADDLE_THICKNESS = 10;

  window.onload = function(){
    canvas = document.getElementById('myCanvas');
    myContext = canvas.getContext('2d');
      
    var framesPerSecond = 30;
    setInterval(function(){
          moveEverything();
          drawEveryting();
      } , 1000/framesPerSecond);
      
        }
  
 
function moveEverything(){
	if(showWinScreen){
		return;
	}
      computerMovement();
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    
      if(ballX > canvas.width - 5){
           if(ballY >= paddle_2_y && ballY <= paddle_2_y + PADDLE_HEIGHT){
			   ballSpeedX = -(ballSpeedX);
			  //angle(paddle_2_y);
		  }else{
		 // ballSpeedX = -(ballSpeedX);
       		  player1Score++
			  ballReset();
		  }
      }
      if(ballX < 5){
		  if(ballY >= paddle_1_y && ballY <= paddle_1_y + PADDLE_HEIGHT){
			   ballSpeedX = -(ballSpeedX);
			 //angle(paddle_1_y);
		  }else{
		 // ballSpeedX = -(ballSpeedX);
			  player2Score++;       		
			  ballReset();
		  }
	  }
    
      if(ballY > canvas.height){
          ballSpeedY = -ballSpeedY;
      }
      if(ballY < 0){
          ballSpeedY = -(ballSpeedY);
      } 
	/*
	if(ballY < canvas.width - 5){
		if(ballY > paddle_2_y && ballY < paddle_2_y + PADDLE_HEIGHT){
			ballSpeedY = -(ballSpeedY)
		}else{
			ballReset();
		}
	} */
	
	canvas.addEventListener('mousedown', handeMouseClick);
	
  canvas.addEventListener('mousemove', function(evt){
      var myMouse = mousePosition(evt);
      paddle_1_y = myMouse.y;
      paddle_1_y = myMouse.y - (PADDLE_HEIGHT/2);
   });
    

}
function handeMouseClick(evt){
	if(showWinScreen){
		player1Score = 0;
		player2Score = 0;
		showWinScreen = false;
	}
}
function angle(el){
 	var deltaY = ballY - (el + PADDLE_HEIGHT/2);
	if(deltaY == el+(PADDLE_HEIGHT/2)){
		ballSpeedY = ballSpeedY;
	}else{
	ballSpeedY = deltaY * 0.5;
	}
}

function computerMovement(){
	var paddle_2_YCenter = paddle_2_y + (PADDLE_HEIGHT/2)
	if(paddle_2_YCenter < ballY){
		//console.log(ballY);
		//paddle_2_y = ballX;
		paddle_2_y += 10;
	}else {
		paddle_2_y -= 10;
	}
	
}
function ballReset(){
	
	if(player1Score >= WINNING_SCORE || 
	    player2Score >= WINNING_SCORE){
			//console.log(WINNING_SCORE);
		showWinScreen = true;
		}
    ballX = canvas.width/2;
   // ballSpeedX = 10;
    ballY = canvas.height/2;
	ballSpeedX = -(ballSpeedX)

    
}
function mousePosition(evt){
    var rect = canvas.getBoundingClientRect();
    var scroll = document.documentElement;
    var x = evt.clientX - rect.left - scroll.scrollLeft;
    var y = evt.clientY - rect.top - scroll.scrollTop;
    return {x : x,
            y : y};
}




function drawEveryting(){
	       
      drawRect(0,0,canvas.width ,canvas.height , 'black'); 

	if(showWinScreen){
		myContext.fillStyle = 'White';
			if(player1Score >= WINNING_SCORE ){
				myContext.fillText(" Player 1 win the game", 350, 200);
			} else if(player2Score >= WINNING_SCORE){
				myContext.fillText(" Player 2 Win the game", 350, 200);
			//console.log(WINNING_SCORE);
			}
		
		myContext.fillText("Click to Continue" , 360 , 500);
    	return;
	}
	 drawNet();
		drawRect(0 ,paddle_1_y, PADDLE_THICKNESS, PADDLE_HEIGHT,'green');
      drawRect(canvas.width - PADDLE_THICKNESS,paddle_2_y, PADDLE_THICKNESS, PADDLE_HEIGHT,'green'); //Computer Paddle
	  myContext.fillStyle = 'White';
  	  myContext.fillText('Player-1 : '+player1Score, 100, 100);
  	  myContext.fillText('Player-2 : '+player2Score, canvas.width-200, 100);
      //Circle
      drawCircle(ballX , ballY , 10 , 'blue');
}

function drawCircle(centerX, centerY, radius, drawColor){
      myContext.fillStyle = drawColor;
      myContext.beginPath();
      myContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
                    
      myContext.fill();
}
function drawNet(){
	for(var i = 0; i< canvas.width; i+=40){
		drawRect(canvas.width/2,i,2 ,20,'pink')
	}
}
function drawRect(leftX,topY,width , height , drawColor){
     myContext.fillStyle = drawColor;
     myContext.fillRect(leftX,topY,width,height);
}





































    