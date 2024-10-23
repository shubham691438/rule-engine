class Tokenizer {
    constructor(ruleString) {
      this.ruleString = ruleString;
      this.tokens = [];
    }
  
    tokenize() {
      const regex = /\s*(=>|>=|<=|[><=()]|AND|OR|[a-zA-Z_][a-zA-Z0-9_]*|\d+|'[^']+')\s*/g;
      let match;
      while ((match = regex.exec(this.ruleString))) {
        this.tokens.push(match[0].trim());
      }
      return this.tokens;
    }
    
  }
  
  module.exports = Tokenizer;
  