import axios from 'axios';

export const fetchMenuFromBackend = async (customerID, kitchenID, menuType, date) => {
  const API_URL = `http://localhost:5000/api/menu?customerID=${customerID}&kitchenID=${kitchenID}&menuType=${menuType}&date=${date}`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu from backend:', error);
    throw error;
  }
};