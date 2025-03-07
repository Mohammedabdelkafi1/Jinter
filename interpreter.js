const prompt = require("prompt-sync")({ sigint: true });

class Lexer {
    constructor(text) {
        this.src = text.split('');
        this.pos = -1;
        this.tokens = [];
        this.curr_char = None;
    }
    advance() {
        this.pos+=1;
        this.curr_char = this.src[pos];
    }
}
