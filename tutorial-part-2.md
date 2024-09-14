# Catch some sun! Part 2

## Set the scene @showdialog

In this tutorial, we will add our player to the game.

## Introducing ... you!

First, let's add the player to the game.
The player is the **hero** of the game.

1.  To the **bottom** of your   
``||loops(noclick):on start||`` container,
add a   
``||variables(sprites):set heroSprite to||``
``||sprites:sprite [] of kind Player||``   
block.
1.  Give the hero sprite an image.
We have provided some images in the gallery that you can use, if you like.
Feel free to create your own!
1.  Add a   
``||controller:move||``
``||variables(controller):heroSprite||``
``||controller:with buttons||``   
block to the **bottom** of your   
``||loops(noclick):on start||`` container.
1.  Also add a   
``||sprites:set||``
``||variables(sprites):heroSprite||``
``||sprites:stay in screen (ON)||``   
block to the **bottom** of your   
``||loops(noclick):on start||`` container.

Play your game in the simulator.
Make sure you can move your hero sprite around the screen.

View the hint if you need any help.

```blockconfig.local
let heroSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
```

```blocks
scene.setBackgroundColor(9)
let sunSprite = sprites.create(solar_assets.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(solar_assets.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
// @highlight
let heroSprite = sprites.create(solar_assets.player1, SpriteKind.Player)
// @highlight
controller.moveSprite(heroSprite)
// @highlight
heroSprite.setStayInScreen(true)
```

## Look at my shadow!

Now, let's add a **shadow** to the player.

The shadow shows where the player will build a solar panel.

1.  To the **bottom** of your   
``||loops(noclick):on start||`` container,
add a   
``||variables(sprites):set shadowSprite to||``
``||sprites:sprite [] of kind Player||``   
block.
1.  Give the shadow an appropriate image, like a border.
    -   We have given you an image in the Gallery that you can use.
    -   If you use our image, then use the red shadow.
	The purple shadow is larger, which we will use later.

Play your game in the simulator and move the player around.
Notice the shadow appears on the screen,
but it does not move with the player.

Let's fix that!

1.  To the **bottom** of your   
``||loops(noclick):on start||`` container,
add an   
``||solar:attach shadow||``
``||variables(solar):shadowSprite||``
``||solar:to player||``
``||variables(solar):heroSprite||``   
block.

Now, play your game and notice that the shadow moves with the player!

View the hint if you need any help.

```blockconfig.local
let shadowSprite = sprites.create(img`
    . . . . . . . . 
    . . . . . . . . 
    . . . . . . . . 
    . . . . . . . . 
    `, SpriteKind.Player)
solar.attachShadowToPlayer(shadowSprite, heroSprite)
```

```blocks
scene.setBackgroundColor(9)
let sunSprite = sprites.create(solar_assets.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(solar_assets.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
let heroSprite = sprites.create(solar_assets.player1, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
// @highlight
let shadowSprite = sprites.create(solar_assets.smallShadow, SpriteKind.Player)
// @highlight
solar.attachShadowToPlayer(shadowSprite, heroSprite)
```

## Finish @showdialog

Congratulations! You've added the player and the player's shadow
to your game.

Now, the player needs to be able to build solar panels!

```template
let sunlightSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(solar_assets.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(solar_assets.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
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
let sunlightSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(solar_assets.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(solar_assets.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
let heroSprite = sprites.create(solar_assets.player1, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
let shadowSprite = sprites.create(solar_assets.smallShadow, SpriteKind.Player)
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

```package
solar_assets=github:brown-toy-box/solar_assets
solar=github:brown-toy-box/solar-powered-stadium
```