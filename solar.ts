namespace SpriteKind {
    //% isKind
    export const Scenery = SpriteKind.create()
    //% isKind
    export const SolarPanel = SpriteKind.create()
    //% isKind
    export const Sunlight = SpriteKind.create()
    //% isKind
    export const Cloud = SpriteKind.create()
    //% isKind
    export const ReducedSunlight = SpriteKind.create()
}
info.onLifeZero(function () {

})

//% weight=0 color=#BC8D15 icon="\uf185"
namespace solar {
    const TICKS_PER_DAY: number = 24000
    const MIDDAY_TICKS: number = TICKS_PER_DAY / 2
    const CLOUDS: Image[] = [
        assets_solar.cloud0,
        assets_solar.cloud1,
        assets_solar.cloud2,
        assets_solar.cloud3,
        assets_solar.cloud4,
        assets_solar.cloud5,
        assets_solar.cloud6,
    ]
    let initCredits: number = 0
    let ticks: number = 0
    /*
    let sunX: number = 0
    let sunY: number = 0
    */
    let yesterdayScore: number = 0
    let runtimeStart: number = 0

    //% block
    export function setInitialCredits(num: number) {
        info.setLifeImage(assets_solar.credits)
        initCredits = num
    }

    //% block="move sun sprite $theSun"
    export function moveSun(theSun: Sprite) {
        ticks = game.runtime() - runtimeStart
        let sunX: number = 160 - 160 * ticks / TICKS_PER_DAY
        let sunY: number = 7 * (sunX * sunX) / 640 - 7 * sunX / 4 + 70
        theSun.setPosition(sunX, sunY)
    }

    //% block="attach shadow $shadow to player $player"
    export function attachShadowToPlayer(shadow: Sprite, player: Sprite) {
        if (shadow !== null && player !== null) {
            player.z = shadow.z + 1
        }
        game.onUpdate(function () {
            if (shadow !== null && player !== null) {
                shadow.x = player.right
                shadow.y = player.top
            }
        })
    }

    //% block="is sunlight made?"
    export function isSunlightMade() {
        let delta: number = Math.abs(ticks - MIDDAY_TICKS)
        let chance: number = 90 * (MIDDAY_TICKS - delta) / MIDDAY_TICKS + 10
        if (Math.percentChance(chance)) {
            return true
        } else {
            return false
        }
    }

    //% block
    //% theDay.defl=1
    export function setupDay(theDay: number) {
        if (theDay == 1) {
            info.setLife(initCredits)
        } else {
            info.changeLifeBy(Math.idiv(info.score() - yesterdayScore, 10))
        }
        yesterdayScore = info.score()
    }

    //% block
    export function startDay() {
        runtimeStart = game.runtime()
        info.startCountdown(Math.idiv(TICKS_PER_DAY, 1000))
    }

    //% block="add cloud sprite"
    export function addCloud() {
        let cloud: Sprite = sprites.create(CLOUDS._pickRandom(), SpriteKind.Cloud)
        cloud.setPosition(200, 200)
        timer.background(function () {
            pause(randint(1000, 12000))
            cloud.left = 158
            cloud.y = randint(20, 50)
            cloud.vx = -100
            cloud.setFlag(SpriteFlag.AutoDestroy, true)
        })
    }
}