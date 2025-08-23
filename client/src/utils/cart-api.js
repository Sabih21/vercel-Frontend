import Api from "../services/axios.js";
import toast from "react-hot-toast";

export const getAllCarts = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-carts`);
    console.log("Get all carts:", response.data);
    return response?.data;
  } catch (error) {
    console.error("Get carts error:", error?.response?.data || error.message);
  }
};

export const createCart = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-cart`, itemData);
    console.log("Create cart response:", response.data);
    toast.success("Cart created ✅");
    return response?.data;
  } catch (error) {
    console.error("Create cart error:", error?.response?.data?.message || error.message);
    toast.error(error?.response?.data?.message || "Failed to create cart ❌");
  }
};

export const getSingleCart = async (cartId) => {
  try {
    const response = await Api.get(`/api/v1/get-single-cart/${cartId}`);
    console.log("Get single cart:", response.data);
    return response?.data;
  } catch (error) {
    console.error("Get single cart error:", error?.response?.data || error.message);
    toast.error(error?.response?.data?.message || "Cart not found ❌");
  }
};

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
