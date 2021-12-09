import { Vector } from "./Type";

import ROAD_IMAGE from './images/ground.png'

export class Road {
    private roadImage: HTMLImageElement = new Image()

    constructor(
        private roadWidth: number,
        private roadHeight: number,
        private position: Vector
    ) {
        this.roadWidth = roadWidth
        this.roadHeight = roadHeight
        this.position = position
        this.roadImage.src = ROAD_IMAGE
    }

    public get width(): number {
        return this.roadWidth
    }

    public get height(): number {
        return this.roadHeight
    }

    public get pos(): Vector {
        return this.position
    }

    public get image(): HTMLImageElement {
        return this.roadImage
    }

    run(gameSpeed: number): void {
        this.position.x -= gameSpeed
    }
}