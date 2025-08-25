import React, { useState } from "react";
import Footer from "../components/Footer.jsx";
import Image from "../assets/bf70bc66-2ee4-47de-8d59-7c9c459f9c78.png";
import {
  guestCheckout,
  getAllOrders,
  createOrder,
  getSingleCart,
} from "../utils/order-api.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  console.log("cart: ", cart);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    shipping_address: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    // const shippingAddress = `${formData.shipping_address}`.trim();

    const payload = {
      session_id: cart.session_id,
      cart_id: cart.id,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phone,
      shipping_address: formData.shipping_address,
      payment_method: paymentMethod,
    };

    const res = await guestCheckout(payload);
    if (res.success) {
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        shipping_address: "",
        phone: "",
      });
    }
  };

  const calculateTotal = () => {
    if (!cart.items || cart.items.length === 0) return 0;
    return cart.items.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const totalPrice = calculateTotal();

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">SAPPHIRE</h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Contact and Shipping */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                1 Contact Information
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <button className="w-full bg-black text-white py-4 rounded-md font-medium mb-4">
                PROCEED TO SHIPPING
              </button>
            </div>

            <div className="bg-white p-6">
              <h2 className="text-xl font-semibold mb-4">2 Shipping</h2>

              {/* First Name */}
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label
                  htmlFor="shipping_address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address Line*
                </label>
                <input
                  type="text"
                  id="shipping_address"
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-black text-white py-4 rounded-md font-medium mt-6"
              >
                PROCEED TO DELIVERY
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-5/12">
            <div className="bg-white p-6 border border-gray-200 rounded sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <p className="text-2xl font-bold mb-6">
                Rs.{totalPrice.toLocaleString("en-PK")}
              </p>

              {cart.items && cart.items.length > 0 ? (
                cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 pb-4 mb-4"
                  >
                    <div className="flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={
                            item.product?.image
                              ? `${import.meta.env.VITE_API_URL}/${
                                  item.product.image
                                }`
                              : Image
                          }
                          alt={item.product?.name || "Product"}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.product?.name || "Product"}</h3>
                            <p className="ml-4">
                              Rs.
                              {(
                                parseFloat(item.price) * item.quantity
                              ).toLocaleString("en-PK")}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Price: Rs.
                            {parseFloat(item.price).toLocaleString("en-PK")}
                          </p>
                          <p className="text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items in cart</p>
              )}

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-4">ORDER SUMMARY</h3>
                <div className="flex justify-between py-2 text-base">
                  <span>Subtotal (inclusive of Tax)</span>
                  <span>Rs.{totalPrice.toLocaleString("en-PK")}</span>
                </div>
                <div className="flex justify-between py-2 text-base">
                  <span>Shipping</span>
                  <span>Rs.0.00</span>
                </div>
                <div className="flex justify-between py-2 text-base">
                  <span>FBR POS</span>
                  <span>Rs.1.00</span>
                </div>
                <div className="flex justify-between py-4 border-t border-gray-200 font-bold text-base">
                  <span>Total(PKR)</span>
                  <span>Rs.{totalPrice.toLocaleString("en-PK")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section (always below summary) */}
        <div className="bg-white p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">3 Payment</h2>

          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              Select Payment Method
            </h2>

            <div
              onClick={() => handlePaymentChange("cash")}
              className={`flex items-center p-4 border rounded-md mb-3 cursor-pointer ${
                paymentMethod === "cash" ? "border-black bg-gray-50" : ""
              }`}
            >
              <input
                type="radio"
                id="cash"
                name="payment-method"
                checked={paymentMethod === "cash"}
                onChange={() => handlePaymentChange("cash")}
                className="h-5 w-5 text-black focus:ring-black"
              />
              <label
                htmlFor="cash"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Cash On Delivery
              </label>
            </div>
          </div>

          {/* Billing Address */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="billing-address"
                className="h-5 w-5 text-black focus:ring-black"
              />
              <label
                htmlFor="billing-address"
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Billing Address Same as shipping
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={() => navigate("/order-successfully")}
            className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            PLACE YOUR ORDER
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Checkout;
