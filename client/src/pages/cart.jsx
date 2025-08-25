import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Image from "../assets/bf70bc66-2ee4-47de-8d59-7c9c459f9c78.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart);
  console.log("cart: ", cart);

  // Calculate subtotal from redux cart
  const subtotal = cart.items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-center bg-[#F8F8F8] text-2xl font-bold mb-8 py-4">
          SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">
                  PRODUCT ({cart.items.length})
                </h2>
              </div>

              {/* Table headers */}
              <div className="hidden md:grid grid-cols-12 gap-4 border-b pb-4 mb-4 text-base">
                <div className="col-span-5 font-medium text-gray-500">
                  PRODUCT
                </div>
                <div className="col-span-2 font-medium text-gray-500">
                  PRICE
                </div>
                <div className="col-span-3 font-medium text-gray-500 text-center">
                  QUANTITY
                </div>
                <div className="col-span-2 font-medium text-gray-500 text-right">
                  TOTAL
                </div>
              </div>

              {/* Cart items */}
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b text-base"
                >
                  {/* Product name and image */}
                  <div className="md:col-span-5 flex items-start">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                      <img
                        src={Image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"}
                        alt={item.product?.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.product?.name}</h3>
                      <span className="text-green-600 text-sm">
                        {item.product?.stock_quantity ? "In Stock" : null}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 flex items-center">
                    <p className="text-gray-800">
                      Rs.{Number(item.price).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-3 text-center flex items-center justify-center">
                    <span className="bg-gray-100 px-4 py-2 rounded text-base">
                      {item.quantity}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 text-right flex items-center justify-end">
                    <p className="font-medium">
                      Rs.
                      {(Number(item.price) * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order note section */}
            <div className="bg-white p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Add Order Note</h2>
              <p className="text-gray-600 mb-2">How can we help you?</p>
              <textarea
                className="w-full border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                rows="4"
                placeholder="Any special instructions or notes for your order..."
              ></textarea>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>

              <div className="flex justify-between mb-4 text-base">
                <span>Subtotal</span>
                <span className="font-medium">
                  Rs.{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button onClick={() => navigate("/checkout")} className="w-full bg-[#000000] text-white py-4 rounded-md font-medium text-base">
                CHECKOUT
              </button>

              <div className="mt-6 text-center">
                <a href="/" className="text-blue-600 hover:underline text-sm">
                  Return to shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;