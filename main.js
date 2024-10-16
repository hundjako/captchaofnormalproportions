const config = {
    puzzleDimension: 3,               // puzzle dimension is intended to be either 2 or 3, to make captcha fast enough to solve
    budSize: 60,                      // feel free to experiment with this value I like it best as approx. 30% of a single piece size
    maxDistanceFromSolution: 150,
    imageFile: "./mayushii.png"
}

//
// Inner machinations from this point onward
//

const puzzleDimension = {
    w: config.puzzleDimension,
    h: config.puzzleDimension
};

const maxAdmitedScore = config.maxDistanceFromSolution;
const budSize = config.budSize;

const puzzleContainer = document.getElementById("container");
puzzleContainer.onpointermove = event => {
    const {clientX, clientY} = event;
    
    puzzlePieces.forEach(ppiece => {
        ppiece.style.zIndex = 0
        if (ppiece.selected && ppiece.id !=="0"){
            ppiece.style.zIndex = 1
            ppiece.animate(
                {
                    left: `${clientX}px`,
                    top: `${clientY}px`
                },
                {duration: 100, fill: "forwards"}
            );
        }
    });
}


let canvas = document.querySelector("#canvas");
canvas.width = 800;
canvas.height = 800;

function shuffle(array){
    let currIndex = array.length;
    while (currIndex > 0){
        const randIndex = Math.floor(Math.random()*currIndex);
        currIndex--;
        [array[currIndex],array[randIndex]] = [array[randIndex], array[currIndex]];
    }
}


class PuzzlePieceCutter {
    constructor(b){
        this.centers = []
        this.b = b;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext("2d");
    }

    get width(){
        return this.a + 2 * this.b;
    }
    
    async init(){
        this.pict = new Image();
        this.pict.src = config.imageFile;
        await this.pict.decode();
        this.a = (canvas.width - 2*this.b) / puzzleDimension.w;

        for (let j = 0; j < puzzleDimension.h; j++){
            for (let i = 0; i < puzzleDimension.w; i++){
                this.centers[j * puzzleDimension.w + i] = {
                    x: (canvas.width - 2*this.b) / puzzleDimension.w * i + this.a/2 + this.b + this.#randomVal()/2,
                    y: (canvas.height - 2*this.b) / puzzleDimension.h * j + this.a/2 + this.b + this.#randomVal()/2
                };
            }
        }
    }

    #randomVal(){
        return Math.random() * this.b - this.b/2;
    }
    #randomDir(){
        return Math.round(Math.random() * 2) - 1;
    }
    
    draw(pieceIndex){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.fillRect(0,0,canvas.width, canvas.height);
        this.ctx.globalCompositeOperation = "xor";
        this.ctx.moveTo(
            this.centers[pieceIndex].x - this.a/2,
            this.centers[pieceIndex].y - this.a/2
        );
        this.ctx.beginPath();
        this.ctx.lineTo(
            this.centers[pieceIndex].x - this.b/2,
            this.centers[pieceIndex].y - this.a/2
        );
        let dir = this.#randomDir();
        this.ctx.bezierCurveTo(
            this.centers[pieceIndex].x - this.b + this.#randomVal(), this.centers[pieceIndex].y - this.a/2 - this.b*dir + this.#randomVal(),
            this.centers[pieceIndex].x + this.b + this.#randomVal(), this.centers[pieceIndex].y - this.a/2 - this.b*dir + this.#randomVal(),
            this.centers[pieceIndex].x + this.b/2, this.centers[pieceIndex].y - this.a/2
        );
        this.ctx.lineTo(
            this.centers[pieceIndex].x + this.a/2,
            this.centers[pieceIndex].y - this.a/2
        );
        //
        this.ctx.lineTo(
            this.centers[pieceIndex].x + this.a/2,
            this.centers[pieceIndex].y - this.b/2
        );
        dir = this.#randomDir();
        this.ctx.bezierCurveTo(
            this.centers[pieceIndex].x + this.a/2 + this.b*dir + this.#randomVal(), this.centers[pieceIndex].y - this.b + this.#randomVal(),
            this.centers[pieceIndex].x + this.a/2 + this.b*dir + this.#randomVal(), this.centers[pieceIndex].y + this.b + this.#randomVal(),
            this.centers[pieceIndex].x + this.a/2, this.centers[pieceIndex].y + this.b/2
        );
        this.ctx.lineTo(
            this.centers[pieceIndex].x + this.a/2,
            this.centers[pieceIndex].y + this.a/2
        );
        //
        this.ctx.lineTo(
            this.centers[pieceIndex].x + this.b/2,
            this.centers[pieceIndex].y + this.a/2
        );
        dir = this.#randomDir();
        this.ctx.bezierCurveTo(
            this.centers[pieceIndex].x + this.b + this.#randomVal(), this.centers[pieceIndex].y + this.a/2 + this.b*dir + this.#randomVal(),
            this.centers[pieceIndex].x - this.b + this.#randomVal(), this.centers[pieceIndex].y + this.a/2 + this.b*dir + this.#randomVal(),
            this.centers[pieceIndex].x - this.b/2, this.centers[pieceIndex].y + this.a/2
        );
        this.ctx.lineTo(
            this.centers[pieceIndex].x - this.a/2,
            this.centers[pieceIndex].y + this.a/2
        );
        //
        this.ctx.lineTo(
            this.centers[pieceIndex].x - this.a/2,
            this.centers[pieceIndex].y + this.b/2
        );
        dir = this.#randomDir();
        this.ctx.bezierCurveTo(
            this.centers[pieceIndex].x - this.a/2 - this.b*dir + this.#randomVal(), this.centers[pieceIndex].y + this.b + this.#randomVal(),
            this.centers[pieceIndex].x - this.a/2 - this.b*dir + this.#randomVal(), this.centers[pieceIndex].y - this.b + this.#randomVal(),
            this.centers[pieceIndex].x - this.a/2, this.centers[pieceIndex].y - this.b/2
        );
        this.ctx.lineTo(
            this.centers[pieceIndex].x - this.a/2,
            this.centers[pieceIndex].y - this.a/2
        );
        this.ctx.fill();

        this.ctx.drawImage(this.pict, 0, 0, canvas.width, canvas.height);
    }
}

