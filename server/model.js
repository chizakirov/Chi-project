const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/stock_simulator', {useNewUrlParser: true });

const OrderSchema = new mongoose.Schema({
  symbol: {type: String, required: [true, "Stock symbol is required"]},
  type: {type: String, required: [true, "Trade type is required"]},
  price: {type: Number, required: [true, "Price is required"]},
  quantity: {type: Number, required: [true, "Quantity is required"]},
  total: {type: Number},
  status: {type: String}
});

const PositionSchema = new mongoose.Schema({
  symbol: {type: String},
  quantity: {type: Number},
  total: {type: Number}
});

const Order= mongoose.model('Order', OrderSchema);
const Position = mongoose.model('Position', PositionSchema);
module.exports = {
  Order: Order,
  Position: Position,
}