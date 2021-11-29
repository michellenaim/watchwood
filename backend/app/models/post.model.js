const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    id: Number,
    title: String,
    author: String
});

module.exports = mongoose.model('Inventory', InventorySchema);