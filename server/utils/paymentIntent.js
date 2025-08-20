const Stripe = require("stripe");

const createPaymentIntent = async (amount, currency) => {
  const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

  try {
    const newPaymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
    });

    return newPaymentIntent;
  } catch (err) {
    return err;
  }
};

const getPaymentIntent = async (paymentIntentId) => {
  const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (err) {
    return err;
  }
};

module.exports = { createPaymentIntent, getPaymentIntent };
