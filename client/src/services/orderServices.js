export const createOrder = async (
  items,
  shippingDetails,
  stripePaymentIntentId,
  totalAmount
) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/customer/createOrder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        shippingDetails,
        stripePaymentIntentId,
        totalAmount,
      }),
      credentials: "include",
    }
  )
    .then(async (res) => await res.json())
    .catch((err) => err);
};

export const updateOrder = async (updatedItems) => {
  console.log("PaymentStatus: ", typeof updatedItems.paymentStatus);
  console.log("PaymentMethod: ", typeof updatedItems.paymentMethod);
  console.log("StripeChargeId: ", typeof updatedItems.stripeChargeId);
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/customer/updateOrder`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItems),
      credentials: "include",
    }
  )
    .then(async (res) => await res.json())
    .catch((err) => err);
};

export const getAllOrders = async () => {
  console.log("Getting all orders");
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/customer/getAllOrders`,
    {
      method: "GET",
      credentials: "include",
    }
  )
    .then(async (res) => await res.json())
    .catch((err) => err);
};
