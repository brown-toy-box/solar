# Catch some sun! Part 5

## It's a new day! @showdialog

In this tutorial, we will get our project ready to have multiple days!

## What's your function?

We're going to create a function that we can use to start a new day.

1.  Open the **Advanced** section of the toolbox if it's not already open.
1.  Open the   
``||functions:Functions||`` drawer.
1.  Select the   
**Make a Function...** button.
1.  Create a function named   
``||functions(noclick):startNewDay||``.
1.  Select the green   
**Done** button.

Next, we'll add some blocks to our function!

## Start of something good!

We'll start building our function with some blocks that already exist
in our project.

-   **Move** the following blocks from your   
``||loops(noclick):on start||``   
container into your   
``||functions(noclick):startNewDay||``   
container:
    -   ``||solar(noclick):setup day (1)||``
    -   ``||solar(noclick):start day||``

Now that we've started building our function, we need to use it!

-   To the **bottom** of your   
``||loops(noclick):on start||``   
container, add a   
``||functions:call startNewDay||``   
block

Check the simulator to make sure you game works just as it did before.

View the hint if you need any help.

```blocks
function startNewDay() {
    solar.setupDay(1)
    solar.startDay()
}
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
// @highlight
startNewDay()
```

## What day is it?

Now, we need to create a variable to keep track of which day it is.

1.  Open the   
``||variables:Variables||``   
drawer and select the   
**Make a Variable...** button.
1.  Create a variable called   
``||variables(noclick):day||``.   
Select the green   
**Ok** button to create your variable.
1.  Add a   
``||variables:set day to (0)||``   
block **just above** the      
``||functions(noclick):call startNewDay||``   
block.

Now that we can keep track of which day it is, let's use it in our function.

Feel free to view the hint and compare your code.

~hint Why put the block there?

We are going to use the ``||variables(noclick):day||`` variable
in our function. Since we are giving the variable a value,
we should do so before we call the function.

hint~

```blocks
// @hide
function startNewDay() {
}
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
// @highlight
day = 0
startNewDay()
```

## Getting ready for more days!

When we call our function, we should update the value in the
``||variables(noclick):day||`` variable. Then, we can use it!

1.  At the **beginning** of your   
``||functions(noclick):startNewDay||``   
function, add a   
``||variables:change (day) by (1)||``   
block.
1.  After adding the block to your function, change the variable name
to ``||variables(noclick):day||`` if needed.
1.  From the   
``||variables:Variables||``   
drawer, drop a   
``||variables:day||``   
block into the   
``||solar(noclick):setup day ()||``   
block, replacing the ``||solar(noclick):(1)||``.

Again, check the simulator to make sure nothing has changed.

View the hint if you need any help.

Before we add more days, let's give some instructions to our player.

```block
let day = 0
function startNewDay() {
    day += 1
    solar.setupDay(day)
    solar.startDay()
}
```

## I'd like some direction

It might be nice to give the player some instructions, especially as
we add more days to the game.

1.  **Between** the   
``||solar(noclick):setup day||`` ``||variables(noclick):day||``   
block and the   
``||solar(noclick):start day||``   
block in your function, insert an   
``||logic:if (true) then||``   
block.
    -   View the hint if you need to see where to insert this block.
1.  Replace the   
``||logic(noclick):true||``   
block with blocks from the   
``||variables:Variables||`` and   
``||logic:Logic||`` drawers to make the ``||logic(noclick):if||`` block say:   
``||logic(noclick):if||`` ``||variables:day||`` ``||logic:= (1) then||``
1.  Inside of the   
``||logic(noclick):if||`` container, add a   
``||game:show long text ("")||``   
block.
1.  In this new block, enter some instructions to display to the player.
1.  Change the location of the text to the  
``||game(noclick):top||`` of the screen.

Check the simulator to see your instructions appear at the start of the game.

View the hint if you need any help.

```block
let day = 0
function startNewDay() {
    day += 1
    solar.setupDay(day)
    if (day == 1) {
        game.showLongText("Your instructions go here!", DialogLayout.Top)
    }
    solar.startDay()
}
```

## Finish @showdialog

Congratulations! Your project is ready to run for multiple days!

In the next tutorial, we'll make the game three days long.

```template
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.life() > 0) {
        solarPanelSprite = sprites.create(assets_solar.smallPanel, SpriteKind.SolarPanel)
        solarPanelSprite.setPosition(shadowSprite.x, shadowSprite.y)
        info.changeLifeBy(-1)
    }
})
let sunlightSprite: Sprite = null
let solarPanelSprite: Sprite = null
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
solar.setupDay(1)
solar.startDay()
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

```package
assets_solar=github:brown-toy-box/assets_solar
solar=github:brown-toy-box/solar
```