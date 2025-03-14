const prompt = require("prompt-sync")({ sigint: true });
const nums = "1234567890";

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

    parse_num() {
        let num_str = "";
        while (this.curr_char !== null && nums.includes(this.curr_char)) {
            num_str += this.curr_char;
            this.advance();
        }
        this.tokens.push(num_str);
    }

    tokenize() {
        while (this.curr_char !== null) {
            if (this.curr_char === " ") {
                this.advance();
            } else if (this.curr_char === "+") {
                this.tokens.push("PLUS");
                this.advance();
            } else if (this.curr_char === "-") {
                this.tokens.push("MINUS");
                this.advance();
            } else if (this.curr_char === "*") {
                this.tokens.push("MUL");
                this.advance();
            } else if (this.curr_char === "/") {
                this.tokens.push("DIV");
                this.advance();
            } else if (nums.includes(this.curr_char)) {
                this.parse_num();
            } else {
                console.error(`Unknown character: ${this.curr_char}`);
                this.advance();
            }
        }
        return this.tokens;
    }
}
class Parser {
    constructor(tokens) {}
}
main();

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
        console.log(tokens);
    }
}
main();
