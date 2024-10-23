const ASTNode =require('../models/ASTNodeModel')
const Tokenizer = require('../utils/tokenizer');
const Parser = require('../utils/parser');
const combineASTs = require('../utils/combineASTs');
const evaluateAST = require('../utils/evaluateAST');
const mongoose = require('mongoose');

// Function to recursively save AST nodes to MongoDB
const saveASTNode = async (astNode) => {
  const newNode = new ASTNode({
    type: astNode.type,
    value: astNode.value,
    left: astNode.left ? await saveASTNode(astNode.left) : null,
    right: astNode.right ? await saveASTNode(astNode.right) : null,
  });
  return newNode.save();
};


// Controller to parse and save AST from rule string
const createRule = async (req, res) => {
  try {
    const { rule } = req.body;

    // Tokenize the rule
    const tokenizer = new Tokenizer(rule);
    const tokens = tokenizer.tokenize();

    // Parse the tokens into an AST
    const parser = new Parser(tokens);
    const ast = parser.parse();

    // Save the AST to MongoDB
    const savedAST = await saveASTNode(ast);

    res.json({ message: 'Rule parsed and saved!', astId: savedAST._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to retrieve AST by ID
const getRuleById = async (req, res) => {
  try {
    const ast = await ASTNode.findById(req.params.id).populate('left right');
    if (!ast) return res.status(404).json({ message: 'AST not found' });
    res.json(ast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to combine multiple rules into a single AST
const combineRules = async (req, res) => {
  try {
    const { rules } = req.body;

    // Parse each rule and generate its AST
    const ruleASTs = await Promise.all(
      rules.map(async (rule) => {
        const tokenizer = new Tokenizer(rule);
        const tokens = tokenizer.tokenize();
        const parser = new Parser(tokens);
        return parser.parse();
      })
    );

    // Combine the ASTs
    const combinedAST = combineASTs(ruleASTs);

    // Save the combined AST to MongoDB
    const savedAST = await saveASTNode(combinedAST);

    res.json({ message: 'Rules combined and saved!', astId: savedAST._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Recursive function to populate the left and right nodes
const populateASTRecursively = async (astNode) => {
  if (!astNode) return null;

  // Check if `left` is a reference (ObjectId), then populate it
  if (astNode.left && mongoose.Types.ObjectId.isValid(astNode.left)) {
    astNode.left = await ASTNode.findById(astNode.left).lean(); // Populate and return as plain JS object
    astNode.left = await populateASTRecursively(astNode.left);  // Recursively populate its children
  }

  // Check if `right` is a reference (ObjectId), then populate it
  if (astNode.right && mongoose.Types.ObjectId.isValid(astNode.right)) {
    astNode.right = await ASTNode.findById(astNode.right).lean(); // Populate and return as plain JS object
    astNode.right = await populateASTRecursively(astNode.right);  // Recursively populate its children
  }

  return astNode;
};


// Controller to evaluate AST based on data
const evaluateRule = async (req, res) => {
  try {
    const { astId, data } = req.body;  

    // Fetch the AST by ID from MongoDB
    let ast = await ASTNode.findById(astId).lean();  
    if (!ast) {
      return res.status(404).json({ message: 'AST not found' });
    }

    // Recursively populate left and right nodes
    ast = await populateASTRecursively(ast);

    // Evaluate the AST based on the provided data
    const result = evaluateAST(ast, data);

    // Return the result
    res.json({ message: 'AST evaluated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {createRule, getRuleById,combineRules,evaluateRule};
