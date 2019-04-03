class Symbol {
    constructor(id, name, src){
        this.id = id;
        this.name = name;
        this.img = new Image();
        this.img.src = src;
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