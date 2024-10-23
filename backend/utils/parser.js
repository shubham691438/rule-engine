const Node = require('./node');
  
  class Parser {
    constructor(tokens) {
      this.tokens = tokens;
      this.currentIndex = 0;
    }
  
    parse() {
      return this.parseExpression();
    }
  
    parseExpression() {
      let leftNode = this.parseTerm();
  
      while (this.currentToken() === 'AND' || this.currentToken() === 'OR') {
        const operator = this.currentToken();
        this.consumeToken();
        const rightNode = this.parseTerm();
        leftNode = new Node('operator', leftNode, rightNode, operator);
      }
  
      return leftNode;
    }
  
    parseTerm() {
      if (this.currentToken() === '(') {
        this.consumeToken();
        const expression = this.parseExpression();
        this.consumeToken();
        return expression;
      } else {
        return this.parseComparison();
      }
    }
  
    parseComparison() {
      const leftOperand = this.currentToken();
      this.consumeToken();
  
      const operator = this.currentToken();
      this.consumeToken();
  
      const rightOperand = this.currentToken();
      this.consumeToken();
  
      return new Node('operand', null, null, {
        key: leftOperand,
        operator,
        value: this.parseLiteral(rightOperand),
      });
    }
  
    parseLiteral(token) {
      if (token.startsWith("'") && token.endsWith("'")) {
        return token.slice(1, -1);
      }
      return Number(token);
    }
  
    currentToken() {
      return this.tokens[this.currentIndex];
    }
  
    consumeToken() {
      this.currentIndex++;
    }
  }
  
  module.exports = Parser;
  