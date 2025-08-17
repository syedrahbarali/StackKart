// Update product by admin
export const updateProduct = async (productId, data) => {
  // If images are files, use FormData, else send JSON
  let body, headers;
  if (data.gallery && data.gallery.length > 0) {
    body = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "gallery") {
        value.forEach((file) => body.append("gallery", file));
      } else {
        body.append(key, value);
      }
    });
    headers = {};
  } else {
    body = JSON.stringify(data);
    headers = { "Content-Type": "application/json" };
  }
  const res = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/api/v1/product/updateProduct/${productId}`,
    {
      method: "PATCH",
      headers,
      credentials: "include",
      body,
    }
  );
  return await res.json();
};

export const fetchDashboardData = async () => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/admin/dashboard-data`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then(async (res) => await res.json());
};

export const fetchAllOrders = async () => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/admin/getAllOrders`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then(async (res) => {
    if (!res.ok) throw new Error(res.message);
    return await res.json();
  });
};

export const updateOrderStatus = async (orderId, status) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/admin/updateOrderStatus`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ orderId, status }),
    }
  ).then(async (res) => {
    if (!res.ok) throw new Error(res.message);
    return await res.json();
  });
};

export const fetchAllUsers = async () => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/admin/getAllUsers`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then(async (res) => {
    if (!res.ok) throw new Error(res.message);
    return await res.json();
  });
};

export const updateProducts = async (formData) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/admin/updateProduct`,
    {
      method: "PATCH",
      credentials: "include",
      body: formData,
    }
  ).then(async (res) => {
    if (!res.ok) throw new Error(res.message);
    return await res.json();
  });
};

export const deleteProductImage = async (imageId, productId) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/admin/deleteProductImage`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, imageId }),
    }
  ).then(async (res) => {
    if (!res.ok) throw new Error(res.message);
    return await res.json();
  });
};

// TODO: Implement user update functionality inside Server
export const updateUser = async () => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/admin/updateUser`,
    {
      method: "PATCH",
      credentials: "include",
    }
  ).then(async (res) => {
    if (!res.ok) throw new Error(res.message);
    return await res.json();
  });
};

export const addCategory = async (category) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/category/createCategory`,
    {
      method: "POST",
      credentials: "include",
      body: category,
    }
  ).then(async (res) => {
    if (!res.ok) new Error(res.message);
    return await res.json();
  });
};

export const addProduct = async (product) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/product/createProduct`,
    {
      method: "POST",
      credentials: "include",
      body: product,
    }
  ).then(async (res) => {
    return await res.json();
  });
};

export const fetchCategories = async() => {
  return await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/category/getAllCategories`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then(async (res) => {
    if (!res.ok) throw new Error(res.message);
    return await res.json();
  });
}