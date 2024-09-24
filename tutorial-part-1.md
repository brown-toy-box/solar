# Catch some sun! Part 1

## Set the scene @showdialog

In this tutorial, we will create the scenery for our game.

## I am the sun!

First, let's add the sun to our scene. For now, we will let the player 
control the sun. We will add the player's real avatar later.

1.  Add a   
``||scene:set background color||``   
block to your   
``||loops(noclick):on start||`` container.
1.  Add the sun to your scene.   
Add a   
``||variables(sprites):set sunSprite to||``
``||sprites:sprite [] of kind Scenery||``   
block to the **bottom** of your   
``||loops(noclick):on start||`` container.
Notice that we already have set the variable name and sprite kind for you.
1.  Draw or select an image for the sun sprite.
We have provided you with an image in the gallery.
1.  For now, let the player control the sun.   
Add a   
``||controller:move||``
``||variables(controller):sunSprite||``
``||controller:with buttons||``   
block to the **bottom** of your   
``||loops(noclick):on start||`` container.

Check the simulator to make sure your project works correctly.

View the hint if you need any help.

```blockconfig.local
scene.setBackgroundColor(9)
let sunSprite = sprites.create(img`
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
    `, SpriteKind.Scenery)
controller.moveSprite(sunSprite)
```

```blocks
scene.setBackgroundColor(9)
let sunSprite = sprites.create(assets_solar.sun, SpriteKind.Scenery)
controller.moveSprite(sunSprite)
```

## Field of dreams!

Now, let's add a place to build our solar panels to our scene.

1.  Add a   
``||variables(sprites):set fieldSprite to||``
``||sprites:sprite [] of kind Scenery||``   
block to the **bottom** of your   
``||loops(noclick):on start||`` container.
Notice that we already have set the variable name and sprite kind for you.
1.  Draw an image for your sprite.
    -   Change the size of the sprite to cover the lower half of the screen
    by making it 160 pixels wide and 60 pixels tall.
    -   Feel free to use the image that we have provided in the gallery.
1.  Move the sprite to the bottom of the screen.   
Add a   
``||sprites:set||``
``||variables(sprites):fieldSprite||``
``||sprites:position to x (80) y (90)||``
block to the **bottom** of your   
``||loops(noclick):on start||`` container.
Notice that we already have set the coordinates for you.
Adjust them as needed if you created your own image.

Check the simulator to make sure that the sun
"rises" and "sets" behind your new sprite.

View the hint if you need any help.

```blockconfig.local
let fieldSprite = sprites.create(img`
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
    `, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
fieldSprite.top = 60
```

```blocks
scene.setBackgroundColor(9)
let sunSprite = sprites.create(assets_solar.sun, SpriteKind.Scenery)
controller.moveSprite(sunSprite)
// @highlight
let fieldSprite = sprites.create(assets_solar.field, SpriteKind.Scenery)
// @highlight
fieldSprite.setPosition(80, 90)
```

## Moving the sun

Now, let's make the sun move across the sky.

Notice that there is a new drawer in the toolbox, called   
``||solar:Solar||``. We'll use a block from that drawer below.

1.  Delete the 
``||controller:move||``
``||variables(controller):sunSprite||``
``||controller:with buttons||``   
block from your project.
1.  Add an   
``||game:on game update every (100) ms||``   
container to your workspace.
1.  Add a   
``||solar:move sun sprite||``
``||variables(solar):sunSprite||``   
block to your   
``||game(noclick):on game update every (100) ms||``   
container.
**Note**: If you changed the variable name for your sun sprite,
then select your variable name here, too.

Now, every 100 milliseconds, the sun will move to a new position on the screen.

Check the simulator to make sure your project is working correctly.

View the hint if you need any help.

~hint How long is a millisecond?
One millisecond is 1/1000 of a second.
In other words, there are 1,000 milliseconds in 1 second!
hint~

~hint How long is 100 milliseconds?
100 milliseconds is 1/10 of a second.
hint~

```blockconfig.local
let sunSprite = sprites.create(img`.`, SpriteKind.Scenery)
game.onUpdateInterval(100, function(){})
solar.moveSun(sunSprite)
```

