import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../../utils/order-api.js";

const OrderDetailPage = () => {
  const { id } = useParams(); // route se orderId milega
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await getSingleOrder(id);
        if (res.success) {
          setOrder(res.order);
        } else {
          setError(res.message || "Failed to fetch order");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No order details found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Order Header */}
      <div className="bg-white shadow rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Customer:</span>{" "}
            {order.first_name} {order.last_name}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {order.phone_number}
          </p>
          <p>
            <span className="font-semibold">Shipping Address:</span>{" "}
            {order.shipping_address}
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            {order.payment_method.replaceAll("_", " ")}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Total:</span> Rs{" "}
            {parseFloat(order.total_amount).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="divide-y">
          {order.items.map((item) => {
            // parse product images
            let images = [];
            try {
              images = JSON.parse(item.product.productImg);
            } catch (e) {
              images = [item.product.productImg];
            }

            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${images[0]}`}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    SKU: {item.product.sku}
                  </p>
                  <p className="text-sm text-gray-600">
                    Brand: {item.product.brand || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: Rs {parseFloat(item.price).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Subtotal: Rs{" "}
                    {(
                      parseFloat(item.price) * item.quantity
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
