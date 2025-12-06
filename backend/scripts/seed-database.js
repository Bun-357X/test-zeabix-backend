
const User = require('../src/modules/user/user.model');
const bcrypt = require('bcryptjs'); 
const sequelize = require('../src/config/database');

async function seedDatabase() {
  try {
    
    await sequelize.sync({ force: true });

    console.log('Database synced. Seeding data...');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword1 = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    await User.bulkCreate([
    {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword1,
    }
    ]);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    //
    // await sequelize.close(); 
  }
}

module.exports = seedDatabase;
