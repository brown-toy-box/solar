# Catch some sun! Part 7

## Cloudy with a chance of ...? @showdialog

Not every day is a beautiful, sunny day!
In this tutorial, we will add some clouds that affect sunlight.

## I can make clouds!

Let's add some clouds to the sky. Let's make each day have more clouds
than the previous day.

1.  Find your   
``||functions(noclick):startNewDay||`` function.
1.  Just above the   
``||solar(noclick):start day||``   
block, add a   
``||loops:repeat (4) times||``   
block.
    -   Feel free to view the hint if you need to see where this loop goes.
1.  Inside of your   
``||loops(noclick):repeat||`` loop, add an   
``||solar:add cloud sprite||`` block.
    -   This block gets a cloud ready in the sky.
    It will appear at a random time.
1.  Using a block from the   
``||variables:Variables||`` drawer, set your   
``||loops(noclick):repeat||``   
loop to run   
``||variables:day||`` times.

Check the simulator. You should see one cloud on the first day,
two on the second,
and three clouds on the third day!

View the hint if you need any help.

Next ... we need something to happen when sunlight hits a cloud!

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
        game.showLongText("You collected enough sunlight to have " + info.life() + " credits.", DialogLayout.Top)
    }
    // @highlight
    for (let index = 0; index < day; index++) {
        solar.addCloud()
    }
    solar.startDay()
}
```

## Why is it so dark?

When sunlight hits a cloud, it should get absorbed by the cloud ...
but only sometimes!

1.  Add an   
``||sprites:on||`` ``||variables(sprites):sprite||``
``||sprites:of kind (Player) overlaps||`` ``||variables(sprites):otherSprite||``
``||sprites:of kind (Player)||``
1.  Use the dropdowns to change   
``||variables(noclick):sprite||`` to kind ``||sprites(noclick):Sunlight||``   
and   
``||variables(noclick):otherSprite||`` to kind ``||sprites(noclick):Cloud||``
1.  Inside of this container, add an   
``||logic:if (true) then [] else []||``   
block.
1.  In place of the   
``||logic(noclick):true||`` block, drag a   
``||math:(0)% chance||`` block.
1.  Set the percent chance to **50**.   
This means that half the time, the value will be true.
1.  In the   
``||logic(noclick):if||`` branch, add a block that will   
``||sprites:destroy||`` ``||variables(sprites):sprite||``.
    -   Remember that you drag the ``||variables(noclick):sprite||``
    block from the top of your   
    ``||sprites(noclick):on overlaps||`` container.
1.  In the   
``||logic(noclick):else||`` branch, add blocks that will   
    -   ``||sprites:set||`` ``||variables(sprites):sprite||``
    ``||sprites:kind to (ReducedSunlight)||``
    -   ``||sprites:set||`` ``||variables(sprites):sprite||``
    ``||sprites:image to []||``
    -   Give the sprite a new image.   
    We added one in the gallery that you can use.

Check the simulator. When sunlight hits a cloud,
half of the time the sunlight will be destroyed.
The other half of the time, the sunlight will change its kind and image.

But the reduced sunlight doesn't score points anymore!

We'll fix that next.

View the hint if you need any help.

```block
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.Cloud, function (sprite, otherSprite) {
    if (Math.percentChance(50)) {
        sprites.destroy(sprite)
    } else {
        sprite.setKind(SpriteKind.ReducedSunlight)
        sprite.setImage(assets_solar.reducedSunlight)
    }
})
```

## Capture that sunlight!

We should still score points when we capture reduced sunlight, too.

1.  Duplicate your existing   
``||sprites:on||`` ``||variables(sprites):sprite||``
``||sprites:of kind (Sunlight) overlaps||`` ``||variables(sprites):otherSprite||``
``||sprites:of kind (SolarPanel)||``
1.  Move the new container to a good spot on your workspace.
    -   Notice that it's disabled.
    -   You can only have **one** container that matches the same kinds of
    sprites.
1.  Change the kind for   
``||variables(noclick):sprite||`` to   
``||sprites(noclick):ReducedSunlight||``
    -   Notice that your new container is enabled once you change the type.
1.  If you wish, change the number of points added to the player's score
when reduced sunlight is captures.

Check the simulator. Now, reduced sunlight is captured by your solar panels!

View the hint if you need any help.

```block
sprites.onOverlap(SpriteKind.ReducedSunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
```

## Finish @showdialog

Congratulations! You've finished the intermediate game!

Now, try to get the highest score!

Feel free to try these additional customizations.

-   Provide additional information to the player each day,
like saying which day it is.
-   Randomize the number of clouds that appear each day.
-   Change the chance that a cloud will absorb sunlight,
perhaps changing it each day.
-   Change the value added to the player's score when
reduced sunlight hits a solar panel.

There are additional tutorials in the skillmap that enhance your game
even further.

Have fun!

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

```package
assets_solar=github:brown-toy-box/assets_solar
solar=github:brown-toy-box/solar
```