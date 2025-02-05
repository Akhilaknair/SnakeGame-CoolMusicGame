
// constants and variables 
let inputdir = { x: 0, y: 0 };

// initialise sounds 
const EatSound = new Audio('food.mp3');
const GameEndSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3')
const bgSound = new Audio('music.mp3')

let score=0
let speed = 7
let lastTime = 0
//game loop :: paints repeatedly

let SnakeArray = [
    { x: 17, y: 15 }
]

let bar=document.getElementsByClassName('bar')[0]




setInterval(function()
{
    bar.classList.toggle('bulb')
    bar.classList.toggle('bar') 
},500)

 let Particle = { x: 6, y: 8 };



function GameFuncn(current_time) {
    window.requestAnimationFrame(GameFuncn)//Now it enter the loop

    // to reduce the speed of FPS 
    if ((current_time - lastTime) / 1000 < 1 / speed) {
        return; // dont paint now 
    }

    lastTime = current_time;
    gameEngine();

}


function getsCollide(snake) {


 //snake apne aap ke andhar ghus jaye 
   for(let i=1;i<SnakeArray.length;i++)
   {
    if(snake[i].x === snake[0].x && snake[i].y===snake[0].y)
    {
        return true;
    }
   
    
   }

   if(snake[0].x>18 || snake[0].x<0 || snake[0].y>18 || snake[0].y<0 )
   {
       return true;
   }

  
   // return false;
}







function gameEngine() {
    bgSound.play()

    // update snake array and Food 
    if (getsCollide(SnakeArray)) {
        GameEndSound.play();
        bgSound.pause();
        score=0
        inputdir = { x: 0, y: 0 };
        
        alert('GAME OVER 👾😢')
        points.innerHTML='Score :: ' +0
        SnakeArray = [
            { x: 17, y: 15 }
        ]
        bgSound.play()

    }


    // Display snake 
    snake_board.innerHTML = "";
    SnakeArray.forEach((element, index) => {
        let newElement = document.createElement('div');

        newElement.style.gridRowStart = element.y;
        newElement.style.gridColumnStart = element.x;
        if (index === 0) {
            newElement.classList.add('head')
        }
        else {
            newElement.classList.add('snake')
        }
        snake_board.appendChild(newElement)
    });

    // display food

    let FoodElement = document.createElement('div');

    FoodElement.style.gridRowStart = Particle.y;
    FoodElement.style.gridColumnStart = Particle.x;
    FoodElement.classList.add('food')
    snake_board.appendChild(FoodElement)



    // if u get food :: incre score and set new food
    if (SnakeArray[0].x === Particle.x && SnakeArray[0].y === Particle.y) {
        
        EatSound.play()
        
        score++
       points.innerHTML='Score :: '+ score

       if(score>highval)
       {
             highval=score
           localStorage.setItem('hiscore',JSON.stringify(highval))
           HighScoreBox.innerHTML='HighScore :: '+highval
       }



        SnakeArray.unshift({
            x: SnakeArray[0].x + inputdir.x,
            y: SnakeArray[0].y + inputdir.y,
        })//////kaam aya smj


        //set new food
        let a = 2;
        let b = 16;
        Particle = { x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random()) }


    }




    //Move the snake 
    for (let i = SnakeArray.length - 2; i >= 0; i--) {
        const elem = SnakeArray[i]
        SnakeArray[i + 1] = { ...SnakeArray[i] }// to handle reference problem
    }
    SnakeArray[0].x += inputdir.x
    SnakeArray[0].y += inputdir.y

}






let val=localStorage.getItem('hiscore')
if(val===null)
{
    highval=0
    localStorage.setItem('hiscore',JSON.stringify(highval))
}
else{
    highval=JSON.parse(val)
    HighScoreBox.innerHTML='HighScore :: '+ highval
}


//Main logic starts here 
window.requestAnimationFrame(GameFuncn);// fires GameFuncn here but will not fire this again and again

// logic
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 } // 
    moveSound.play()

    switch (e.key) {
        case 'ArrowUp':
            {
                console.log('ArrowUp')
                inputdir.x = 0;
                inputdir.y = -1;
                break;
            }
        case 'ArrowDown':
            {
                console.log('ArrowDown')
                inputdir.x = 0;
                inputdir.y = +1;
                break;
            }
        case 'ArrowLeft':
            {
                console.log('ArrowLeft')
                inputdir.x = -1;
                inputdir.y = 0;
                break;
            }
        case 'ArrowRight':
            {
                console.log('ArrowRight')
                inputdir.x = 1;
                inputdir.y = 0;
                break;
            }
        default:
            break;
    }

})













