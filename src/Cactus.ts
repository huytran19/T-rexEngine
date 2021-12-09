import { Vector } from "./Type"

import CACTUS_LARGE_IMAGE from './images/cactus_large.png'
import CACTUS_SMALL_IMAGE from './images/cactus_small.png'

export class Cactus {
    private cactusImage: HTMLImageElement = new Image()
    public initSpawnObsTimer: number

    constructor(
        private cactusWidth: number,
        private cactusHeight: number,
        private position: Vector
    ) {
        this.cactusWidth = cactusWidth
        this.cactusHeight = cactusHeight
        this.position = position
        this.cactusImage.src = CACTUS_LARGE_IMAGE
        this.initSpawnObsTimer = 100
    }

    public get width(): number {
        return this.cactusWidth
    }

    public get height(): number {
        return this.cactusHeight
    }

    public get pos(): Vector {
        return this.position
    }

    public get image(): HTMLImageElement {
        return this.cactusImage
    }

    move(gameSpeed: number): void {
        this.position.x -= gameSpeed
    }
}