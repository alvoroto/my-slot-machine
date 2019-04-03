class Reel {
    constructor(id, symbols=[]){
        this.id = id;
        this.symbols = [];
        symbols.forEach((symbol)=>{
            this.symbols.push(new Symbol(symbol))
        }) 
    }

    draw(canvas, ctx, reelPos){
        this.symbols.forEach((symbol, index)=>{
            symbol.draw(canvas, ctx, reelPos, index)
        })
    }
}