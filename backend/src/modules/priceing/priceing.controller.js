const ruleService = require("../rule-service/rule-service.service");
const bulkJobService = require("../bulk-job/bulk-job.service")

// caculate one json
async function caculatePrice(req, res) {
  return caculatePriceOneJob(req, res)
}

// caculate array json
async function caculatePriceBulk(req, res) {
  // create job
  let obj_job = await bulkJobService.createBulkJob({})
  console.log("obj_job: ", obj_job);
  res.json({job_id: obj_job.id})
  
  //return caculatePriceOneJob(req, res)
  caculatePriceOneJob(req=req, res=null, job_id=obj_job.id);
}

async function caculatePriceOneJob(req, res=null, job_id=null) {
  let json_inputs = req.body
  let output_price = 0;
  let message_result = "Not found rule"
  let over_payload_limit = false

  let list_bulk_json_output = []
  /*
  {
    "payload": 1000,
    "post_code": 10900,
  }
  // 
  */
  if (res!=null) {
    json_inputs = [json_inputs]
  }
  // get all list rule and sort buy priority
  // WeightTier will priority first (priority = 0)
  let list_rules = await ruleService.getAllRuleServices(raw=true);
  // sort asc
  list_rules.sort((a, b) => (a.priority > b.priority ? 1 : -1));
  //console.log("list_rules: ",list_rules);
  for (const json_input of json_inputs) {
    let rule_use = []
    // loop caculate price
    if (list_rules.length > 0) {
      
      for (let obj_rule of list_rules) {
        //console.log("obj_rule: ",obj_rule);
        if (obj_rule.type.startsWith("WeightTier") && obj_rule.priority == 0 && obj_rule.is_active == true) {
          // check now is between
          let date_now = new Date();
          if (checkBetweenTwodate(date_now, obj_rule.effective_from, obj_rule.effective_to)) {
            // can use this rule
            // loop config_data
            let json_config_data = JSON.parse(obj_rule.config_data)
            // sort desc
            json_config_data.tiers.sort((a, b) => (a.lt < b.lt ? 1 : -1));
            for (const obj_tier of json_config_data.tiers) {
              //console.log("obj_tier: ",obj_tier);
              if (json_input.payload > obj_tier.lt) {
                console.log("payload over: ",json_input.payload);
                over_payload_limit = true
              } else {
                over_payload_limit = false
                if (json_input.payload >= obj_tier.gte && json_input.payload <= obj_tier.lt) {
                  // found range
                  output_price = obj_tier.price
                  console.log("WeightTier output_price: ", output_price);
                  rule_use.push(obj_rule.type)
                  break
                }
              }
          
            }
          }
        }
        // success caculate by WeightTier
        //
        if (obj_rule.priority > 0 && obj_rule.is_active == true) {
          if (obj_rule.type.startsWith("TimeWindowPromotion")){
            // check now is between
            let date_now = new Date();
            if (checkBetweenTwodate(date_now, obj_rule.effective_from, obj_rule.effective_to)) {
              // can use this rule
              let json_config_data = JSON.parse(obj_rule.config_data)
              
              let start_time_str = json_config_data.start_time.split(":")
              let start_time_hour = parseInt(start_time_str[0])
              let start_time_minute = parseInt(start_time_str[1])

              let end_time_str = json_config_data.end_time.split(":")
              let end_time_hour = parseInt(end_time_str[0])
              let end_timee_minute = parseInt(end_time_str[1])

              let today_start_time = new Date()
              today_start_time.setHours(start_time_hour, start_time_minute, 0, 0)

              let today_end_time = new Date()
              today_end_time.setHours(end_time_hour, end_timee_minute, 0, 0)

              // check now is in TimeWindowPromotion
              if (checkBetweenTwodate(date_now, today_start_time, today_end_time)) {
                //
                if (output_price > 0) {
                  output_price = output_price * json_config_data.price_mulit
                  console.log("TimeWindowPromotion output_price: ", output_price);
                  rule_use.push(obj_rule.type)
                }
              }
            }
          } else if (obj_rule.type.startsWith("RemoteAreaSurcharge")) {
            // check now is between
            let date_now = new Date();
            if (checkBetweenTwodate(date_now, obj_rule.effective_from, obj_rule.effective_to)) {
              // can use this rule
              let json_config_data = JSON.parse(obj_rule.config_data)

              if (json_config_data.list_codes.includes(json_input.post_code)) {
                // found post_code in this rule
                if (output_price > 0) {
                  output_price = output_price * json_config_data.price_mulit
                  console.log("RemoteAreaSurcharge output_price: ", output_price);
                  rule_use.push(obj_rule.type)
                }
              }
            }
          }
        }
        //
      }
    }
    //const ruleServices = await ruleService.getAllRuleServices();
    //res.json(ruleServices);
    if (over_payload_limit) {
      message_result = "Fail caculate price from payload: payload over weigth"
    } else {
      message_result = "Success caculate price from payload"
    }
    let json_output = {
      "message": message_result,
      "data": {
        "price": output_price,
        "rule_use": rule_use,
        "job_id": job_id
      }
    }


    if (res==null) {
      list_bulk_json_output.push({...json_output})
      
    } else {
      res.json(json_output);
    }
    //
  }
  // end loop json_inputs
  if (res==null && job_id != null) {
      // update job status
      let update_job = {
        "status": true,
        "result_data": list_bulk_json_output
      }
      const updatedBulkJob = await bulkJobService.updateBulkJob(job_id, update_job);
      console.log('do job success: ', job_id);
    }
}

function checkBetweenTwodate(date_check, date_from, date_to) {
  let from = new Date(date_from);
  let to = new Date(date_to);
  let check = new Date(date_check);
  let resulte = false
  if (check >= from && check <= to) {
    resulte = true
  }
  return resulte
}

module.exports = { caculatePrice , caculatePriceBulk};
