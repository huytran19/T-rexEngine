import { Road } from "./Road"
import { Player } from "./Player"
import { Vector } from "./Type"
import { Cactus } from "./Cactus"
import { Bird } from "./Bird"
import { Cloud } from "./Cloud"

import GAME_OVER_IMAGE from './images/gameover_text.png'

export class Scene {
    private _elm: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D
    private _btn: HTMLButtonElement
    private _score: HTMLDivElement
    private _highScore: HTMLDivElement
    private _time: number
    private initBtn: boolean
    private gameOverImage: HTMLImageElement = new Image()

    public get element(): HTMLCanvasElement {
        return this._elm
    }

    public get context(): CanvasRenderingContext2D {
        return this._ctx
    }

    constructor(public readonly size: Vector) {
        const canvas = document.createElement('canvas')
        canvas.setAttribute('width', `${size.x}px`)
        canvas.setAttribute('height', `${size.y}px`)

        const gameContentDiv = document.createElement('div')
        gameContentDiv.setAttribute('id', 'gameField')
        document.getElementById('game')?.appendChild(gameContentDiv)
        document.getElementById('gameField')?.appendChild(canvas)
        this._elm = canvas

        const context = this._elm.getContext('2d')
        if (!context) {
            throw new Error('Context identifier is not supported')
        }
        this._ctx = context

        // Create div to wrap play button, score and highscore
        const display = document.createElement('div')
        display.setAttribute('id', 'display')
        document.getElementById('game')?.appendChild(display)
        
        // Create div to display score
        const score = document.createElement('div')
        score.setAttribute('id', 'score')
        document.getElementById('display')?.appendChild(score)
        this._score = score

        const playBtn = document.createElement('button')
        playBtn.setAttribute('id', 'btn')
        playBtn.innerHTML = 'PLAY!'
        document.getElementById('display')?.appendChild(playBtn)
        this._btn = playBtn
        this.initBtn = true

        const highScore = document.createElement('div')
        highScore.setAttribute('id', 'highScore')
        document.getElementById('display')?.appendChild(highScore)
        this._highScore = highScore

        this.gameOverImage.src = GAME_OVER_IMAGE
    }

    initPlayBtn(start: (scene: Scene) => void): void {
        this._btn.addEventListener('click', () => start(this))
    }

    drawCore(score: number): void {
        this._score.innerHTML = score.toString()
    }

    drawHighScore(highScore: number): void {
        this._highScore.innerHTML = 'Highscore ' + highScore.toString()
    }

    drawSprite(entity: Player | Road | Cactus | Bird | Cloud): void {
        this._ctx.drawImage(
            entity.image,
            entity.pos.x,
            entity.pos.y,
            entity.width,
            entity.height
        )
    }
    
    drawGameOver(): void {
        this._ctx.drawImage(
            this.gameOverImage,
            215,
            95,
            170,
            10
        )
    }

    drawRoads(roads: Road[]): void {
        roads.forEach(road => this.drawSprite(road))
    }

    drawClouds(clouds: Cloud[]): void {
        clouds.forEach(cloud => this.drawSprite(cloud))
    }

    drawObstacles(obstacles: any[]): void {
        obstacles.forEach(obstacle => this.drawSprite(obstacle))
    }

    clear(): void {
        this._ctx.clearRect(0, 0, this._elm.width, this._elm.height)
    }

    update(player: Player, obstacles: any, roads: Road[], gameSpeed: number, score: number, clouds: Cloud[]): void {
        this.clear()
        this.loopRoad(roads, gameSpeed)
        this.loopObstacle(obstacles, gameSpeed, player)
        this.loopCloud(clouds)
        this.drawSprite(player)
        this.drawCore(score)
        
    }

    loopObstacle(obstacles: any, gameSpeed: number, player: Player) {
        for (let i = 0; i < obstacles.length; i++) {
            let o = obstacles[i]
            o.move(gameSpeed)
            o.initSpawnObsTimer--
            if ((o.initSpawnObsTimer - Math.floor((Math.random() * (40 - 30) + 30))) <= 0 && obstacles.length < 2) {
                if (Math.round(Math.random() * (10 - 0) + 0) > 2 && Math.round(Math.random() * (10 - 0) + 0) <= 6) {
                    const newObstacle = new Cactus(25, 45, {x: 620, y: 130})
                    obstacles.push(newObstacle)
                } else if (Math.round(Math.random() * (10 - 0) + 0) > 6 && Math.round(Math.random() * (10 - 0) + 0) <= 10) {
                    const newObstacle = new Cactus(18, 28, {x: 620, y: 147})
                    obstacles.push(newObstacle)
                } else {
                    const newObstacle = new Bird(35, 15, {x: 620, y: 120})
                    obstacles.push(newObstacle)
                }
            }
            if (o.pos.x < -30) {
                obstacles.splice(i, 1)
            }
        }
        this.drawObstacles(obstacles)
    }

    loopRoad(roads: Road[], gameSpeed: number) {
        for (let i = 0; i < roads.length; i++) {
            let r = roads[i]
            r.run(gameSpeed)
            if (r.pos.x < -200 && roads.length < 2) {
                const newRoad = new Road(800, 10, {x: 600, y: 160})
                roads.push(newRoad)
            }
            if (r.pos.x < -800) {
                roads.splice(i, 1)
            }
        }
        this.drawRoads(roads)
    }

    loopCloud(clouds: Cloud[]) {
        for (let i = 0; i < clouds.length; i++) {
            let c = clouds[i]
            c.fly()
            c.initSpawnCloudTimer--
            if ((c.initSpawnCloudTimer - Math.floor((Math.random() * (40 - 30) + 30))) <= 0 && clouds.length < 2) {
                const newCloud = new Cloud(45, 15, {x: 600 + Math.floor((Math.random() * (50 - 10) + 10)), y: 30 + Math.floor((Math.random() * (50 - 10) + 10))})
                clouds.push(newCloud)
            }
            if (c.pos.x < -30) {
                clouds.splice(i, 1)
            }
        }
        this.drawClouds(clouds)
    }
    
}
