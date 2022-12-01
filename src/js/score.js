export default class Score {
	constructor() {
		this.highScore = 0;
		this.currScore = 0;
		this.gameOver = true;
	}

	random() {
		return Math.floor(Math.random() * (560 - 1)) + 1;
	}

	checkHigh() {
		if (this.currScore > this.highScore) {
			this.highScore = this.currScore;
		}
	}
}