# Catch some sun! Part 3

## Let's build! @showdialog

In this tutorial, the player will build solar panels to catch sunlight.

## Build a solar panel

When the player presses **A**, we should build a solar panel
wherever the shadow is on the screen.

1.  Add an   
``||controller:on A button pressed||``   
container to your workspace.
1.  Inside of the ``||controller:on A button pressed||`` container,
add these blocks.
    1.  ``||variables(sprites):set solarPanelSprite to||``
    ``||sprites:sprite [] of kind SolarPanel||``
    1.  ``||sprites:set||``
    ``||variables(sprites):solarPanelSprite||``
    ``||sprites:position to x||``
    ``||variables(sprites):shadowSprite||``
    ``||sprites:x y||``
    ``||variables(sprites):shadowSprite||``
    ``||sprites:y||``
1.  Give the solar panel an image.
    -   We have provided one in the Gallery that you can use.
	-   If you use our image, use the smaller blue-and-white
	image. The panel with blue and yellow is larger, and
	we will use that one later.

Play your game in the simulator. Build some solar panels!

View the hint if you need any help.

```blockconfig.local
let shadowSprite: Sprite = null
let solarPanelSprite = sprites.create(img`
    . . . . . . . . 
    . . . . . . . . 
    . . . . . . . . 
    . . . . . . . . 
    `, SpriteKind.SolarPanel)
solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
```

```blocks
let shadowSprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let solarPanelSprite: Sprite = sprites.create(assets_solar.smallPanel, SpriteKind.SolarPanel)
    solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
})
```

## Get some points!

Now, let's give the player some points for capturing sunlight!

1.  Add an   
``||sprites:on||``
``||variables(sprites):sprite||``
``||sprites:of kind Sunlight overlaps||``
``||variables(sprites):otherSprite||``
``||sprites:of kind SolarPanel||``   
container to your workspace.
1.  Inside of the ``||sprites(noclick):on sprite overlap||`` container,
add these blocks:
    1.  ``||sprites:destroy||``
    ``||variables(sprites):sprite||``
    1.  ``||info:change score by (1)||``

Play your game in the simulator. Place some solar panels and,
when sunlight hits your panels, you should get points!

View the hint if you need any help.

```blockconfig.local
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {})
sprites.destroy(sprite)
```

```block
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
```

## Finish @showdialog

Congratulations! The player can now collect sunlight.

Now, let's finish the game!

```template
let sunlightSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(assets_solar.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(assets_solar.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
let heroSprite = sprites.create(assets_solar.player1, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
let shadowSprite = sprites.create(assets_solar.smallShadow, SpriteKind.Player)
solar.attachShadowToPlayer(shadowSprite, heroSprite)
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    solarPanelSprite = sprites.create(assets_solar.smallPanel, SpriteKind.SolarPanel)
    solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
})
let sunlightSprite: Sprite = null
let solarPanelSprite: Sprite = null
let shadowSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(assets_solar.sun, SpriteKind.Scenery)
let lawnSprite = sprites.create(assets_solar.field, SpriteKind.Scenery)
lawnSprite.setPosition(80, 90)
let heroSprite = sprites.create(assets_solar.player1, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
shadowSprite = sprites.create(assets_solar.smallShadow, SpriteKind.Player)
solar.attachShadowToPlayer(shadowSprite, heroSprite)
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