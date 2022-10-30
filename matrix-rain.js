// dictum : A global var is important so that its accessible in all our scopes

var symbolSize = 42;
var streams = [];
var fadeInterval = 1.3;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);

    var x = 0;
    for(var i = 0; i <= width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(-1000, 0));
        streams.push(stream);
        x += symbolSize;
    }
    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    streams.forEach(function(stream) {
        stream.render();
    });
}

function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;

    this.speed = speed;
    this.switchInterval = round(random(2, 33));
    this.first = first;
    this.opacity = opacity;

    // control symbol switch
    this.setToRandomSymbol = function() {
        var charType = round(random(0,5));
        if(frameCount % this.switchInterval == 0) {
            // set it to Misc. math symbols
            if(charType > 2){
                this.value = String.fromCharCode(
                    0x27C0 + round(random(0, 97))
                  );
            // set it to Katakana
            } else {
                this.value = String.fromCharCode(
                    0x30A0 + round(random(0, 96))
                );
            }
        }
    }

    this.rain = function() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 11));
    this.speed = random(3, 7); // control speed 

    this.generateSymbols = function(x, y){
        var opacity = 255;
        var first = round(random(0, 4)) == 1;
        for (var i=0; i <= this.totalSymbols; i++){
            symbol = new Symbol(x, y, this.speed, first, opacity);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    // control graphics
    this.render = function() {
        this.symbols.forEach(function(symbol) {
            if (symbol.first) {
                fill(180, 255, 170, symbol.opacity);
            } 
            else {
                var switchColor = round(random(0,5));
                if(switchColor > 2){
                    fill(233, 236, 239, symbol.opacity);
                }
                else{
                    fill(0, 255, 70, symbol.opacity);
                }
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}