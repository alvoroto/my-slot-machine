class Panel {
    constructor(){
        this.date = new Date;
        this.reward = 0;
        this.reels = [];
    }

    draw(canvas, ctx){
        this.reels.forEach((reel, index)=>{
            reel.draw(canvas, ctx, index)
        })
    }

}