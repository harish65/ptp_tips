var connection = require("../../config/database.config.js");

// This is your test secret API key.
const stripe = require("stripe")("sk_test_beAPffHK4BvYSbs4Wx1Tzgni00ZqrsiBBk");
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
// const endpointSecret = "whsec_f6833212e1eaa389561726166e508150564213fed6662e72a2791772a8f17e8f";
const endpointSecret = "whsec_OW5JJYRAvDqCSrpUaD9uEUujVi7uLo3a";

exports.stripeWebhook = async (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log("helllooooooooo");
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  // console.log(event);
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case "checkout.session.completed":
      connection.query(
        "SELECT plan_id FROM stripe_plan WHERE prod_id = ?",
        [event.data.object.metadata.product_id],
        function (err, rsl, field) {
          if (err) {
            console.log(err);
          } else {
            console.log(rsl);
            const plan_id = rsl[0].plan_id;
            connection.query(
              "INSERT INTO client_transaction (client_id, plan_id, created_at, amount, currency, paid_status, payment_method_id, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
              [
                event.data.object.metadata.client_id,
                plan_id,
                new Date(event.data.object.created * 1000),
                event.data.object.amount_total / 100,
                event.data.object.currency,
                event.data.object.payment_status,
                event.data.object.id,
                event.data.object.status,
              ],
              function (err, rsl, fld) {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
      );
      // console.log(event.data.object.metadata.product_id);
      connection.query("INSERT INTO stripe_log (pay_log) VALUES (?)", [
        JSON.stringify(event.data.object),
      ]);
      connection.query(
        "SELECT plan_id FROM stripe_plan WHERE prod_id = ?",
        [event.data.object.metadata.product_id],
        async function (err, rsl, field) {
          const plan_id = rsl[0].plan_id;
          const subscriptionId = event.data.object.subscription;

          // Retrieve the subscription details from the Stripe API
          if (subscriptionId) {
            const subscription = await stripe.subscriptions.retrieve(
              subscriptionId
            );
            // Retrieve the subscription start and end dates from the subscription object
            const startDate = new Date(subscription.start_date * 1000);
            const endDate = new Date(subscription.current_period_end * 1000);
            console.log("dates: :: :", startDate, endDate);
            connection.query(
              "INSERT INTO client_subscription (client_id, plan_id, start_date, end_date, stripe_sub_id, active_status) VALUES (?, ?, ?, ?, ?, ?)",
              [
                event.data.object.metadata.client_id,
                plan_id,
                startDate,
                endDate,
                event.data.object.subscription,
                "true",
              ]
            );
          } else {
            const startDate = new Date(event.data.object.created * 1000);
            const endDate = new Date(event.data.object.expires_at * 1000);
            connection.query(
              "INSERT INTO client_subscription (client_id, plan_id, start_date, end_date, active_status) VALUES (?, ?, ?, ?, ?)",
              [
                event.data.object.metadata.client_id,
                plan_id,
                startDate,
                endDate,
                "true",
              ],
              function (err, rsl, field) {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
      );
      break;
    case "product.created":
      console.log(event.data.object);

      break;
    case "product.updated":
      console.log(
        event.data.object.updated,
        event.data.object.active.toString(),
        event.data.object.id
      );
      let updatedAt = new Date(event.data.object.updated * 1000);
      connection.query(
        "UPDATE stripe_plan SET updated_at = ?, active_status = ? WHERE prod_id = ?",
        [updatedAt, event.data.object.active.toString(), event.data.object.id],
        function (err, rsl, fld) {
          if (err) console.log(err);
        }
      );
      break;
    case "product.deleted":
      console.log(event.data.object);
      const deletedAt = new Date(event.data.object.updated * 1000);
      connection.query(
        "UPDATE stripe_plan SET deleted_at = ?, active_status = ? WHERE prod_id = ?",
        [deletedAt, event.data.object.active.toString(), event.data.object.id],
        function (err, rsl, fld) {
          if (err) console.log(err);
        }
      );
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