// I know my code is a mess, but frankly I don't care


let puzzlePieces = [];

(async () => {
    
    const pieceCutter = new PuzzlePieceCutter(budSize);
    await pieceCutter.init();

    
    for (let j = 0; j < puzzleDimension.h; j++){
        for (let i = 0; i < puzzleDimension.w; i++){
            const pieceIndex = j * puzzleDimension.w + i
            pieceCutter.draw(pieceIndex);
            const puzzlePiece = document.createElement("canvas");
            puzzlePiece.width = pieceCutter.width;
            puzzlePiece.height = pieceCutter.width;
            puzzlePiece.style.width = `${pieceCutter.width}px`
            puzzlePiece.style.height = `${pieceCutter.width}px`
            if (i === 0 && j === 0){
                puzzlePiece.style.left = `${pieceCutter.centers[0].x + puzzleContainer.offsetLeft}px`
                puzzlePiece.style.top = `${pieceCutter.centers[0].y + puzzleContainer.offsetTop}px`
                puzzlePiece.selected = false;
            } else {
                puzzlePiece.style.left = `${400 + Math.random() * 250}px`
                puzzlePiece.style.top = `${400 + Math.random() * 250}px`
                puzzlePiece.selected = false;
                puzzlePiece.onmousedown = () => puzzlePiece.selected = true;
                puzzlePiece.onmouseup = () => puzzlePiece.selected = false;
            }
            puzzlePiece.classList.add("puzzle-piece");
            puzzlePiece.id = `${pieceIndex}`;
            puzzlePieces.push(puzzlePiece);
            puzzlePiece.getContext("2d").drawImage(
                canvas,
                pieceCutter.centers[pieceIndex].x - pieceCutter.width/2,
                pieceCutter.centers[pieceIndex].y - pieceCutter.width/2,
                pieceCutter.width, pieceCutter.width,
                0, 0,
                pieceCutter.width, pieceCutter.width
            );
        }
        shuffle(puzzlePieces);
        puzzlePieces.forEach(ppiece => {
            puzzleContainer.appendChild(ppiece);
        });
    }
    document.getElementById("submit-button").onclick = () => {
        const left = puzzleContainer.offsetLeft
        const top = puzzleContainer.offsetTop
        const positions = [...document.getElementsByClassName("puzzle-piece")].map(piece => {
            return {
                id: piece.id,
                x: piece.offsetLeft - left,
                y: piece.offsetTop - top
            }
        }).sort((a, b) => a.id - b.id);
        // get score
        let score = 0;
        for (let i = 0; i < positions.length; i++){
            score += Math.abs(positions[i].x - pieceCutter.centers[i].x);
            score += Math.abs(positions[i].y - pieceCutter.centers[i].y);
        };
        let message = `You scored ${score} points!\n`;
        
        if (score > maxAdmitedScore) {
            message += "🤖 You are definitely a robot🤖 and may not enter!";
        } else {
            message += "You appear to be human!👨 (further testing required)";
        }
        if (confirm(message + "\n\nTry again?")){
            location.reload();
        }
    };
})();


