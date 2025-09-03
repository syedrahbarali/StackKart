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
        Authorization: `${localStorage.getItem("token")}`,
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
  
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/customer/updateOrder`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }
    }
  )
    .then(async (res) => await res.json())
    .catch((err) => err);
};
