let GoldCoin: Sprite = null
effects.starField.startScreenEffect()
let Princess = sprites.create(img`
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
Princess.setPosition(75, 20)
controller.moveSprite(Princess)
for (let index = 0; index < 4; index++) {
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
let EnemyBall = sprites.create(img`
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
EnemyBall.setVelocity(50, 50)
game.onUpdateInterval(500, function () {
    if (EnemyBall.y > scene.screenHeight() - 10) {
        if (EnemyBall.vx > 0) {
            EnemyBall.setVelocity(50, -50)
        } else {
            EnemyBall.setVelocity(-50, -50)
        }
    }
    if (EnemyBall.y < 15) {
        if (EnemyBall.vx > 0) {
            EnemyBall.setVelocity(50, 50)
        } else {
            EnemyBall.setVelocity(-50, 50)
        }
    }
    if (EnemyBall.x < 15) {
        if (EnemyBall.vy > 0) {
            EnemyBall.setVelocity(50, 50)
        } else {
            EnemyBall.setVelocity(50, -50)
        }
    }
    if (EnemyBall.x > scene.screenWidth() - 10) {
        if (EnemyBall.vy > 0) {
            EnemyBall.setVelocity(-50, 50)
        } else {
            EnemyBall.setVelocity(-50, -50)
        }
    }
})
