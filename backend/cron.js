const cron = require('node-cron');
const mongoose = require('mongoose');
const Menu = require('./models/Menu');
const { fetchMenuFromJamix, fetchMenuFromPoweresta } = require('./routes/menu');
const { getWeekdayDates } = require('./utils/dateUtils');
require('dotenv').config();

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Define the restaurant configurations
const restaurantConfigs = [
  { customerID: '93077', kitchenID: '49', menuType: '111', source: 'jamix' },
  { customerID: '93077', kitchenID: '69', menuType: '84', source: 'jamix' },
  { customerID: '93077', kitchenID: '70', menuType: '118', source: 'jamix' },
  { customerID: '93077', kitchenID: '70', menuType: '119', source: 'jamix' },
  { restaurant: 'julinia', menu: 'ravintolajulinia', source: 'poweresta' },
  { restaurant: 'lipasto', menu: 'ravintolalipasto', source: 'poweresta' },
];

const fetchAndStoreMenuData = async () => {
  console.log('Starting fetchAndStoreMenuData');
  const dates = getWeekdayDates(); // Get the next 5 weekday dates
  for (const config of restaurantConfigs) {
    for (const date of dates) {
      let data;

      if (config.source === 'jamix') {
        const { customerID, kitchenID, menuType } = config;

        // Fetch menu data from Jamix
        try {
          data = await fetchMenuFromJamix(customerID, kitchenID, menuType, date);
          console.log(`Fetched data from Jamix for ${date}:`, data);
        } catch (error) {
          console.error(`Error fetching data from Jamix for ${date}:`, error);
          continue;
        }

        // Update or insert into the database
        try {
          await Menu.findOneAndUpdate(
            {
              source: 'jamix',
              customerID,
              kitchenID,
              menuType,
              date: new Date(date), // Store as Date type
            },
            {
              source: 'jamix',
              customerID,
              kitchenID,
              menuType,
              date: new Date(date),
              data,
            },
            { upsert: true }
          );
          console.log(`Inserted/Updated data in MongoDB for ${date}`);
        } catch (error) {
          console.error(`Error inserting/updating data in MongoDB for ${date}:`, error);
        }
      } else if (config.source === 'poweresta') {
        const { restaurant, menu } = config;

        // Fetch menu data from Poweresta
        try {
          data = await fetchMenuFromPoweresta(restaurant, menu, date);
          console.log(`Fetched data from Poweresta for ${date}:`, data);
        } catch (error) {
          console.error(`Error fetching data from Poweresta for ${date}:`, error);
          continue;
        }

        // Update or insert into the database
        try {
          await Menu.findOneAndUpdate(
            {
              source: 'poweresta',
              restaurant,
              menu,
              date: new Date(date), // Store as Date type
            },
            {
              source: 'poweresta',
              restaurant,
              menu,
              date: new Date(date),
              data,
            },
            { upsert: true }
          );
          console.log(`Inserted/Updated data in MongoDB for ${date}`);
        } catch (error) {
          console.error(`Error inserting/updating data in MongoDB for ${date}:`, error);
        }
      }
    }
  }
};

// Schedule the task to run every 6 hours
cron.schedule('0 */6 * * *', fetchAndStoreMenuData);

// Immediately fetch and store menu data on server start
fetchAndStoreMenuData().then(() => {
  console.log('Initial data fetch complete');
}).catch((error) => {
  console.error('Error during initial data fetch:', error);
});