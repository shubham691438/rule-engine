const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a node in the AST
const astNodeSchema = new Schema({
  type: {
    type: String,
    enum: ['operator', 'operand'],  // The node type can either be 'operator' or 'operand'
    required: true
  },
  value: {
    type: Schema.Types.Mixed,  // Can be a string (AND/OR) for operators, or an object for operands
    required: false  // Optional for nodes like operators
  },
  left: {
    type: Schema.Types.ObjectId,
    ref: 'ASTNode',  // Recursive reference to the left child node
    required: false
  },
  right: {
    type: Schema.Types.ObjectId,
    ref: 'ASTNode',  // Recursive reference to the right child node
    required: false
  }
});


module.exports = mongoose.model('ASTNode', astNodeSchema);;
