// Function to extract the data structure required for rule evaluation from the AST
const extractDataStructure = (astNode) => {
    const dataStructure = {};
  
    
    const traverseAST = (node) => {
      if (node.type === 'operand') {
        const { key, value } = node.value;
  
        
        let inferredType;
        if (typeof value === 'number') {
          inferredType = 'Number';
        } else if (typeof value === 'string') {
          inferredType = 'String';
        } else {
          inferredType = 'unknown'; 
        }
  
        
        dataStructure[key] = inferredType;
      }
  
      
      if (node.left) traverseAST(node.left);
      if (node.right) traverseAST(node.right);
    };
  
    traverseAST(astNode);
  
    return dataStructure;
  };
  
  module.exports = extractDataStructure;