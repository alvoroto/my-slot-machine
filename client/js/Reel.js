class Reel {
    constructor(id, symbols=[]){
        this.id = id;
        this.symbols = symbols;
    }

    draw(ctx, reelPos){
        this.symbols.forEach((symbol, index)=>{
            symbol.draw(ctx, reelPos, index)
        })
    }
}