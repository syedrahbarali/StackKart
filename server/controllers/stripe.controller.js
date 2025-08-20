const Stripe = require("stripe");

const createPaymentIntent = async (req, res) => {
  const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

  try {
    const { amount, currency = "usd" } = req.body;
    const newPaymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency,
    });

    return res
      .status(200)
      .json({ client_secret: newPaymentIntent.client_secret });
  } catch (err) {
    return res.status(500).json({ message: err.message, ok: false });
  }
};

const getPaymentIntent = async (req, res) => {
  const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

  try {
    const { paymentIntentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    //console.log("Payment Intent: ", paymentIntent);
    // get payment method
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentIntent.payment_method
    );
    paymentIntent.paymentMethod = paymentMethod;

    return res.status(200).json(paymentIntent);
  } catch (err) {
    return res.status(500).json({ message: err.message, ok: false });
  }
};

module.exports = { createPaymentIntent, getPaymentIntent };
