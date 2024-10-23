const router = require('express').Router();
const { createRule, getRuleById,combineRules,evaluateRule,getAllRules } = require('../controllers/ruleEngineController');

router.post('/create-rule', createRule);
router.post('/combine-rules', combineRules);
router.get('/get-rule/:id', getRuleById);
router.post('/evaluate-rule', evaluateRule);
router.get('/get-all-rules', getAllRules);

module.exports = router;


