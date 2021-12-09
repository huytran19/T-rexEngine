import { Vector } from "./Type"

import BIRD_UP_IMAGE from './images/bird_up.png'
import BIRD_DOWN_IMAGE from './images/bird_down.png'

export class Bird {
    private birdImage: HTMLImageElement = new Image()
    public initSpawnObsTimer: number
    private flyTime: number
    private deltaTime: number
    private isFlyDown: boolean

    constructor(
        private birdWidth: number,
        private birdHeight: number,
        private position: Vector
    ) {
        this.birdWidth = birdWidth
        this.birdHeight = birdHeight
        this.position = position
        this.birdImage.src = BIRD_UP_IMAGE
        this.initSpawnObsTimer = 100
        this.flyTime = 0
        this.deltaTime = 0.0625
        this.isFlyDown = false
    }

    public get width(): number {
        return this.birdWidth
    }

    public get height(): number {
        return this.birdHeight
    }

    public get pos(): Vector {
        return this.position
    }

    public get image(): HTMLImageElement {
        return this.birdImage
    }

    move(gameSpeed: number): void {
        this.flyTime += this.deltaTime
        this.position.x -= gameSpeed
        if (this.flyTime > 0.8) {
            this.flyTime = 0
            this.fly()
        }
    }

    fly(): void {
        if (this.isFlyDown) {
            this.birdImage.src = BIRD_UP_IMAGE
            this.isFlyDown = false
            return
        }
        if (!this.isFlyDown) {
            this.birdImage.src = BIRD_DOWN_IMAGE
            this.isFlyDown = true
            return
        }
    }
}