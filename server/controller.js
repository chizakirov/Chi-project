const model= require('./model.js');
const request = require("request");

module.exports = {
  
  getQuote: (req, res) => {
    // COMMENT: Move this to a constant
    request.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/batch?types=quote,news,chart&range=1m&last=10`, function(error, response, body) {
      // console.log('error', error);
      res.json(body);
    })
    
  },

  async placeOrderAsync: () => {
    try {
      const order = await model.Order.create(req.body);
    } catch (err) {
      res.json({ error: 'Unable to place a new order' });
      console.error(err); // COMMENT: Log this somewhere. Consider winston or some other logging utility
    }
  },

  placeOrder: (req, res) => {
    // COMMENT: Consider async await. Nested then statements are hard for others to follow
    try {
      const order = await model.Order.create(req.body);

      // do stuff with order
    } catch (err) {
      res.json({ error: 'Unable to place a new order' });
      console.error(err); // COMMENT: Log this somewhere. Consider winston or some other logging utility
    }


    

    model.Order.create(req.body)
      .then(order => {
          return model.Position.findOne({symbol: order.symbol})
      })
      .then(data => {
            if(data != null && order.type == 'buy' || order.type == 'buy cover'){
              // COMMENT: camelcase variables are more common practice- unless this is a mongo thing?
              let order_total = order.total;
              // console.log('BUY ORDER TOTAL', order_total);
              let order_quantity = order.quantity;
              // console.log('BUY ORDER QUANTITY', order_quantity);

              // COMMENT: I need a better understanding of this schema.
              // What happens if we throw an error after we create an order, and then we fail in decrementing?
              // Consider having some kind of rollback mechanism using transactions
              // https://docs.mongodb.com/manual/core/transactions/
              data.quantity += order_quantity;
              // console.log('BUY UPDATED POSITION quantity', data.quantity);
              data.total += order.total;
              // COMMENT: Remove commented out code
              // console.log('BUY UPDATED POSITION total', data.total);
              // COMMENT: Is this synchronous?
              data.save();
              res.json(order);
              
            }
            else if(data != null && order.type == 'sell' || order.type == 'sell short'){
              let order_total = order.total;
              // console.log('SELL ORDER TOTAL', order_total);
              let order_quantity = order.quantity;
              // console.log('SELL ORDER QUANTITY', order_quantity);
              data.quantity -= order_quantity;
              // console.log('SELL UPDATED POSITION quantity', data.quantity);
              data.total += order.total;
              // console.log('SELL UPDATED POSITION total', data.total);
              data.save();
              res.json(order);
              
            }

            // else if ()
            /**
             * COMMENT: Consider if (!data) {} else {}
             * 
             * Otherwise when you add another order.type conditional you have to do the same check, the next dev might forget and nulls could fall through
             */
            else if(data == null) {
              model.Position.create({symbol: order.symbol, quantity: order.quantity, total: order.total})
                .then(result => {
                  // console.log('NEW POSITION', result);
                  res.json(order);
                })
                .catch(err => res.json(err));
            }
          })
          // COMMENT: Do you want the client to know what the server error is? 
          // It might provide information about your code or schema that makes you more vulnerable, especially because you don't know what the error will look like necessarily.
          .catch(err => res.json(err));
        

      })
      .catch(err => res.json(err));
  },

  // why oneOrder vs. getOneOrder? I see getPoition down here
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
    // console.log('inside currentBalance function');
    model.Position.aggregate({$group: {_id: null, total: {$sum: $total}}})
      .then(data => {
        // console.log('POSITION TOTALS', data);
        res.json(data);
      })
      .catch(err => res.json(err));
  }
}