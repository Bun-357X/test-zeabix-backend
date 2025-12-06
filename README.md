seed data : npm run test
if all test past simple data will seeded.

run project: npm run start
swagger-ui open http://localhost:9000/api-docs  

ตัวอย่างข้อมูล csv file in backend\tests\test-file\bulkPrice1.csv
ตัวอย่างข้อมูล json คำนวณ priceing
{
  "payload": 0,
  "post_code": 0
}

รันเทส : npm run test
รันแบบออโต้อัพเดทเมื่อแก้ไขโค้ด: npm run dev
รันตามปกติ: npm run start

run บน docker
ถ้าทดสอบ monut docker ในเครื่องตัวเองที่เพิ่ง dev ต้องลบ node_modules ก่อน
ออกจาก backend แล้ว build docker ด้วย: docker-compose build --no-cache
สั่งรัน docker แบบเบื้องหลังด้วย: docker-compose up -d
เช็ค docker ว่ารันได้ไหมด้วย: docker ps  
จะเจอ container name backend-Zeabix
ดู log docker รัน: docker-compose logs -f