```blocks
let sunSprite: Sprite = null
game.onUpdateInterval(100, function () {
    solar.moveSun(sunSprite)
})
```

## Let the sunshine in!

Now, let's make the sun create sunlight!

The sun creates less sunlight at sunrise and sunset, and more sunlight
at noon.
We have a special block to determine if the sun should create sunlight.
It's the ``||solar:is sunlight made||`` block. 
Let's use this new block!

1.  Add an   
``||logic:if (true) then||``   
block to the **bottom** of your   
``||game:on game update every (100) ms||``   
container.
1.  Drop an   
``||solar:is sunlight made||``   
block in place of the   
``||logic:true||``   
block.

Now, inside of the ``||logic(noclick):if||`` block,
let's create some sunlight!

1.  Inside of the ``||logic(noclick):if||`` block, add a   
``||variables(sprites):set sunlightSprite to||``
``||sprites:projectile [] from||``
``||variables(sprites):sunSprite||``
``||sprites:with vx (0) vy (100)||``   
block.
1.  Draw a ray of sunlight for your image.
Feel free to use our image if you wish.
1.  **Beneath** the new block, add a   
``||sprites:set||``
``||variables(sprites):sunlightSprite||``
``||sprites:kind to Sunlight||``   
block.

Check your simulator and watch your sun make sunlight!

View the hint if you need any help.

```blockconfig.local
let sunSprite = sprites.create(img`.`, SpriteKind.Scenery)
let sunlightSprite = sprites.createProjectileFromSprite(img`
    . . . . 
    . . . . 
    . . . . 
    . . . . 
    . . . . 
    . . . . 
`, sunSprite, 0, 100)
sunlightSprite.setKind(SpriteKind.Sunlight)
```

```blocks
let sunSprite: Sprite = null
game.onUpdateInterval(100, function () {
    solar.moveSun(sunSprite)
    if (solar.isSunlightMade()) {
        let sunlightSprite = sprites.createProjectileFromSprite(assets_solar.sunlight, sunSprite, 0, 100)
        sunlightSprite.setKind(SpriteKind.Sunlight)
    }
})
```

## That's so random!

Instead of always falling from the center of the sun, let's make the
sunlight rays a little more random.

1.  Inside of your ``||logic(noclick):if||`` block,   
**beneath**, the existing blocks,   
add a   
``||sprites:change||``
``||variables(sprites):sunlightSprite||``
``||sprites:x by (0)||``   
block.
1.  Add some blocks from the ``||math:Math||`` drawer to change
the sunlight ray's **x** value by   
``||math:(8) - pick random (0) to (16)||``

Watch the simulator and you should see the sunlight rays dropping from the
sun a bit more randomly!

View the hint if you need any help.

```blockconfig.local
let sunSprite = sprites.create(img`.`, SpriteKind.Scenery)
let sunlightSprite = sprites.createProjectileFromSprite(img`
    . . . . 
    . . . . 
    . . . . 
    . . . . 
    . . . . 
    . . . . 
`, sunSprite, 0, 100)
sunlightSprite.setKind(SpriteKind.Sunlight)
sunlightSprite.x += 0
randint(0, 16)
```

```blocks
let sunSprite: Sprite = null
game.onUpdateInterval(100, function () {
    solar.moveSun(sunSprite)
    if (solar.isSunlightMade()) {
        let sunlightSprite = sprites.createProjectileFromSprite(assets_solar.sunlight, sunSprite, 0, 100)
        sunlightSprite.setKind(SpriteKind.Sunlight)
        // @highlight
        sunlightSprite.x += 8 - randint(0, 16)
    }
})
```

## Finish @showdialog

Congratulations, you completed the scenery for your game.

Now, let's add the player!

```ghost
let sunlightSprite: Sprite = null
scene.setBackgroundColor(9)
let sunSprite = sprites.create(assets_solar.sun, SpriteKind.Scenery)
let fieldSprite = sprites.create(assets_solar.field, SpriteKind.Scenery)
fieldSprite.setPosition(80, 90)
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