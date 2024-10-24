import Cookies from "js-cookie";

export const createNewOrder = async (formData) => {
  try {
    const res = await fetch("/api/order/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrdersForUser = async (id) => {
  // this is basically user id for get all orders
  try {
    const res = await fetch(`/api/order/get-all-orders?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderDetails = async (id) => {
  // thiid is basically order id for specific order
  try {
    const res = await fetch(`/api/order/order-details?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrdersForAllUser = async () => {
  // this is basically user id for get all orders
  try {
    const res = await fetch("/api/admin/order/get-all-orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusOfOrder = async (formData) => {
  // this is basically user id for get all orders
  try {
    const res = await fetch("/api/admin/order/update-order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
