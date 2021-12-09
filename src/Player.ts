import { Vector } from "./Type";

import PLAYER_IDLE_IMAGE from './images/trex.png'
import PLAYER_RUN_1_IMAGE from './images/trex_run_1.png'
import PLAYER_RUN_2_IMAGE from './images/trex_run_2.png'
import PLAYER_DUCK_1_IMAGE from './images/trex_duck_1.png'
import PLAYER_DUCK_2_IMAGE from './images/trex_duck_2.png'
import { TREX } from "./Setting";

export class Player {
    private playerImage: HTMLImageElement = new Image()
    private isRun: boolean
    private isRun1: boolean
    private isJump: boolean
    private isDuck: boolean
    private isDuck1: boolean
    private dy: number
    private gravity: number
    private jumpTimer: number
    private runTimer: number
    private duckTimer: number
    private deltaTime: number
    private jumpForce: number
    

    constructor(
        private playerWidth: number,
        private playerHeight: number,
        private position: Vector,
    ) {
        this.playerWidth = playerWidth
        this.playerHeight = playerHeight
        this.position = position
        this.playerImage.src = PLAYER_IDLE_IMAGE

        this.isRun = false
        this.isRun1 = false
        this.isJump = false
        this.isDuck = false
        this.isDuck1 = false

        this.dy = 0
        this.gravity = 0.7
        this.jumpTimer = 0
        this.jumpForce = 10

        this.runTimer = 0
        this.duckTimer = 0
        this.deltaTime = 0.0625

        document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('keyup', this.handleKeyUp)
    }

    public get width(): number {
        return this.playerWidth
    }

    public get height(): number {
        return this.playerHeight
    }

    public get pos(): Vector {
        return this.position
    }

    public get image(): HTMLImageElement {
        return this.playerImage
    }

    handleKeyDown = (e: KeyboardEvent): void => {
        if (e.code === 'ArrowUp' || e.key === 'ArrowUp' || e.code === 'Space') this.isJump = true
        if (e.code === 'ArrowDown' || e.key === 'ArrowDown') this.isDuck = true
    }

    handleKeyUp = (e: KeyboardEvent): void => {
        if (e.code === 'ArrowUp' || e.key === 'ArrowUp' || e.code === 'Space') this.isJump = false
        if (e.code === 'ArrowDown' || e.key === 'ArrowDown') this.isDuck = false
    }

    run(): void {
        this.runTimer += this.deltaTime
        this.duckTimer += this.deltaTime
        if (this.isJump && !this.isDuck) {
            this.jump()
        } else {
            this.jumpTimer = 0
        }

        if (this.isDuck) {
            if (this.duckTimer > 0.5 && this.isRun) {
                this.duckTimer = 0
                this.moving('duck')
                
            }
        } else {
            if (this.runTimer > 0.5) {
                this.playerWidth = TREX.width
                this.playerHeight = TREX.height
            }
        }

        

        this.position.y += this.dy
        if (this.position.y + this.playerHeight < 175) {
            this.dy += this.gravity
            this.isRun = false
            this.isRun1 = false
            this.isDuck1 = false
            this.playerImage.src = PLAYER_IDLE_IMAGE
        } else {
            this.dy = 0
            this.isRun = true
            this.position.y = 175 - this.playerHeight
            if (this.runTimer > 0.5 && this.isRun && !this.isDuck) {
                this.runTimer = 0
                this.moving('run')
            }
        } 
    }

    jump(): void {
        if (this.isRun && this.jumpTimer == 0) {
            this.jumpTimer = 2
            this.dy = -this.jumpForce
        }
        else if (this.jumpTimer > 0 && this.jumpTimer < 5) {
            this.jumpTimer++
            this.dy = -this.jumpForce - (this.jumpTimer/50)
        }
    }

    moving(type: string): void {
        if (type === 'run') {
            if (this.isRun1 && this.isDuck1) {
                this.playerImage.src = PLAYER_RUN_2_IMAGE
                this.isRun1 = false
                this.isDuck1 = false
                return
            }
            if (!this.isRun1 && !this.isDuck1) {
                this.playerImage.src = PLAYER_RUN_1_IMAGE
                this.isRun1 = true
                this.isDuck1 = true
                return
            }
        }

        else if (type === 'duck') {
            this.playerWidth = 54
            this.playerHeight = 27
            this.position.y = 148
            if (this.isDuck1 && this.isRun1) {
                this.playerImage.src = PLAYER_DUCK_2_IMAGE
                this.isDuck1 = false
                this.isRun1 = false
                return
            } 
            if (!this.isDuck1 && !this.isRun1) {
                this.playerImage.src = PLAYER_DUCK_1_IMAGE
                this.isDuck1 = true
                this.isRun1 = true
                return
            }
        }
    }
}