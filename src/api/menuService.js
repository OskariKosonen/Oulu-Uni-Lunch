import axios from 'axios';

export const fetchMenuFromBackend = async (source, customerID, kitchenID, restaurant, menu, date) => {
  const API_URL = `http://localhost:5000/api/menu?source=${source}&customerID=${customerID}&kitchenID=${kitchenID}&restaurant=${restaurant}&menu=${menu}&date=${date}`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu from backend:', error);
    throw error;
  }
};