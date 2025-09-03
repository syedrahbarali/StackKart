const BASE_URL = import.meta.env.VITE_BASE_URL;

// Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  console.log("Product Id: ", productId);
  console.log("Quantity: " + quantity);
  const response = await fetch(`${BASE_URL}/api/v1/customer/addToCart`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    credentials: "include",
    body: JSON.stringify({ product: productId, quantity }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add to cart");
  }

  return data;
};

// Get user's cart items
export const getCartItems = async () => {
  const response = await fetch(`${BASE_URL}/api/v1/customer/getCart`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch cart items");
  }

  return data;
};

// Remove item from cart
export const deleteFromCart = async (itemId) => {
  const response = await fetch(
    `${BASE_URL}/api/v1/customer/deleteFromCart/${itemId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove item from cart");
  }

  return data;
};

// Update cart item quantity
export const updateCartItemQuantity = async (itemId, quantity) => {
  const response = await fetch(
    `${BASE_URL}/api/v1/customer/updateCartItem/${itemId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify({ quantity }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update cart item");
  }

  return data;
};

// Clear entire cart
export const clearCart = async () => {
  return await fetch(`${BASE_URL}/api/v1/customer/clearCart`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  })
    .then(async (res) => await res.json())
    .catch((err) => console.log(err));
};
