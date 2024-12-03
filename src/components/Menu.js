import React, { useState, useEffect, useCallback } from 'react';
import { fetchMenu } from '../api/menuService';
import './Menu.css';

const Menu = () => {
  const restaurantConfigs = [
    { customerID: '93077', kitchenID: '49', menuType: '111' },
    { customerID: '93077', kitchenID: '69', menuType: '84' },
    { customerID: '93077', kitchenID: '70', menuType: '118' },
    { customerID: '93077', kitchenID: '70', menuType: '119' },
  ];

  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(''); // Holds the currently selected date

  const handleFetchMenu = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    const allMenuData = [];

    try {
      for (const config of restaurantConfigs) {
        const { customerID, kitchenID, menuType } = config;
        console.log('Fetching menu with:', { customerID, kitchenID, menuType });
        const data = await fetchMenu(customerID, kitchenID, menuType);
        console.log('Fetched menu data:', data);
        allMenuData.push({ config, data });
      }
      setMenuData(allMenuData);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
      setError('Failed to fetch menu. Please check the IDs.');
    } finally {
      setLoading(false);
    }
  }, [restaurantConfigs]);

  const handleDayClick = (date) => {
    console.log('Button clicked, setting selected date:', date);
    setSelectedDate(date);
    handleFetchMenu(date);
  };

  // Weekdays calculation
  const weekdays = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai'];
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Start on Monday
  const weekDates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  });

  console.log('Week dates:', weekDates);

  return (
    <div>
      <h1>Oulu University Lunch Menu</h1>

      <div className="day-buttons">
        {weekDates.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(date)}
            disabled={selectedDate === date}
          >
            {weekdays[index]}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Display menu data in card format */}
      {menuData.length > 0 && (
        <div className="card-container">
          {menuData.map(({ config, data }, index) => (
            <div className="card" key={index}>
              <h3>{`${data[0]?.kitchenName}`}</h3>
              {data[0]?.menuTypes.map((menuType) => {
                console.log('Processing menuType:', menuType);
                return menuType.menus.map((menu) => {
                  return menu.days
                    .filter((day) => {
                      console.log('Filtering day:', day);
                      return day.date === parseInt(selectedDate.replace(/-/g, ''));
                    })
                    .map((day) => {
                      console.log('Processing day:', day);
                      return day.mealoptions.map((meal) => (
                        <div key={meal.id}>
                          <h4>{meal.name}</h4>
                          <ul>
                            {meal.menuItems.map((item) => (
                              <li key={item.orderNumber}>
                                <strong>{item.name}</strong> - {item.diets}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ));
                    });
                });
              })}
            </div>
          ))}
        </div>
      )}

      {/* Fallback message */}
      {!loading && menuData.length === 0 && <p>No menu available for the selected day.</p>}
    </div>
  );
};

export default Menu;