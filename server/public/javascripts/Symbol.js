class Symbol {
    constructor(id){
        this.id = id;
        this.img = new Image();
        if(id == 0){
            this.name = "sandia";
            this.img.src = "./images/sandia.png";
        }else if(id == 1){
            this.name = "cereza";
            this.img.src = "./images/cereza.png";
        }else if(id == 2){
            this.name = "limon";
            this.img.src = "./images/limon.png";
        }else{
            this.name = "";
            this.img = new Image();
        }
       
        this.imgSize = 15;
    }

    draw(ctx, reelPos, symbolPos){
        ctx.drawImage(
            this.img,
            canvas.width/100*this.imgSize*reelPos+canvas.width/100*4,
            canvas.width/100*this.imgSize*symbolPos,
            canvas.width/100*this.imgSize,
            canvas.width/100*this.imgSize
        );
    }
}