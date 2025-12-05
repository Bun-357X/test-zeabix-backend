const RuleService = require("./rule-service.model");

async function getAllRuleServices(raw = false) {
  return await RuleService.findAll({where: { delete_flag: false }, raw: raw});
}

async function createRuleService(data) {
  return await RuleService.create(data);
}

async function updateRuleService(id, data) {

  let updatedRuleServices = null
  let updatedCount= await RuleService.update(data, {
    where: { id },
  });

  if (updatedCount > 0) {
    updatedRuleServices = await RuleService.findByPk(id);

  }
  return updatedRuleServices
}

async function deleteRuleService(id) {

  let deleteCount= await RuleService.update({"delete_flag": true}, {
    where: { id },
  });
  return deleteCount
}

module.exports = { getAllRuleServices, createRuleService, updateRuleService,deleteRuleService };
