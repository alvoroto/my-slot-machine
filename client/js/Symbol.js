class Symbol {
    constructor(id, name, src){
        this.id = id;
        this.name = name;
        this.img = new Image();
        this.img.src = src;
    }

    draw(ctx, reelPos, symbolPos){
        ctx.drawImage(
            this.img,
            100*reelPos,
            100*symbolPos,
            100,
            100
        );
    }
}