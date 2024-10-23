
const Node = require('./node');

// Function to count operators (AND/OR) in the AST
const countOperators = (node, operatorCount) => {
    if (node.type === 'operator') {
      operatorCount[node.value] += 1;
      if (node.left) countOperators(node.left, operatorCount);
      if (node.right) countOperators(node.right, operatorCount);
    }
  };

// Function to combine multiple ASTs using the most frequent operator
const combineASTs = (ruleASTs) => {
    let operatorCount = { AND: 0, OR: 0 };
  
    // Count operators in each AST
    ruleASTs.forEach((ast) => {
      countOperators(ast, operatorCount);
    });
  
    // Determine the most frequent operator
    const mostFrequentOperator = operatorCount.AND > operatorCount.OR ? 'AND' : 'OR';
  
    // Combine the ASTs using the most frequent operator
    let combinedAST = null;
    for (const ruleAST of ruleASTs) {
      if (!combinedAST) {
        combinedAST = ruleAST;
      } else {
        combinedAST = new Node('operator', combinedAST, ruleAST, mostFrequentOperator);
      }
    }
  
    return combinedAST;
  };


  module.exports =  combineASTs ;
  