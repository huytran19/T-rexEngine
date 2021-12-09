export class Score {
    private _score: number
    private _highScore: number
    private _currentScore: number
    private _scoreTime: number
    private _deltaTime: number

    constructor() {
        this._score = 0
        this._scoreTime = Date.now()
        this._deltaTime = 0
    }

    public get score(): number {
        return this._score
    }

    update(currentScore: number): number {
        this._deltaTime = Date.now() - this._scoreTime
        if (this._deltaTime >= 100) {
            currentScore++
            this._scoreTime = Date.now()
            this._deltaTime = 0
        }
        return currentScore
    }
}