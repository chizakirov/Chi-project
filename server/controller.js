const model= require('./model.js');
const request = require("request");

module.exports = {
  
  getQuote: (req, res) => {
    request.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/batch?types=quote,news,chart&range=1m&last=10`, function(error, response, body) {
      // console.log('error', error);
      res.json(body);
    })
    
  },

  placeOrder: (req, res) => {
    model.Order.create(req.body)
      .then(order => {
  
          model.Position.findOne({symbol: order.symbol})
          .then(data => {
            if(data != null && order.type == 'buy' || order.type == 'buy cover'){
              let order_total = order.total;
              console.log('BUY ORDER TOTAL', order_total);
              let order_quantity = order.quantity;
              console.log('BUY ORDER QUANTITY', order_quantity);
              data.quantity += order_quantity;
              console.log('BUY UPDATED POSITION quantity', data.quantity);
              data.total += order.total;
              console.log('BUY UPDATED POSITION total', data.total);
              data.save();
              res.json(order);
              
            }
            else if(data != null && order.type == 'sell' || order.type == 'sell short'){
              let order_total = order.total;
              console.log('SELL ORDER TOTAL', order_total);
              let order_quantity = order.quantity;
              console.log('SELL ORDER QUANTITY', order_quantity);
              data.quantity -= order_quantity;
              console.log('SELL UPDATED POSITION quantity', data.quantity);
              data.total += order.total;
              console.log('SELL UPDATED POSITION total', data.total);
              data.save();
              res.json(order);
              
            }
            else if(data == null) {
              model.Position.create({symbol: order.symbol, quantity: order.quantity, total: order.total})
                .then(result => {
                  console.log('NEW POSITION', result);
                  res.json(order);
                })
                .catch(err => res.json(err));
            }
          })
          .catch(err => res.json(err));
        

      })
      .catch(err => res.json(err));
  },

  oneOrder: (req, res) => {
    model.Order.find({})
      .then(data => {
        for(let i = 0; i< data.length; i++){
          res.json(data[data.length-1]);
        }
      })
      .catch(err => res.json(err));
  },

  getPosition: (req, res) => {
    model.Position.find({symbol: req.params.symbol})
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  postPosition: (req, res) => {
    // console.log(req.body);
    model.Position.create(req.body)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  allPositions: (req, res) => {
    model.Position.find()
      .then(data => {
        res.json(data)
      })
      .catch(err => res.json(err));
  },

  currentBalance: (req, res) => {
    console.log('inside currentBalance function');
    model.Position.aggregate({$group: {_id: null, total: {$sum: $total}}})
      .then(data => {
        console.log('POSITION TOTALS', data);
        res.json(data);
      })
      .catch(err => res.json(err));
  }
}