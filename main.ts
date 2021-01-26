/**
 * Next:
 * 
 * - Put in comments on new codes
 * 
 * - Start the balls from corners
 * 
 * Done:
 * 
 * - Place coins evenly
 * 
 * - Add game win condition
 * 
 * - Lost live when hit balls
 * 
 * - Get points when hit coins
 * 
 * - Add timeout
 * 
 * - Add a third ball
 * 
 * - Add the fourth ball
 * 
 * - Remove ball boucing codes
 * 
 * - Deprecated old functions
 * 
 * - Refactor ball creation codes
 * 
 * - Refactor to clean/restart stage
 */
function createPrincess () {
    Princess = sprites.create(img`
        . . . . . f f f f . . . . . 
        . . . f f 5 5 5 5 f f . . . 
        . . f 5 5 5 5 5 5 5 5 f . . 
        . f 5 5 5 5 5 5 5 5 5 5 f . 
        . f 5 5 5 d b b d 5 5 5 f . 
        f 5 5 5 b 4 4 4 4 b 5 5 5 f 
        f 5 5 c c 4 4 4 4 c c 5 5 f 
        f b b f b f 4 4 f b f b b f 
        f b b 4 1 f d d f 1 4 b b f 
        . f b f d d d d d d f b f . 
        . f e f e 4 4 4 4 e f e f . 
        . e 4 f 6 9 9 9 9 6 f 4 e . 
        . 4 d c 9 9 9 9 9 9 c d 4 . 
        . 4 f b 3 b 3 b 3 b b f 4 . 
        . . f f 3 b 3 b 3 3 f f . . 
        . . . . f f b b f f . . . . 
        `, SpriteKind.Player)
    Princess.setFlag(SpriteFlag.StayInScreen, true)
    Princess.setPosition(80, 20)
    controller.moveSprite(Princess)
}
function startStage () {
    if (firstStart == 1) {
        effects.starField.startScreenEffect()
        createCoins()
        firstStart = 0
    }
    createPrincess()
    createBalls()
    info.startCountdown(timeOut)
}
function loseLife () {
    scene.cameraShake(4, 500)
    music.powerDown.play()
    info.changeLifeBy(-1)
    cleanStage()
    startStage()
}
info.onCountdownEnd(function () {
    loseLife()
})
function deprecated_move (ball: Sprite) {
    if (ball.y > scene.screenHeight() - 20) {
        if (ball.vx > 0) {
            ball.setVelocity(50, -50)
        } else {
            ball.setVelocity(-50, -50)
        }
    }
    if (ball.y < 20) {
        if (ball.vx > 0) {
            ball.setVelocity(50, 50)
        } else {
            ball.setVelocity(-50, 50)
        }
    }
    if (ball.x < 20) {
        if (ball.vy > 0) {
            ball.setVelocity(50, 50)
        } else {
            ball.setVelocity(50, -50)
        }
    }
    if (ball.x > scene.screenWidth() - 20) {
        if (ball.vy > 0) {
            ball.setVelocity(-50, 50)
        } else {
            ball.setVelocity(-50, -50)
        }
    }
}
function createBalls () {
    EnemyBalls = []
    for (let index = 0; index < numOfBalls; index++) {
        EnemyBall = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . 4 4 4 5 5 4 4 4 . . . . 
            . . . 3 3 3 3 4 4 4 4 4 4 . . . 
            . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
            . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
            . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
            . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
            . . . 4 2 2 2 2 2 2 2 2 4 . . . 
            . . . . 4 4 2 2 2 2 4 4 . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        EnemyBall.x = randint(10, scene.screenWidth() - 10)
        EnemyBall.y = randint(40, scene.screenHeight() - 10)
        EnemyBall.setVelocity(ballSpeed, ballSpeed)
        EnemyBall.setBounceOnWall(true)
        EnemyBalls.push(EnemyBall)
    }
}
function createCoins () {
    for (let index = 0; index <= 9; index++) {
        GoldCoin = sprites.create(img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `, SpriteKind.Food)
        GoldCoin.setPosition((index + 1) * 15, 50)
    }
    for (let index = 0; index <= 9; index++) {
        GoldCoin = sprites.create(img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `, SpriteKind.Food)
        GoldCoin.setPosition((index + 1) * 15, 70)
    }
    for (let index = 0; index <= 9; index++) {
        GoldCoin = sprites.create(img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `, SpriteKind.Food)
        GoldCoin.setPosition((index + 1) * 15, 90)
    }
    for (let index = 0; index <= 9; index++) {
        GoldCoin = sprites.create(img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `, SpriteKind.Food)
        GoldCoin.setPosition((index + 1) * 15, 110)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.magicWand.play()
    info.changeScoreBy(100)
    otherSprite.destroy(effects.fire, 500)
})
function cleanStage () {
    Princess.destroy()
    for (let index = 0; index <= EnemyBalls.length - 1; index++) {
        EnemyBalls[index].destroy()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    loseLife()
})
function createCoins_atRandPos () {
    for (let index = 0; index < 10; index++) {
        GoldCoin = sprites.create(img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `, SpriteKind.Food)
        GoldCoin.x = randint(10, scene.screenWidth() - 10)
        GoldCoin.y = randint(10, scene.screenHeight() - 10)
    }
}
let GoldCoin: Sprite = null
let EnemyBall: Sprite = null
let EnemyBalls: Sprite[] = []
let Princess: Sprite = null
let firstStart = 0
let ballSpeed = 0
let timeOut = 0
let numOfBalls = 0
info.setLife(3)
numOfBalls = 4
timeOut = 15
ballSpeed = 50
firstStart = 1
startStage()
game.onUpdateInterval(500, function () {
    if (info.score() == 4000) {
        game.over(true, effects.confetti)
    }
})
