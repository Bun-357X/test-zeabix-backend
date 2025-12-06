const request = require("supertest");
const app = require("../../src/app");
const seedDatabase = require("../../scripts/seed-database");
const sequelize = require("../../src/config/database");
const path = require("path");

let token = null

jest.setTimeout(10000);

beforeAll(async () => {

  await seedDatabase(); // create admin test user

  // login to get token
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "1234" });

  token = res.body.token;
  console.log("token: ", token);
  
});

// test add rule TimeWindowPromotion
describe("POST /api/rule-services", () => {
  it("should return 200", async () => {

    const payload = {
    type: "TimeWindowPromotion",
    priority: 1,
    effective_from: "2025-12-01",
    effective_to: "2025-12-31",
    is_active: true,
    config_data: 
    {
        start_time: "18:00",
        end_time: "23:00",
        price_mulit: "0.9"
    }
    };

    const res = await request(app)
      .post("/api/rule-services")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    //expect(res.body).toHaveProperty("success", true);
    
    expect(res.body).toEqual(expect.objectContaining({
      type: payload.type,
      priority: payload.priority,
      is_active: payload.is_active,
      config_data: payload.config_data
    }));
  });
});

// test add rule RemoteAreaSurcharge
describe("POST /api/rule-services", () => {
  it("should return 200", async () => {

    const payload = {
      "type": "RemoteAreaSurcharge",
      "priority": 2,
      "effective_from": "2025-12-01",
      "effective_to": "2025-12-31",
      "is_active": true,
      "config_data": 
      {
        "list_codes": [
          10110, 10120, 10140, 10150, 10160, 10170,
          10100, 10200, 10210, 10220, 10230, 10240,
          10250, 10260, 10300, 10310, 10320, 10330,
          10400, 10500, 10510, 10520, 10530, 10600,
          10700, 10800, 10900
        ],
        "price_mulit": "0.9"
      }
    }

    const res = await request(app)
      .post("/api/rule-services")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    //expect(res.body).toHaveProperty("success", true);
    
    expect(res.body).toEqual(expect.objectContaining({
      type: payload.type,
      priority: payload.priority,
      is_active: payload.is_active,
      config_data: payload.config_data
    }));
  });
});

// test add rule WeightTier
describe("POST /api/rule-services", () => {
  it("should return 200", async () => {

    const payload = {
      "type": "WeightTier",
      "priority": 0,
      "effective_from": "2025-12-01",
      "effective_to": "2025-12-31",
      "is_active": true,
      "config_data": 
      {
        "tiers": [
          { "gte": 0, "lt": 500, "price": 25 },
          { "gte": 500, "lt": 2000, "price": 75 },
          { "gte": 2000, "lt": 10000, "price": 200 }
        ],
        "price_mulit": "1"
      }
    }

    const res = await request(app)
      .post("/api/rule-services")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    //expect(res.body).toHaveProperty("success", true);
    
    expect(res.body).toEqual(expect.objectContaining({
      type: payload.type,
      priority: payload.priority,
      is_active: payload.is_active,
      config_data: payload.config_data
    }));
  });
});


// test caculate price buy json
describe("POST /api/quotes/price", () => {
  it("should return 200", async () => {

    const payload = {
      "payload": 100,
      "post_code": 0,
    }
    const res = await request(app)
      .post("/api/quotes/price")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    //expect(res.body).toHaveProperty("success", true);
    
    expect(res.body).toEqual(expect.objectContaining({
      message: "Success caculate price from payload",
      data: {
        price: 25,
        rule_use: ['WeightTier'],
        job_id: null,// one job not have
      }
    }));
  });
});

// test caculate price buy json 2  discount by RemoteAreaSurcharge
describe("POST /api/quotes/price", () => {
  it("should return 200", async () => {

    const payload = {
      "payload": 100,
      "post_code": 10900,
    }
    const res = await request(app)
      .post("/api/quotes/price")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    
    expect(res.body).toEqual(expect.objectContaining({
      message: "Success caculate price from payload",
      data: {
        price: 22.5,
        rule_use: ['WeightTier', 'RemoteAreaSurcharge'],
        job_id: null,// one job not have
      }
    }));
  });
});

// test caculate price csv file 
let job_id = null
describe("POST /api/quotes/bulk", () => {
  it("should upload CSV and return 200", async () => {

    const csvPath = path.join(__dirname, "../test-file/bulkPrice1.csv");

    const res = await request(app)
      .post("/api/quotes/bulk")
      .set("Authorization", `Bearer ${token}`)
      .attach("file", csvPath)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("job_id");
    expect(typeof res.body.job_id).toBe("number");

    job_id = res.body.job_id
    console.log("job_id: ", job_id);
    
  });
});


// test use job_id to get data bulk-job
describe("GET /api/jobs", () => {
  it("should return 200", async () => {

    const res = await request(app)
      .get(`/api/jobs/${job_id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200);
    
    expect(res.body).toEqual(expect.objectContaining({
      id: job_id,
      status: true,
      result_data: [
        {
          "message":"Success caculate price from payload",
          "data":{
            "price":22.5,
            "rule_use":["WeightTier","RemoteAreaSurcharge"],
            "job_id":1
          }
        },
        {
          "message":"Success caculate price from payload",
          "data":{
            "price":200,
            "rule_use":["WeightTier"],
            "job_id":1
          }
        }
      ]
    }));
  });
});


// test health
describe("GET /api/health", () => {
  it("should return 200", async () => {

    const res = await request(app)
      .get(`/api/health`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200);
    
    expect(res.body).toEqual(expect.objectContaining({
      status: true,
    }));
  });
});


afterAll(async () => {
  // wait 5 seconds for bulk-job
  await new Promise(resolve => setTimeout(resolve, 5000));
  await sequelize.close();
});