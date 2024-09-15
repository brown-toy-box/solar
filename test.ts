sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    solar.playSunlightCaptured()
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
function startNewDay() {
    day += 1
    solar.setupDay(day)
    if (day == 1) {
        game.showLongText("Press A to place a solar panel. Catch as much sun as you can!", DialogLayout.Top)
    } else if (day == 2) {
        game.showLongText("You collected enough sunlight to have " + info.life() + " credits.", DialogLayout.Top)
    } else {
        game.showLongText("You now can build a larger solar panel for two credits. Press B to change sizes!", DialogLayout.Top)
        game.showLongText("You collected enough sunlight to have " + info.life() + " credits.", DialogLayout.Top)
    }
    for (let index = 0; index < day; index++) {
        solar.addCloud()
    }
    solar.startDay()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (day == 3) {
        if (shadowSprite.image.equals(assets_solar.smallShadow)) {
            shadowSprite.setImage(assets_solar.largeShadow)
        } else {
            shadowSprite.setImage(assets_solar.smallShadow)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (shadowSprite.image.equals(assets_solar.smallShadow) && info.life() > 0) {
        solar.playSmallPanelPlaced()
        solarPanelSprite = sprites.create(assets_solar.smallPanel, SpriteKind.SolarPanel)
        solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
        info.changeLifeBy(-1)
    } else if (shadowSprite.image.equals(assets_solar.largeShadow) && info.life() > 1) {
        solar.playLargePanelPlaced()
        solarPanelSprite = sprites.create(assets_solar.largePanel, SpriteKind.SolarPanel)
        solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
        info.changeLifeBy(-2)
    } else {
        solar.playNoCreditsLeft()
    }
})
info.onCountdownEnd(function () {
    if (day == 3) {
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
    } else {
        solar.playEndOfDay()
        startNewDay()
    }
})
sprites.onOverlap(SpriteKind.ReducedSunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    solar.playSunlightCaptured()
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.Cloud, function (sprite, otherSprite) {
    if (Math.percentChance(50)) {
        sprites.destroy(sprite)
    } else {
        sprite.setKind(SpriteKind.ReducedSunlight)
        sprite.setImage(assets_solar.reducedSunlight)
    }
})
let sunlightSprite: Sprite = null
let solarPanelSprite: Sprite = null
let day = 0
let shadowSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(assets_solar.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(assets_solar.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
let heroSprite = sprites.create(assets_solar.player1, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
shadowSprite = sprites.create(assets_solar.smallShadow, SpriteKind.Player)
solar.attachShadowToPlayer(shadowSprite, heroSprite)
solar.setInitialCredits(5)
day = 0
startNewDay()
game.onUpdateInterval(100, function () {
    solar.moveSun(sunSprite)
    if (solar.isSunlightMade()) {
        sunlightSprite = sprites.createProjectileFromSprite(assets_solar.sunlight, sunSprite, 0, 100)
        sunlightSprite.setKind(SpriteKind.Sunlight)
        sunlightSprite.x += 8 - randint(0, 16)
    }
})
