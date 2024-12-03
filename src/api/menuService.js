import axios from 'axios';

export const fetchMenuFromJamix = async (customerID, kitchenID, menuType = '') => {
  const API_URL = `https://fi.jamix.cloud/apps/menuservice/rest/haku/menu/${customerID}/${kitchenID}?lang=fi`;

  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

export const fetchMenuFromPoweresta = async (restaurant, menu, date) => {
  const API_URL = `https://api.fi.poweresta.com/publicmenu/dates/${restaurant}/?menu=${menu}&dates=${date}`;

  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu from Poweresta:', error);
    throw error;
  }
};
