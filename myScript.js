var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");


var ballRadius = 10;
var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;


var paddleHeight=12;
var paddleWidth=72;
var paddleX=(canvas.width-paddleWidth)/2;


var rightPressed=false;
var leftPressed=false;

//Bricks
var brickRowCount=4;
var brickColumnCount=7;
var brickWidth=80;
var brickHeight=24;
var brickPadding=12;
var brickOffsetTop=32;// Provides space so that brick does not stick to the canvas
var brickOffsetLeft=10;

//Score
var score=0;

//2D array that stores information about the brick
var bricks=[];
for(c=0;c<brickColumnCount;c++)
{
    bricks[c]=[];
    for(r=0;r<brickRowCount;r++)
    {
        bricks[c][r]={x:0,y:0,status: 1};
    }
}

//EventListeners
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);


function keyDownHandler(e)//Key is pressed
{
    if(e.keyCode==39)//right key wass pressed
    {
        rightPressed=true;
        
    }
    else if(e.keyCode==37)// left key pressed
    {
        leftPressed=true;
        
    }
}
function keyUpHandler(e)//Key is not pressed
{
    if(e.keyCode==39)//right key is pressed
    {
        rightPressed=false;
    }
    else if(e.keyCode==37)
    {
        leftPressed=false;
    }
}


function mouseMoveHandler(e)
{
    var relativeX=e.clientX-canvas.offsetLeft;
    if(relativeX>0&&relativeX<canvas.width)
    {
        paddleX=relativeX-paddleWidth/2;
    }
}


function collisoinDetection()
{    
    for(c=0;c<brickColumnCount;c++)
    {
        for(r=0;r<brickRowCount;r++)
        {
            var b=bricks[c][r];
            if(b.status==1)
            {
                
                if(x>b.x&&x<b.x+brickWidth && y>b.y&&y<b.y+brickHeight)                
                {
                    
                    dy=-dy;
                    b.status=0;//brick is hit by the ball so we want the brick to disappear
                    score++;
                    if(score==brickRowCount*brickColumnCount)
                    {
                        alert("CONGRATULATIONS!! You have won!!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}


function drawBall()
{
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2,false);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();
}


function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle="darkgoldenrod";
    ctx.fill();
    ctx.closePath();
}


function drawBricks()
{
    for(c=0;c<brickColumnCount;c++)
    {
        for(r=0;r<brickRowCount;r++)
        {
            if(bricks[c][r].status==1)
            {
                var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x=brickX;
                bricks[c][r].y=brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle="cornsilk";
                ctx.fill();
                ctx.closePath();
            }            
        }
    }
}





function drawScore()
{
    ctx.font="18px Arial";
    ctx.fillStyle="black";
    ctx.fillText("Score: "+score,8,20);
}


function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisoinDetection();
    drawScore();

    //Manages movement of ball
    if(x+dx>canvas.width-ballRadius||x+dx<ballRadius) //Bounce from Left and Right
    {
        dx=-dx;
    }
    if(y+dy<ballRadius) //Bounce from top
    {
        dy=-dy;
    }
    else if(y+dy>canvas.height-ballRadius)//For bottom
    {
        if(x>paddleX&&x<paddleX+paddleWidth)//For bouncing back from paddle
        {
            dy=-dy;
        }
        else//Reaching bottom
        {
            clearInterval(interval);
            alert("GAME OVER!!!!");
            document.location.reload();                   }
    }
    
    x+=dx;
    y+=dy;


    //manages movement of paddle
    if(rightPressed&&paddleX<canvas.width-paddleWidth)
    {
        paddleX+=7;
        
    }
    else if(leftPressed&&paddleX>0)
    {
        paddleX-=7;
        
    }
}

var interval=setInterval(draw, 10);
