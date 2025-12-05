const ruleService = require("./rule-service.service");

async function getRuleServices(req, res) {
  const ruleServices = await ruleService.getAllRuleServices();
  res.json(ruleServices);
}

async function addRuleService(req, res) {
  const newRuleService = await ruleService.createRuleService(req.body);
  res.json(newRuleService);
}

async function updateRuleService(req, res) {
  try {
    const updatedRuleService = await ruleService.updateRuleService(req.params.id, req.body);

    if (!updatedRuleService) {
      return res.status(404).json({ message: "RuleService not found" });
    }

    res.status(200).json(updatedRuleService);
  } catch (error) {
    res.status(500).json({ message: "Failed to update ruleService", error: error.message });
  }
}

async function deleteRuleService(req, res) {
  try {
  
    const deleteRuleService = await ruleService.deleteRuleService(req.params.id);
    
    if (!deleteRuleService) {
      return res.status(404).json({ message: "RuleService not found" });
    }

    res.status(200).json({ message: "Success delete ruleService" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete ruleService", error: error.message });
  }
}

module.exports = { getRuleServices, addRuleService, updateRuleService, deleteRuleService };
