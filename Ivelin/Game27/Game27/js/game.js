'use strict'
const game = new Phaser.Game(2270, 1080, Phaser.AUTO, 'game-canvas', { preload, create, update })

let player1
let A
let D
let W
let platforms
let coins
let ki=0
let x=0
let styleText;
let scoreText
let i = 0
let deathMessage;
let score=0

function preload() {
    game.load.spritesheet('p1','pictures/spriteSheet/guy.624x450.6x3.png',624 / 6 , 450/3)
    game.load.image('platform','pictures/backgrounds/platform.png')
    game.load.image('bg','pictures/backgrounds/desert.png')
    game.load.spritesheet('coin','pictures/spriteSheet/star.960x960.5x5.png',960 / 5, 960 / 5)
}
    
function create() {
    createWorld()
    createButtons()
    //console.log(coins.length)
    scoreAndResult()
}

function createWorld(){
    game.stage.backgroundColor = 'rgb(255, 136, 170)';
    game.world.setBounds(0, 0, 20000, 1000)
    while (x<20000){
        game.add.sprite(x,0,'bg');
        x+=1920
    }
    createPlayer()
    game.camera.follow(player1, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1)
    
    platforms = game.add.group()
    platforms.enableBody = true

    coins = game.add.group()
    coins.enableBody = true

    for(let x = 0; x < game.world.width; x += game.rnd.integerInRange(120, 400)){
        let y = game.rnd.integerInRange(200, 600)
        platforms.create(x,y,'platform')
        coins.create(x + 70,y - 80,'coin')
    }
    
    platforms.forEach(function(p){
        p.scale.setTo(0.2);
        p.body.immovable = true
    })

    coins.forEach(function(coin){
        coin.scale.setTo(0.4)
        coin.animations.add('coin-animations' , [0,1,2,3,4] , 13 ,true)
        coin.animations.play('coin-animations')
    })
}

function update(){ 
    movePlayer()
    death()
    //console.log(coins.length)
    ki+=2
    if (score >=20){
        alert('You win! Score: '+score)
    }
    
}

function createButtons(){
    A = game.input.keyboard.addKey(Phaser.Keyboard.A)
    D = game.input.keyboard.addKey(Phaser.Keyboard.D)
    W = game.input.keyboard.addKey(Phaser.Keyboard.W)
}

function createPlayer(){
    player1 = game.add.sprite(0,0  ,'p1')
    player1.frame = 12
    player1.scale.setTo(0.6)
    player1.animations.add('left-move',[6,7,8,9,10,11],8,true)
    player1.animations.add('right-move',[0,1,2,3,4,5],8,true)
    game.physics.arcade.enable(player1)
    player1.body.collideWorldBounds = true
    player1.body.gravity.y = 500
    //player1.body.gravity.y = 0 
    player1.body.bounce.y = 0
}

function movePlayer(){
    if(A.isDown){
        player1.animations.play('left-move')
        player1.body.velocity.x = -300
   }else if(D.isDown){   
        player1.body.velocity.x = 300
        player1.animations.play('right-move')
   }else{
        player1.body.velocity.x = 0
        player1.animations.stop()
   }

   let flag = game.physics.arcade.collide(player1,platforms)

   if(W.isDown && flag){
        player1.body.velocity.y = -400
        player1.frame = 12
   }

   game.physics.arcade.collide(player1, coins, function(player1,currentCoin){
       currentCoin.destroy()
       score++;
       scoreText.setText("Score: " + score)
   })
}

function death() {
    if (player1.y>=800){
        alert("You lose")
    }
}

function scoreAndResult(){
    styleText = {
        font: 'Times New Roman',
        fontSize:  70,
        fontWeight: 'bold',
        fill: '#235432'
    }
    scoreText = game.add.text(ki,20,"Score: " + score, styleText);
}