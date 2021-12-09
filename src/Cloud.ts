import { Vector } from "./Type";

import CLOUD_IMAGE from './images/cloud.png'

export class Cloud {
    private cloudImage: HTMLImageElement = new Image()
    public initSpawnCloudTimer: number

    constructor(
        private cloudWidth: number,
        private cloudHeight: number,
        private position: Vector
    ) {
        this.cloudWidth = cloudWidth
        this.cloudHeight = cloudHeight
        this.position = position
        this.cloudImage.src = CLOUD_IMAGE
        this.initSpawnCloudTimer = 250
    }

    public get width(): number {
        return this.cloudWidth
    }

    public get height(): number {
        return this.cloudHeight
    }

    public get pos(): Vector {
        return this.position
    }

    public get image(): HTMLImageElement {
        return this.cloudImage
    }

    fly(): void {
        this.position.x -= 1.5
    }
}