import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Cart = () => {
  // Static data for the cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "3 PIECE - EMBROIDERED CHIFFON SUIT",
      price: 15990.00,
      quantity: 2,
      inStock: true,
    },
  ]);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle quantity changes
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-center bg-[#F8F8F8] text-2xl font-bold mb-8">SHOPPING CART</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">PRODUCT({cartItems.length})</h2>
              </div>
              
              {/* Table headers */}
              <div className="hidden md:grid grid-cols-12 gap-4 border-b pb-2 mb-4">
                <div className="col-span-5 font-medium text-gray-500">PRODUCT</div>
                <div className="col-span-2 font-medium text-gray-500">PRICE</div>
                <div className="col-span-3 font-medium text-gray-500 text-center">QUANTITY</div>
                <div className="col-span-2 font-medium text-gray-500 text-right">TOTAL</div>
              </div>
              
              {/* Cart items */}
              {cartItems.map(item => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b">
                  {/* Product name and image (would be added later) */}
                  <div className="md:col-span-5">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.inStock && (
                      <span className="text-green-600 text-sm mt-1 block">In Stock</span>
                    )}
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2">
                    <p className="text-gray-800">Rs.{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-3">
                    <div className="flex items-center">
                      <button 
                        className="bg-gray-200 rounded-l-md px-3 py-1"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                      <button 
                        className="bg-gray-200 rounded-r-md px-3 py-1"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 text-right">
                    <p className="font-medium">Rs.{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order note section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Add Order Note</h2>
              <p className="text-gray-600 mb-2">How can we help you?</p>
              <textarea 
                className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Any special instructions or notes for your order..."
              ></textarea>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>
              
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span className="font-medium">Rs.{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              {/* <div className="bg-green-100 border border-green-200 rounded-md p-3 mb-4">
                <p className="text-green-700 text-sm">Congratulations! You get free shipping!</p>
              </div> */}
              
              <button className="w-full bg-[#000000] text-white py-3 rounded-md font-medium">
                CHECKOUT
              </button>
              
              {/* <div className="mt-6 pt-4 border-t">
                <h3 className="font-medium mb-2">We Accept:</h3>
                <div className="flex items-center">
                  <span className="bg-gray-100 px-3 py-1 rounded-md text-sm mr-2">VISA</span>
                  <span className="text-gray-600 text-sm">Rs.0 - Rs.8,000</span>
                </div>
              </div> */}
              
              <div className="mt-6 text-center">
                <a 
                  href="https://adv.markinsonblog.ng/zhapipuri/" 
                  className="text-blue-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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