function createBalls () {
    EnemyBall_1 = sprites.create(img`
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
    EnemyBall_1.x = randint(10, scene.screenWidth() - 10)
    EnemyBall_1.y = randint(10, scene.screenHeight() - 10)
    EnemyBall_1.setVelocity(50, 50)
    EnemyBall_2 = sprites.create(img`
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
    EnemyBall_2.x = randint(10, scene.screenWidth() - 10)
    EnemyBall_2.y = randint(10, scene.screenHeight() - 10)
    EnemyBall_2.setVelocity(-50, 50)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.magicWand.play()
    info.changeScoreBy(100)
    otherSprite.destroy(effects.fire, 500)
})
function move (ball: Sprite) {
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
        if (EnemyBall_1.vy > 0) {
            ball.setVelocity(-50, 50)
        } else {
            ball.setVelocity(-50, -50)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    music.powerDown.play()
    info.changeLifeBy(-1)
    Princess.setPosition(80, 10)
    EnemyBall_1.destroy()
    EnemyBall_2.destroy()
    createBalls()
})
/**
 * Next:
 * 
 * - To do more features
 * 
 * Done:
 * 
 * - Lost live when hit balls
 * 
 * - Get points when hit coins
 */
let EnemyBall_2: Sprite = null
let EnemyBall_1: Sprite = null
let GoldCoin: Sprite = null
let Princess: Sprite = null
effects.starField.startScreenEffect()
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
Princess.setPosition(80, 10)
controller.moveSprite(Princess)
info.setLife(3)
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
createBalls()
game.onUpdateInterval(500, function () {
    move(EnemyBall_1)
    move(EnemyBall_2)
})
