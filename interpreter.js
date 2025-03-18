const prompt = require("prompt-sync")({ sigint: true });

class Lexer {
    constructor(text, debug) {
        this.src = text.split('');
        this.tokens = [];
        this.pos = -1;
        this.curr_char = "";
        this.digits = "1234567890";
        this.letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
        this.debug = debug;
        this.advance();
        this.tokenize();
    }

    advance() {
        this.curr_char = ++this.pos < this.src.length ? this.src[this.pos] : null;
        if (this.debug) {
            console.log(`Lexer advance: pos=${this.pos}, curr_char=${this.curr_char}`);
        }
    }

    tokenize() {
        const tokenMap = {
            "+": "PLUS", "-": "MINUS", "*": "MULTIPLY", "/": "DIVIDE",
            "=": "EQUALS", "&": "AND", "|": "OR", "!": "NOT",
            "(": "LPAREN", ")": "RPAREN"
        };
        while (this.curr_char !== null) {
            if (tokenMap[this.curr_char]) {
                this.tokens.push({ type: tokenMap[this.curr_char], value: this.curr_char });
                this.advance();
            } else if (this.curr_char === '"') {
                this.parsestring();
            } else if (this.curr_char === ' ') {
                this.advance(); // Skip whitespace
            } else if (this.digits.includes(this.curr_char)) {
                this.parsenum();
            } else if (this.letters.includes(this.curr_char)) {
                this.parsevar();
            } else {
                throw new Error("Unexpected character: " + this.curr_char);
            }
        }
        if (this.debug) {
            console.log(`Lexer tokens: ${JSON.stringify(this.tokens)}`);
        }
    }

    parsenum() {
        let num_str = "";
        while (this.curr_char !== null && this.digits.includes(this.curr_char)) {
            num_str += this.curr_char;
            this.advance();
        }
        this.tokens.push({ type: "NUMBER", value: Number(num_str) });
    }

    parsestring() {
        let str_val = "";
        this.advance(); // Skip the opening quote
        while (this.curr_char !== null && this.curr_char !== '"') {
            str_val += this.curr_char;
            this.advance();
        }
        if (this.curr_char === '"') {
            this.advance(); // Skip the closing quote
            this.tokens.push({ type: "STRING", value: str_val });
        } else {
            throw new Error("Unterminated string literal");
        }
    }

    parsevar() {
        let var_str = "";
        while (this.curr_char !== null && (this.letters + this.digits).includes(this.curr_char)) {
            var_str += this.curr_char;
            this.advance();
        }
        if (var_str === "true" || var_str === "false") {
            this.tokens.push({ type: "BOOLEAN", value: var_str === "true" });
        } else {
            this.tokens.push({ type: "IDENTIFIER", value: var_str });
        }
    }
}
