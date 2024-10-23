// The evaluateAST function as is
const evaluateAST = (node, data) => {
    if (node.type === "operand") {
      const { key, operator, value } = node.value;
      const userValue = data[key];
      switch (operator) {
        case ">": return userValue > value;
        case "<": return userValue < value;
        case "=": return userValue == value;
        default: return false; // Handle unsupported operators
      }
    } else if (node.type === "operator") {
      const leftResult = evaluateAST(node.left, data);
      const rightResult = evaluateAST(node.right, data);
      return node.value === "AND" ? leftResult && rightResult : leftResult || rightResult;
    }
}

module.exports = evaluateAST;
