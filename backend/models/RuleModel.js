const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  astNodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ASTNode',  // Referencing the ASTNode model
    required: true,
  },
});

module.exports = mongoose.model('Rule', RuleSchema);
