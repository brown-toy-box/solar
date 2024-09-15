# Catch some sun! Part 8

## Build bigger! @showdialog

You may have noticed that there are two sizes of solar panels
in the gallery. Let's allow the player to build larger solar panels
on day 3!

## Advanced tutorial @showdialog

**Note**

This is an advanced tutorial. We will describe the blocks that you
will add to your project, but the instructions do not walk you through
every block that you need.

You can always view the hint to see the code that you are building.

Try building without the hints, though!

## Shapeshifting!

On the third day, let's allow the player to switch the size of the
solar panels by pressing the **B** button.

Add an   
``||controller:on B button pressed||``   
container to your workspace.

Here is the algorithm for this event:

-   **Only** do something on day 3.   
If it's not day 3, do nothing when the player presses **B**.
-   Did you know that you can compare images?   
There is a special block in the   
``||images:Images||`` **Images** drawer for that!
-   ``||logic(noclick):If||`` the   
``||variables(sprites):shadowSprite||`` ``||sprites:image||``   
is equal to the small shadow image,   
``||logic(noclick):then||`` make it the large shadow image.
-   **Otherwise**, make the sprite's image the small shadow image.

See if you can build this code on your own!

View the hint if you need help.

```block
let shadowSprite: Sprite = null
let day = 0
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (day == 3) {
        if (shadowSprite.image.equals(assets_solar.smallShadow)) {
            shadowSprite.setImage(assets_solar.largeShadow)
        } else {
            shadowSprite.setImage(assets_solar.smallShadow)
        }
    }
})
```

## Need some direction here!

Now, give the player some instructions on day 3 on their new capabilities!

You can add another   
``||game:show long text||`` block to your   
``||functions(noclick):startNewDay||`` function.

Give it a try!

View the hint if you need any help.

```block
let day = 0
function startNewDay () {
    day += 1
    solar.setupDay(day)
    if (day == 1) {
        game.showLongText("Your instructions go here!", DialogLayout.Top)
    } else if (day == 2) {
        game.showLongText("You collected enough sunlight to have " + info.life() + " credits.", DialogLayout.Top)
    } else {
        // @highlight
        game.showLongText("You now can build a larger solar panel for two credits. Press B to change sizes!", DialogLayout.Top)
        game.showLongText("You collected enough sunlight to have " + info.life() + " credits.", DialogLayout.Top)
    }
    for (let index = 0; index < day; index++) {
        solar.addCloud()
    }
    solar.startDay()
}
```

## Finish @showdialog

Play your game and make sure your builder can change shadows on Day 3
with the **B** button.

If not, then go back to previous steps and check your code against the hints.

Your builder only builds the small panels still.
In the final tutorial, you will build the larger solar panels
and add some sound effects!

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
        game.showLongText("You collected enough sunlight to have " + info.life() + " credits.", DialogLayout.Top)
    }
    for (let index = 0; index < day; index++) {
        solar.addCloud()
    }
    solar.startDay()
}
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

```package
assets_solar=github:brown-toy-box/assets_solar
solar=github:brown-toy-box/solar
```