const controller = require("./controller.js");
const path = require("path");

module.exports = function(app){
  // COMMENT: Add a session check. You can do this with express middleware. Or just add a comment that you plan to do this.
  // TODO: implement
  app
    .get('/api/stock/:symbol', controller.getQuote)
    .get('/api/position/:symbol', controller.getPosition)
    .get('/api/position', controller.allPositions)
    .post('/api/position', controller.postPosition)

    // .get('api/stock/orders', controller.allOrders)
    .get('/api/order/', controller.oneOrder)
    .post('/api/order/', controller.placeOrder)
    .get('/api/account', controller.currentBalance)
    .all("*", (req,res,next) => {
      res.sendFile(path.resolve("./public/dist/public/index.html"));
    });
}

