var connection = require("../../config/database.config.js");
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Mh4KWSBydLR7Jg38wALQMsQmLtMfKkeMJ5u8iWN4g6A5xp2ZvtvSKXGooLtDY09aXJRcUf5Kn83CpGQZVuCoqR6006HiCnbFn');

exports.getPaymentPlans = (req, res) => {
    let plans = 'SELECT * FROM payment_plans';
    connection.query(plans , function(error , results){
            if(error){
                res.status(500).send({ status: 500, message: "Error Race analytics"});
                  console.log("Error getting Race analytics:" + error);
            }else{
                if (results.length > 0) {        
                    res.status(200).send(results);
                  } else {
                    res.status(200).send({ status: 200,data: null , message: 'No record found'});
                  }
            }
    })

}

exports.oneTimePayment = (req , res) => {
  stripe.charges.create({
    amount: 10,
    currency: "usd",
    source: "tok_visa", 
    description: "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)"
  }, {
    idempotencyKey: "ZAPwBlW9Sz1RbZCx"
  }, function(err, charge) {

      if(err){
        res.status(500).send({ status: 500, error: err ,  message: "Error Race analytics"});
      }else{
        res.status(200).send(charge);
        // return charge;
      }
    // asynchronously called
  });
}



exports.createPlan = async (req , res) => {
  const plan = await stripe.plans.create({
      amount: 20,
      currency: 'usd',
      interval: 'month',
      product: 'prod_NRoeNhREJSgAwX',
  });
}
// const plan = await stripe.plans.retrieve(
//   'price_1Mgv1K2eZvKYlo2Ca4l18gvZ'
// );


// const plan = await stripe.plans.update(
//   'price_1Mgv1K2eZvKYlo2Ca4l18gvZ',
//   {metadata: {order_id: '6735'}}
// );
// Specifies billing frequency. Either day, week, month or year.
// const deleted = await stripe.plans.del(
//   'price_1Mgv1K2eZvKYlo2Ca4l18gvZ'
// );