const prompt = require("prompt-sync")({ sigint: true });

class Lexer {
    constructor(text) {
        this.src = text.split('');
        this.pos = -1;
        this.tokens = [];
        this.curr_char = null;
        this.advance();
    }

    advance() {
        this.pos += 1;
        this.curr_char = this.pos < this.src.length ? this.src[this.pos] : null;
    }

    tokenize() {
        while (this.curr_char !== null) {
            if (this.curr_char === "+") {
                this.tokens.push("PLUS");
            } else if (this.curr_char === "-") {
                this.tokens.push("MINUS");
            } else if (this.curr_char === "*") {
                this.tokens.push("MUL");
            } else if (this.curr_char === "/") {
                this.tokens.push("DIV");
            }
            this.advance();
        }
        return this.tokens;
    }
}

function main() {
    let a = true;
    while (a) {
        let text = prompt("Jinter > ");
        if (text === "exit") {
            a = false;
            console.log("Exiting...");
            break;
        }
        const lexer = new Lexer(text);
        const tokens = lexer.tokenize();
        console.log("Tokens:", tokens);
    }
}

main();
