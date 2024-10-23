const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  astNode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ASTNode',
    required: true,
  },
  dataStructure: {
    type: Object, // Define the expected structure of the data, e.g. {"age": "Number", "department": "String"}
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Rule', RuleSchema);
