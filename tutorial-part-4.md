# Catch some sun! Part 4

## Time's up! @showdialog

In this tutorial, we will finish the game by setting a timer
and limiting the number of panels that the player can place.

## How many lives do you have?

Let's limit the number of panels that the player can build.

-   To the **bottom** of your   
``||loops(noclick):on start||`` container,
add two
blocks from the 
``||solar:Solar||`` drawer of the toolbox.
    -   ``||solar:set initial credits (5)||``
    -   ``||solar:setup day (1)||``

Play your game in the simulator. You'll notice that the life indicator
appears in the top-left corner. We'll use player lives to keep track of
the number of solar panels that the player can build.

View the hint if you need any help.

```blockconfig.local
solar.setInitialCredits(5)
```

```blocks
let shadowSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(solar_assets.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(solar_assets.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
let heroSprite = sprites.create(solar_assets.player1, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
shadowSprite = sprites.create(solar_assets.smallShadow, SpriteKind.Player)
solar.attachShadowToPlayer(shadowSprite, heroSprite)
// @highlight
solar.setInitialCredits(5)
// @highlight
solar.setupDay(1)
```

## Take one away

Now, let's remove one life whenever the player builds a solar panel.

1.  Find the   
``||controller(noclick):on A button pressed||``   
container on your workspace.
1.  Within that   
``||controller(noclick):on A button pressed||``   
container, add a   
``||info:change life by (-1)||``   
block.

Play your game in the simulator and build some solar panels.
You should lose one credit (or life) each time you build a panel.

View the hint if you need any help.

```blocks
let shadowSprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let solarPanelSprite: Sprite = sprites.create(solar_assets.smallPanel, SpriteKind.SolarPanel)
    solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
    // @highlight
    info.changeLifeBy(-1)
})
```

## That's too many!

The player still can place as many solar panels as they want.
Let's fix that!

1.   Place **all** of the blocks in your
``||controller(noclick):on A button pressed||``   
container **inside** of an   
``||logic:if (true) then||``
block.
1.   Replace the ``||logic:true||`` block with blocks 
from the ``||logic:Logic||`` and ``||info:Info||``
drawers so that the ``||logic:if||`` block says this:   
``||logic:if||``
``||info:life||``
``||logic:> (0) then||``   

Now, the player should only be able to place 5 solar panels on the screen.

View the hint if you need any help.

```blocks
let shadowSprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // @highlight
    if (info.life() > 0) {
        let solarPanelSprite: Sprite = sprites.create(solar_assets.smallPanel, SpriteKind.SolarPanel)
        solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
        info.changeLifeBy(-1)
    }
})
```

## Time's up!

The last thing that we need to do is to start a timer.

-   To the **bottom** of your   
``||loops(noclick):on start||`` container,
add a   
``||solar:start day||``   
block from the ``||solar:Solar||`` drawer.

Play your game in the simulator. The player should be able to build
5 solar panels, and the game should end after one day.

View the hint if you need any help.

```blocks
let shadowSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(solar_assets.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(solar_assets.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
let heroSprite = sprites.create(solar_assets.player1, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
shadowSprite = sprites.create(solar_assets.smallShadow, SpriteKind.Player)
solar.attachShadowToPlayer(shadowSprite, heroSprite)
solar.setInitialCredits(5)
solar.setupDay(1)
// @highlight
solar.startDay()
```

## Finish @showdialog

Congratulations! You've finished the game!

Now, try to get the highest score!

There are additional tutorials in the skillmap that enhance your game.

Have fun!

```template
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    solarPanelSprite = sprites.create(solar_assets.smallPanel, SpriteKind.SolarPanel)
    solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
})
let sunlightSprite: Sprite = null
let solarPanelSprite: Sprite = null
let shadowSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(solar_assets.sun, SpriteKind.Scenery)
let lawnSprite = sprites.create(solar_assets.field, SpriteKind.Scenery)
lawnSprite.setPosition(80, 90)
let heroSprite = sprites.create(solar_assets.player1, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
shadowSprite = sprites.create(solar_assets.smallShadow, SpriteKind.Player)
solar.attachShadowToPlayer(shadowSprite, heroSprite)
game.onUpdateInterval(100, function () {
    solar.moveSun(sunSprite)
    if (solar.isSunlightMade()) {
        sunlightSprite = sprites.createProjectileFromSprite(solar_assets.sunlight, sunSprite, 0, 100)
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.life() > 0) {
        solarPanelSprite = sprites.create(solar_assets.smallPanel, SpriteKind.SolarPanel)
        solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
        info.changeLifeBy(-1)
    }
})
let sunlightSprite: Sprite = null
let solarPanelSprite: Sprite = null
let shadowSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(solar_assets.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(solar_assets.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
let heroSprite = sprites.create(solar_assets.player1, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
shadowSprite = sprites.create(solar_assets.smallShadow, SpriteKind.Player)
solar.attachShadowToPlayer(shadowSprite, heroSprite)
solar.setInitialCredits(5)
solar.setupDay(1)
solar.startDay()
game.onUpdateInterval(100, function () {
    solar.moveSun(sunSprite)
    if (solar.isSunlightMade()) {
        sunlightSprite = sprites.createProjectileFromSprite(solar_assets.sunlight, sunSprite, 0, 100)
        sunlightSprite.setKind(SpriteKind.Sunlight)
        sunlightSprite.x += 8 - randint(0, 16)
    }
})
```

```package
solar_assets=github:brown-toy-box/solar_assets
solar=github:brown-toy-box/solar
```