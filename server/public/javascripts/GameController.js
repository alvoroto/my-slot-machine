class GameController {
    constructor(){
        this.canvas = undefined;
        this.ctx = undefined;
        this.fps = 60;
        this.reelNumber = 5;
        this.symbolNumber = 3;
        this.symbolList = [];
        this.symbolSize = 10;
        this.priceLines = [1];
        this.priceImg = new Image();
        this.priceImg.src = "./images/premio.png";
        this.priceImgW = 50
        this.priceImgH = 20
        this.frontImg = new Image();
        this.frontImg.src = "./images/maquina.png";
        this.frontImgW = 88
        this.frontImgH = 50
        this.animateReelImg = new Image();
        this.animateReelImg.src = "./images/rueda.png";
        this.animateReelImgW = 15;
        this.framesCounter = 0;
       
    }

    init(canvasId) {

        this.panel = new Panel();
        let symbol1 = new Symbol(0);
        let symbol2 = new Symbol(1);
        let symbol3 = new Symbol(2);
        this.symbolList = [symbol1,symbol2,symbol3];
        let initSymbols = [0,1,2];
        let reel1 = new Reel(0,initSymbols);
        let reel2 = new Reel(1,initSymbols);
        let reel3 = new Reel(2,initSymbols);
        let reel4 = new Reel(3,initSymbols);
        let reel5 = new Reel(4,initSymbols);
        let initReels = [reel1,reel2,reel3,reel4,reel5]
        this.panel.reels = initReels;

        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth/1.5;
        this.canvas.height = window.innerWidth/2.8;
        this.ctx = this.canvas.getContext("2d");
        this.fps = 60;
        /*
            animation loop
        */
        this.interval = setInterval(function () {
            this.clear();

            this.framesCounter++;

            if (this.framesCounter > 10000) {
                this.framesCounter = 0;
            }

            this.panel.draw(this.canvas, this.ctx);
            //this.animateReel(this.framesCounter)
            this.drawImages();
            this.drawPrices();

        }.bind(this), 1000 / this.fps);
    }

    //limpieza de la pantalla
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    play() {
        this.resetReels()
       
        this.generateRandomReel()
    
        //this.checkReward();

    }

    generateRandomReel(reelId){
        axios.get('/newPlay')
        .then(res => {
            res.data.data.newReels.forEach((newReel)=>{
                this.panel.reels.push(new Reel(newReel.id, newReel.symbols))
            })
            this.checkReward();
        })
        .catch(err => console.log(err));
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
                this.canvas.width/100*this.frontImgW/2-this.canvas.width/100*this.priceImgW/2,
                this.canvas.width/100*this.frontImgH/2-this.canvas.width/100*this.priceImgH/2,
                this.canvas.width/100*this.priceImgW,
                this.canvas.width/100*this.priceImgH
            );
        }
    }

    drawImages(){
        this.ctx.drawImage(
            this.frontImg,
            0,
            0,
            this.canvas.width/100*this.frontImgW,
            this.canvas.width/100*this.frontImgH
        );
    }

    animateReel(framesCounter) {
        this.ctx.drawImage(
            this.animateReelImg,
            canvas.width/100*this.animateReelImgW*0,
            framesCounter%60*50,
            canvas.width/100*this.animateReelImgW,canvas.width/100*this.animateReelImgW*9,
            canvas.width/100*this.animateReelImgW*0+canvas.width/100*4,
            canvas.width/100*this.animateReelImgW*0+canvas.width/100*5,
            canvas.width/100*this.animateReelImgW,
            canvas.width/100*this.animateReelImgW*9
        )
    };
    

}