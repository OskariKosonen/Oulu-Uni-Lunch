const express = require('express');
const axios = require('axios');
const Menu = require('../models/Menu');

const router = express.Router();

// Fetch menu data from Jamix API
const fetchMenuFromJamix = async (customerID, kitchenID, menuType, date) => {
  const API_URL = `https://fi.jamix.cloud/apps/menuservice/rest/haku/menu/${customerID}/${kitchenID}?lang=fi`;
  const response = await axios.get(API_URL); // Fetch the menu data
  // Filter or process the response to include only data for the specific `menuType` and `date`
  return response.data;
};

// Fetch menu data from Poweresta API
const fetchMenuFromPoweresta = async (restaurant, menu, date) => {
  const API_URL = `https://api.fi.poweresta.com/publicmenu/dates/${restaurant}/?menu=${menu}&dates=${date}`;
  const response = await axios.get(API_URL); // Fetch the menu data
  // Process the response to match the required format
  return response.data;
};

// Route to get menu data by source
router.get('/menu', async (req, res) => {
  const { source, customerID, kitchenID, menuType, restaurant, menu, date } = req.query;

  if (!source || !date) {
    return res.status(400).json({ message: 'Source and date are required' });
  }

  try {
    let query = { source, date: new Date(date) }; // Base query with source and date

    // Add additional fields based on the source
    if (source === 'jamix') {
      if (!customerID || !kitchenID || !menuType) {
        return res.status(400).json({ message: 'customerID, kitchenID, and menuType are required for Jamix' });
      }
      query = { ...query, customerID, kitchenID, menuType };
    } else if (source === 'poweresta') {
      if (!restaurant || !menu) {
        return res.status(400).json({ message: 'restaurant and menu are required for Poweresta' });
      }
      query = { ...query, restaurant, menu };
    }

    // Query the database
    const menu = await Menu.findOne(query);

    if (menu) {
      res.json(menu.data); // Respond with the menu data
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu data', error });
  }
});

module.exports = router;
module.exports.fetchMenuFromJamix = fetchMenuFromJamix;
module.exports.fetchMenuFromPoweresta = fetchMenuFromPoweresta;
