const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

export const fetchCategories = async () => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/category/getAllCategories`
  ).then(async (res) => await res.json());
};

export const fetchAllProducts = async () => {
  return await fetch(`${BASE_URL}/api/v1/product/getAllProducts`)
    .then(async (res) => await res.json())
    .catch((err) => console.log(err));
};

export const fetchProductByCategory = async (category) => {
  return await fetch(
    `${BASE_URL}/api/v1/product/getProductByCategory/` + category
  ).then(async (res) => await res.json());
};

export const fetchProductById = async (productId) => {
  return await fetch(
    `${BASE_URL}/api/v1/product/getProductById/${productId}`
  ).then(async (res) => await res.json());
};

export const fetchAddToCart = async (item, quantity) => {
  console.log(item, quantity);
  console.log(BASE_URL);
  return await fetch(`${BASE_URL}/api/v1/customer/addToCart`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
    credentials: "include",
    body: JSON.stringify({ product: item, quantity }),
  }).then(async (res) => await res.json());
};

export const deleteFromCart = async (itemId) => {
  await fetch(`${BASE_URL}/api/v1/customer/deleteFromCart/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    credentials: "include",
  }).then(async (res) => await res.json());
};

export const fetchRelatedProduct = async (productId) => {
  return await fetch(
    `${BASE_URL}/api/v1/product/getRelatedProduct/${productId}`
  ).then(async (res) => await res.json());
};

export const updateStocks = async (items) => {
  return await fetch(`${BASE_URL}/api/v1/product/updateStocks`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
    credentials: "include",
    body: JSON.stringify(items),
  }).then(async (res) => await res.json()).catch(err => console.log(err));
};
