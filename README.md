# Oulu University Lunch Menu App 🍔

**Oulu University Lunch Menu App** is a React application that displays the lunch menus for various restaurants at Oulu University. The app fetches menu data from Jamix and Poweresta APIs (Juvenes & Uniresta) and presents it in a user-friendly format.

---

## Features

- Fetches and displays lunch menus from **Jamix** and **Poweresta** APIs.
- **Responsive design** for mobile and desktop views.
- **Retry mechanism** for failed API requests.
- Displays menus in a **card format** with detailed meal options.
- **Day buttons** to navigate through the week's menu.
- **Dark mode** toggle for better user experience in low-light environments.

---

## Technologies Used

- **React** – A JavaScript library for building user interfaces.
- **Axios** – A promise-based HTTP client for the browser and Node.js.
- **CSS** – Styling the application for a responsive design.
- **Express** – A web application framework for Node.js.
- **Mongoose** – An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Node-cron** – A task scheduler for Node.js.

---

## API Endpoints

### Jamix API

**Endpoint:**  
`https://fi.jamix.cloud/apps/menuservice/rest/haku/menu/{customerID}/{kitchenID}?lang=fi`

**Parameters:**

- `customerID`: The customer ID.
- `kitchenID`: The kitchen ID.

---

### Poweresta API

**Endpoint:**  
`https://api.fi.poweresta.com/publicmenu/dates/{restaurant}/?menu={menu}&dates={date}`

**Parameters:**

- `restaurant`: The restaurant identifier.
- `menu`: The menu identifier.
- `date`: The date in YYYY-MM-DD format.

---
