export const createPaymentIntent = async (amount) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/payment/create-payment-intent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "usd",
      }),
    }
  )
    .then(async (res) => await res.json())
    .catch((err) => err);
};

export const getPaymentIntent = async (paymentIntentId) => {
  return await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/api/v1/payment/get-payment-intent/${paymentIntentId}`
  )
    .then(async (res) => await res.json())
    .catch((err) => err);
};
