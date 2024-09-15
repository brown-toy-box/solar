# Catch some sun! Part 9

## Build bigger! @showdialog

This is the last tutorial! Now, we get to build larger solar panels.

You also get to try out some sound effects!

## Advanced tutorial @showdialog

**Note**

This is an advanced tutorial. We will describe the blocks that you
will add to your project, but the instructions do not walk you through
every block that you need.

You can always view the hint to see the code that you are building.

Try building without the hints, though!

## Which panel to build?

When the player presses **A**, you need to decide which solar panel to build.
The existing code is fine, but you'll need to change the   
**conditional statement** in your   
``||logic(noclick):if||`` block.

~hint What is a conditional statement?

A **conditional statement** evaluates to either ``||logic(noclick):true||``
or ``||logic(noclick):false||``. Conditional statements can also be   
**compound statements**, which use the operators ``||logic(noclick):and||``
or ``||logic(noclick):or||``.

hint~

1.  Find your   
``||controller(noclick):on A button pressed||``   
container.
1.  To build a small solar panel, **two** things need to be true now.
    -   The player still has to have credits (lives) left.
    -   Now, the shadow sprite **also** must be the small shadow.

Can you update your conditional statement to correctly check
whether the player can place a small solar panel with the new rules?

Check the simulator to see if you can still build small solar panels.

Check the hint if you need any help.

```block
let shadowSprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (shadowSprite.image.equals(assets_solar.smallShadow) && info.life() > 0) {
        let solarPanelSprite = sprites.create(assets_solar.smallPanel, SpriteKind.SolarPanel)
        solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
        info.changeLifeBy(-1)
    }
})
```

## But I want the bigger one!

Now, we need to build the larger solar panel when the shadow is the larger one.

1.  Again, find your   
``||controller(noclick):on A button pressed||``   
container.
1.  Add **two** branches to the   
``||logic(noclick):if||`` block.   
We will leave the last   
``||logic(noclick):else||`` branch empty for now.
1.  To build the large solar panel, **two** things must be true.
    -   The shadow sprite must be the large shadow.
    -   How many credits (live) does the player need?
1.  Use blocks similar to the   
``||logic(noclick):if||`` branch to create the large solar panel.

Can you write the conditional statement and build the   
``||logic(noclick):else if||`` branch to create a large solar panel
correctly?

Check the simulator to see if you wrote your code correctly!

Check the hint if you need any help.

```block
let shadowSprite: Sprite = null
let solarPanelSprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (shadowSprite.image.equals(assets_solar.smallShadow) && info.life() > 0) {
        solarPanelSprite = sprites.create(assets_solar.smallPanel, SpriteKind.SolarPanel)
        solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
        info.changeLifeBy(-1)
    } else if (shadowSprite.image.equals(assets_solar.largeShadow) && info.life() > 1) {
        solarPanelSprite = sprites.create(assets_solar.largePanel, SpriteKind.SolarPanel)
        solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
        info.changeLifeBy(-2)
    } else {

    }
})
```

## What was that?

For this last part, we've added some sound effect blocks to the   
``||solar:Solar||`` drawer of the toolbox.

Feel free to add them to your project! You'll need to decide where to
place these new blocks in your code.

## Finish @showdialog

Congratulations! You've completed the advanced project!

Here are some additional customizations that you can try.

-   Add days to the game with some new rules of your choice.
-   Create your own sound effects and background music.
-   If you have not done so already, try creating your own images!

Share your game with your friends and family! Have fun!

```template
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
function startNewDay () {
    day += 1
    solar.setupDay(day)
    if (day == 1) {
        game.showLongText("Your instructions go here!", DialogLayout.Top)
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
    if (info.life() > 0) {
        solarPanelSprite = sprites.create(assets_solar.smallPanel, SpriteKind.SolarPanel)
        solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
        info.changeLifeBy(-1)
    }
})
info.onCountdownEnd(function () {
    if (day == 3) {
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
    } else {
        startNewDay()
    }
})
sprites.onOverlap(SpriteKind.ReducedSunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
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
```

```ghost
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    solar.playSunlightCaptured()
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
function startNewDay () {
    day += 1
    solar.setupDay(day)
    if (day == 1) {
        game.showLongText("Your instructions go here!", DialogLayout.Top)
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
```

```package
assets_solar=github:brown-toy-box/assets_solar
solar=github:brown-toy-box/solar
```