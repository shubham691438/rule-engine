const ASTNode =require('../models/ASTNodeModel')
const Tokenizer = require('../utils/tokenizer');
const Parser = require('../utils/parser');
const combineASTs = require('../utils/combineASTs');
const evaluateAST = require('../utils/evaluateAST');
const mongoose = require('mongoose');
const Rule = require('../models/RuleModel');
const extractDataStructure = require('../utils/extractDataStructure');

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
    const { rule, name } = req.body;

    // Check if a rule with the same name already exists
    const existingRule = await Rule.findOne({ name });
    if (existingRule) {
      return res.status(400).json({ message: 'Rule with this name already exists' });
    }

    // Tokenize the rule string
    const tokenizer = new Tokenizer(rule);
    const tokens = tokenizer.tokenize();

    // Parse the tokens into an AST
    const parser = new Parser(tokens);
    const ast = parser.parse();

    // Save the AST to MongoDB
    const savedAST = await saveASTNode(ast);

    // Extract the required data structure from the rule (if it's not provided)
    let extractedDataStructure =  extractDataStructure(ast);

    // Save the rule with name, reference to the AST, and the expected data structure
    const newRule = new Rule({
      name: name,
      astNode: savedAST._id,
      dataStructure: extractedDataStructure,
    });
    await newRule.save();

    res.json({ message: 'Rule parsed and saved!', rule: newRule });
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
    const { name,rulesIds } = req.body;
    console.log(name,rulesIds);

    // Fetch all rules by their IDs
    const rules = await Rule.find({ _id: { $in: rulesIds } });

    // Extract the `astNode` IDs from each rule
    const astNodeIds = rules.map((rule) => rule.astNode);
    
    // Fetch and recursively populate all AST nodes by their IDs
    const ruleASTs = await Promise.all(
      astNodeIds.map(async (id) => {
        const astNode = await ASTNode.findById(id).lean();
        return await populateASTRecursively(astNode);
      })
    );

    // Combine the ASTs
    const combinedAST = combineASTs(ruleASTs);


    // Save the combined AST to MongoDB
    const savedAST = await saveASTNode(combinedAST);

    // Extract the required data structure from the rule 
    let extractedDataStructure =  extractDataStructure(combinedAST);

    // Save the rule with name, reference to the AST, and the expected data structure
    const newRule = new Rule({
      name: name,
      astNode: savedAST._id,
      dataStructure: extractedDataStructure,
    });
    await newRule.save();

    res.json({ message: 'Rules combined and saved!', rule: newRule });
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
    const { ruleId, data } = req.body;  
    
    const rule = await Rule.findById(ruleId).lean();
    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }
    const astId = rule.astNode;

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

const getAllRules=async (req,res)=>{
  try{
    const rules=await Rule.find();
    res.json(rules);
  }catch(error){
    res.status(500).json({error:error.message});
  }
}



module.exports = {createRule, getRuleById,combineRules,evaluateRule,getAllRules};
