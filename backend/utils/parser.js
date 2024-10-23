const Node = require('./node');

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.currentIndex = 0;
  }

  parse() {
    const ast = this.parseExpression();
    if (this.currentIndex < this.tokens.length) {
      throw new Error(`Unexpected token: ${this.tokens[this.currentIndex]}`);
    }
    return ast;
  }

  parseExpression() {
    let leftNode = this.parseTerm();

    while (this.currentToken() === 'AND' || this.currentToken() === 'OR') {
      let operator = this.currentToken();
      this.consumeToken();

      let rightNode = this.parseTerm();
      if (!rightNode) {
        throw new Error(`Missing right operand after operator: ${operator}`);
      }

      leftNode = new Node("operator", leftNode, rightNode, operator);
    }

    return leftNode;
  }

  parseTerm() {
    if (this.currentToken() === '(') {
      this.consumeToken();
      let expression = this.parseExpression();
      if (this.currentToken() !== ')') {
        throw new Error('Mismatched parentheses');
      }
      this.consumeToken();
      return expression;
    } else {
      return this.parseComparison();
    }
  }

  parseComparison() {
    let leftOperand = this.currentToken();
    if (!this.isValidOperand(leftOperand)) {
      throw new Error(`Invalid operand: ${leftOperand}`);
    }
    this.consumeToken();

    let operator = this.currentToken();
    if (!['>', '<', '='].includes(operator)) {
      throw new Error(`Invalid operator: ${operator}`);
    }
    this.consumeToken();

    let rightOperand = this.currentToken();
    if (!this.isValidOperand(rightOperand)) {
      throw new Error(`Invalid operand: ${rightOperand}`);
    }
    this.consumeToken();

    return new Node("operand", null, null, {
      key: leftOperand,
      operator: operator,
      value: this.parseLiteral(rightOperand),
    });
  }

  currentToken() {
    return this.tokens[this.currentIndex];
  }

  consumeToken() {
    this.currentIndex++;
  }

  isValidOperand(token) {
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token) || !isNaN(token) || /^'.*'$/.test(token);
  }

  parseLiteral(token) {
    if (token.startsWith("'") && token.endsWith("'")) {
      return token.slice(1, -1); 
    }
    return Number(token);
  }
}

module.exports = Parser;