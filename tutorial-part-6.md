# Catch some sun! Part 6

## It's a new day! @showdialog

In this tutorial, we will make our game run for three days!

## Time's up! Again!

When the timer ends, we should move on to the next day.

1.  Add an   
``||info:on countdown end||``   
container to your workspace.
1.  Inside the   
``||info(noclick):on countdown end||``   
container, add an   
``||logic:if (true) then [] else []||``   
block.
1.  Replace the   
``||logic(noclick):true||``   
block with blocks from the   
``||variables:Variables||`` and   
``||logic:Logic||`` drawers so the ``||logic(noclick):if||`` block says   
``||logic(noclick):if||`` ``||variables:day||`` ``||logic:= (3) then||``
1.  Add blocks from the   
``||game:Game||`` and   
``||functions:Functions||`` drawers so that the   
``||logic(noclick):if||`` block does the following:
    -    If it's day 3, then the game should end with a win.   
    Feel free to add a screen effect before ending the game.
    -    Otherwise, call your   
    ``||functions(noclick):startNewDay||`` function.

Check the simulator and play your game. It should run for three days now!

View the hint if you need any help.

```block
// @hide
function startNewDay() {
}
let day = 0
info.onCountdownEnd(function () {
    if (day == 3) {
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
    } else {
        startNewDay()
    }
})
```

## It's a new day already?

Before starting each day, we should give the player some information so
that they can plan a little bit.

-  In your   
``||functions(noclick):startNewDay||``   
function, **expand** the   
``||logic(noclick):if||``   
block so that it has three branches.

~hint How do I expand a block?

Some blocks have a **(+)** symbol at the end. Select this plus sign to
expand the block.

hint~

-   Make the   
``||logic(noclick):else if||`` branch say   
``||logic(noclick):else if||`` ``||variables:day||`` ``||logic:= (2) then||``
-   For days 2 and 3, use blocks from the   
``||game:Game||``,   
``||text:Text||`` **Text**, and   
``||info:Info||`` drawers so that each branch has a block that says   
``||game:show long text||`` ``||text:join||`` **join**
"You collected enough sunlight to have " ``||info:life||``
" credits." ``||game(noclick):top||``
-   The same block appears in both branches, so feel free to
**Duplicate** the block after building it once.

~hint How do I duplicate a block?

If you have a mouse with two buttons, then right-click (or "alt-click")
a block and, from the menu that appears, select **Duplicate**.

On a Mac, you can select a block, press **Command-C** on your keyboard
to copy the block, and then press **Command-V** on your keyboard to paste
a copy of the block to your workspace.

On other computers, use **Control-C** and **Control-V** to copy and paste
blocks.

hint~

Check the simulator and play your game. The game should pause before each day
and give you some instructions.

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
        game.showLongText("You collected enough sunlight to have " + info.life() + " credits.", DialogLayout.Top)
    }
    solar.startDay()
}
```

## Finish @showdialog

Congratulations! Your game runs for multiple days and gives the players
some instructions!

In the next tutorial, we'll add some inclement weather!

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

```package
assets_solar=github:brown-toy-box/assets_solar
solar=github:brown-toy-box/solar
```