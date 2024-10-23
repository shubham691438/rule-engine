

function evaluateAST(node, data) {
  if (node.type === "operand") {
    const { key, operator, value } = node.value;

    // Check if the data contains the required key
    if (!(key in data)) {
      throw new Error(`Data is missing the required key: ${key}`);
    }

    const userValue = data[key];

    // Ensure the user value is compatible with the comparison
    if (typeof userValue !== typeof value) {
      throw new Error(`Type mismatch between data (${typeof userValue}) and rule (${typeof value}) for key: ${key}`);
    }

    // Evaluate the comparison
    switch (operator) {
      case ">": return userValue > value;
      case "<": return userValue < value;
      case "=": return userValue == value;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  } else if (node.type === "operator") {
    const leftResult = evaluateAST(node.left, data);
    const rightResult = evaluateAST(node.right, data);
    return node.value === "AND" ? leftResult && rightResult : leftResult || rightResult;
  }
}

module.exports = evaluateAST;
