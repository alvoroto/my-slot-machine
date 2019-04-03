class GameController {
    constructor(){
        this.canvas = undefined;
        this.ctx = undefined;
        this.fps = 60;
        this.reelNumber = 5;
        this.symbolNumber = 3;
        this.symbolList = [];
        this.priceLines = [1];
        this.priceImg = new Image();
        this.priceImg.src = "./images/premio.png";
       
    }

    init(canvasId) {

        this.panel = new Panel();
        let symbol1 = new Symbol(0,"sandia","./images/sandia.png");
        let symbol2 = new Symbol(1,"cereza","./images/cereza.png");
        let symbol3 = new Symbol(2,"limon","./images/limon.png");
        this.symbolList = [symbol1,symbol2,symbol3];
        let initSymbols = [symbol1,symbol2,symbol3];
        let reel1 = new Reel(0,initSymbols);
        let reel2 = new Reel(1,initSymbols);
        let reel3 = new Reel(2,initSymbols);
        let reel4 = new Reel(3,initSymbols);
        let reel5 = new Reel(4,initSymbols);
        let initReels = [reel1,reel2,reel3,reel4,reel5]
        this.panel.reels = initReels;

        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.fps = 60;
        /*
            animation loop
        */
        this.interval = setInterval(function () {
            this.clear();

            this.framesCounter++;

            // controlamos que frameCounter no sea superior a 10000
            if (this.framesCounter > 10000) {
                this.framesCounter = 0;
            }

            this.panel.draw(this.ctx);
            this.drawPrices();

        }.bind(this), 1000 / this.fps);
    }

    //limpieza de la pantalla
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    play() {
        this.resetReels()
        for(let i=0; i<this.reelNumber; i++){
            this.panel.reels.push(this.generateRandomReel(i))
        }
        this.checkReward()
    }

    generateRandomReel(reelId){
        let symbols = []
        for(let i=0; i< this.symbolNumber; i++){
            symbols.push(this.symbolList[Math.floor(Math.random() * this.symbolNumber)])
        }
        return new Reel(reelId,symbols)
    }

    resetReels(){
        this.panel.reels = [];
    }

    checkReward(){
        this.panel.reward = 0
        let firstSymbol;
        this.priceLines.forEach((line)=>{
            firstSymbol = this.panel.reels[0].symbols[line].id 
            console.log(firstSymbol)
            if(firstSymbol == this.panel.reels[1].symbols[line].id &&
                firstSymbol == this.panel.reels[2].symbols[line].id ){
                    if(firstSymbol
                        == this.panel.reels[3].symbols[line].id ){
                            if(firstSymbol
                                == this.panel.reels[4].symbols[line].id ){
                                    this.panel.reward += 10
                            }else{
                                this.panel.reward += 5
                            }
                    }else{
                        this.panel.reward += 2
                    }
            }
        })

        document.getElementById("reward").innerHTML = this.panel.reward;

        
    }
    drawPrices(){
        if(this.panel.reward > 0){
            this.ctx.drawImage(
                this.priceImg,
                100,
                100
            );
        }
    }

}