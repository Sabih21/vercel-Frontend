import Api from "../services/axios.js";
import toast from "react-hot-toast";

// ✅ Get all orders (only for logged-in user)
export const getAllOrders = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-orders`);
    console.log("Get all orders:", response.data);
    return response?.data;
  } catch (error) {
    console.error("Get orders error:", error?.response?.data || error.message);
  }
};

// ✅ Guest checkout
export const guestCheckout = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/guest-checkout`, itemData);
    toast.success(response?.data?.message || "Order create ✅");
    return response?.data;
  } catch (error) {
    console.error(
      "Guest checkout error:",
      error?.response?.data?.message || error.message
    );
    toast.error(error?.response?.data?.message || "Failed to create order ❌");
  }
};

// ✅ Authenticated checkout
export const createOrder = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-order`, itemData);
    return response?.data;
  } catch (error) {
    console.error(
      "Create order error:",
      error?.response?.data?.message || error.message
    );
    toast.error(error?.response?.data?.message || "Failed to create order ❌");
  }
};

// ✅ Get single cart
export const getSingleCart = async (cartId) => {
  try {
    const response = await Api.get(`/api/v1/get-single-cart/${cartId}`);
    console.log("Get single cart:", response.data);
    return response?.data;
  } catch (error) {
    console.error(
      "Get single cart error:",
      error?.response?.data || error.message
    );
    toast.error(error?.response?.data?.message || "Cart not found ❌");
  }
};

// ✅ Update cart
export const updateCart = async (cartId, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-cart/${cartId}`, itemData);
    console.log("Update cart response:", response.data);
    toast.success("Cart updated ✨");
    return response?.data;
  } catch (error) {
    console.error("Update cart error:", error?.response?.data || error.message);
    toast.error(error?.response?.data?.message || "Failed to update cart ❌");
  }
};

// ✅ Delete cart
export const deleteCart = async (cartId) => {
  try {
    const response = await Api.delete(`/api/v1/delete-cart/${cartId}`);
    console.log("Delete cart response:", response.data);
    toast.success("Cart deleted 🗑️");
    return response?.data;
  } catch (error) {
    console.error("Delete cart error:", error?.response?.data || error.message);
    toast.error(error?.response?.data?.message || "Failed to delete cart ❌");
  }
};
