export default class Score {
	constructor() {
		this.highScore = 0;
		this.currScore = 0;
		this.level = 0;
	}

	random() {
		return Math.floor(Math.random() * (580 - 1 + 1)) + 1;
	}

	checkHigh() {
		if (this.currScore > this.highScore) {
			this.highScore = this.currScore;
		}
	}

	checkLevel() {
		if ((this.currScore % 5 === 0 && this.currScore <= 20)) {
			this.level ++;
		}
	}
}