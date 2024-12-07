const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  source: { type: String, required: true }, // 'jamix' or 'poweresta'
  customerID: { type: String, required: false }, // Only for Jamix
  kitchenID: { type: String, required: false }, // Only for Jamix
  menuType: { type: String, required: false }, // Only for Jamix
  restaurant: { type: String, required: false }, // Only for Poweresta
  menu: { type: String, required: false }, // Only for Poweresta
  date: { type: Date, required: true }, // Stored as Date type for easier range queries
  data: { type: mongoose.Schema.Types.Mixed, required: true }, // Holds the fetched menu data
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  versionKey: false // Disables the __v version field
});

module.exports = mongoose.model('Menu', MenuSchema);
