import axios from 'axios';

export const fetchMenu = async (customerID, kitchenID, menuType = '') => {
  const API_URL = `https://fi.jamix.cloud/apps/menuservice/rest/haku/menu/${customerID}/${kitchenID}?lang=fi`;

  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};
