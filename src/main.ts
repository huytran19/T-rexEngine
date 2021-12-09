import { Bird } from "./Bird";
import { Cactus } from "./Cactus";
import { Cloud } from "./Cloud";
import { Player } from "./Player";
import { Road } from "./Road";
import { Scene } from "./Scene";
import { Score } from "./Score";

import { CANVAS_SIZE } from "./Setting";

let gameSpeed: number
let currentScore: number = 0
let highScore: number
let scoreTime: number
let initScoreTime: number
initScoreTime = 0
let gameOver = false

function setGameOver() {
    scene.drawGameOver()
    document.querySelector("#btn")?.setAttribute("style", "visibility: visible;")
}

function gameLoop(
    scene: Scene,
    player: Player,
    obstacles: any,
    roads: Road[],
    score: Score,
    clouds: Cloud[]
) {
    gameSpeed += 0.0007
    currentScore = score.update(currentScore)
    player.run()
    scene.update(player, obstacles, roads, gameSpeed, currentScore, clouds)
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i]
        if (
            player.pos.x < o.pos.x + o.width &&
            player.pos.x + player.width > o.pos.x &&
            player.pos.y < o.pos.y + o.height &&
            player.pos.y + player.height > o.pos.y
        ) {
            obstacles = []
            if (currentScore > highScore) {
                highScore = currentScore
                scene.drawHighScore(highScore)
            } else {
                scene.drawHighScore(highScore)
            }
            gameSpeed = 4
            return setGameOver()
        }
    }
    requestAnimationFrame(() => gameLoop(scene, player, obstacles, roads, score, clouds))
}

function start(scene: Scene) {
    document.querySelector("#btn")?.setAttribute("style", "visibility: hidden;")
    let roads = []
    let obstacles = []
    let clouds = []
    gameSpeed = 6
    const score = new Score()
    const road = new Road(800, 10, {x: 0, y: 160})
    const player = new Player(40, 45, {x: 35, y: 75})
    const cactus = new Cactus(25, 45, {x: 620, y: 130})
    const cloud = new Cloud(45, 15, {x: 620, y: 100})
    roads.push(road)
    obstacles.push(cactus)
    clouds.push(cloud)
    currentScore = score.score
    scene.drawCore(currentScore)
    gameLoop(scene, player, obstacles, roads, score, clouds)
}

const scene = new Scene(CANVAS_SIZE)
highScore = currentScore
scene.initPlayBtn(start)