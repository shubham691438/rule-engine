

class Tokenizer {
  constructor(ruleString) {
    this.ruleString = ruleString;
    this.currentIndex = 0;
    this.tokens = [];
    this.operators = ['>', '<', '=', 'AND', 'OR', '(', ')'];
  }

  // Tokenize the rule string with error handling
  tokenize() {
    const regex = /\s*(=>|>=|<=|[><=()]|AND|OR|[a-zA-Z_][a-zA-Z0-9_]*|\d+|'[^']+')\s*/g;
    let match;
    while (match = regex.exec(this.ruleString)) {
      const token = match[0].trim();

      // Check for invalid tokens
      if (!this.isValidToken(token)) {
        throw new Error(`Invalid token encountered: ${token}`);
      }

      this.tokens.push(token);
    }
    
    // Ensure the token list is not empty
    if (this.tokens.length === 0) {
      throw new Error('No valid tokens found in the rule string.');
    }

    return this.tokens;
  }

  // Validate tokens
  isValidToken(token) {
    const validOperators = ['>', '<', '=', 'AND', 'OR', '(', ')'];
    const isOperator = validOperators.includes(token);
    const isNumber = !isNaN(token);
    const isString = /^'[a-zA-Z0-9_]*'$/.test(token);  
    const isVariable = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token);  

    return isOperator || isNumber || isString || isVariable;
  }
}

module.exports = Tokenizer;