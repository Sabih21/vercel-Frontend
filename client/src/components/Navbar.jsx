import React, { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBus,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import AuthModal from "../pages/login";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../assets/logo.jpg";
import Sidebar from "../components/Sidebar.jsx";
import { removeItem } from "../redux/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  // console.log("Navbar: ", cart);

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item.id));
  };

  const [isOpen, setIsOpen] = useState(false); // 👈 Mobile menu
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [authOpen, setAuthOpen] = useState(false); // 👈 Auth Sidebar
  const [isCartOpen, setIsCartOpen] = useState(false); // 👈 Cart Sidebar

  const menuItems = [
    { name: "NEW IN" },
    { name: "WOMAN" },
    { name: "MENS" },
    { name: "ME & MY" },
    { name: "CUSTOMIZATION" },
    {
      name: "ACCESSORIES",
      subItems: ["Shoes", "Perfumes", "Bags", "Belts", "Fragrances", "Goggles"],
    },
    { name: "UP COMMING" },
  ];

  const toggleSubmenu = (itemName) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  return (
    <header className="border-b font-poppins">
      {/* Top Navbar */}
      <div className="max-w-[1400px] mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-20 w-auto object-contain" />
        </Link>

        {/* <h1 className="text-4xl font-extrabold tracking-wide">SAPPHIRE</h1> */}

        {/* Search Bar */}
        <div className="relative w-[400px] hidden lg:block">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="FIND YOUR FAVOURITES"
            className="border border-gray-300 rounded-sm pl-10 pr-4 py-2 w-full text-base focus:outline-none"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-2xl">
          {/* ✅ Dashboard Button (role === 1) */}
          {loginUser?.user?.role === 1 && (
            <Link to="/dashboard">
              <Button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 text-base">
                Dashboard
              </Button>
            </Link>
          )}

          <FaBus className="cursor-pointer hover:text-gray-600" />

          {/* 👇 FIX: This opens AuthModal instead of Sidebar */}
          <FaUser
            onClick={() => setAuthOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />

          {/* Cart Sidebar Toggle 👇 */}
          <div className="relative cursor-pointer">
            <FaShoppingCart
              onClick={() => setIsCartOpen(true)}
              className="hover:text-gray-600"
            />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cart.items.length}
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Bottom Menu */}
      <nav className="bg-white border-t hidden lg:block relative">
        <ul className="flex justify-center space-x-10 py-3 text-lg font-medium tracking-wide">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:text-gray-700 relative group ${
                item.name === "ACCESSORIES"
                  ? "text-[#ad163a] hover:text-gray-700"
                  : ""
              }`}
              onMouseEnter={() => item.subItems && setActiveSubmenu(item.name)}
              onMouseLeave={() => item.subItems && setActiveSubmenu(null)}
            >
              <div className="flex items-center">
                {item.name}
                {item.subItems && (
                  <span className="ml-1">
                    {activeSubmenu === item.name ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </span>
                )}
              </div>

              {item.subItems && activeSubmenu === item.name && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      {subItem}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Menu (Mobile) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed left-0 top-0 h-full w-64 bg-white p-5 shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <FaTimes
                className="text-2xl cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <ul className="space-y-2 text-lg">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <div
                    className="flex justify-between items-center py-2 cursor-pointer"
                    onClick={() =>
                      item.subItems
                        ? toggleSubmenu(item.name)
                        : setIsOpen(false)
                    }
                  >
                    <span
                      className={
                        item.name === "SPECIAL OFFERS" ? "text-[#ad163a]" : ""
                      }
                    >
                      {item.name}
                    </span>
                    {item.subItems && (
                      <span>
                        {activeSubmenu === item.name ? (
                          <FaChevronUp size={14} />
                        ) : (
                          <FaChevronDown size={14} />
                        )}
                      </span>
                    )}
                  </div>

                  {item.subItems && activeSubmenu === item.name && (
                    <ul className="pl-4 py-1 space-y-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="py-1 text-gray-700"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ✅ Sidebar for Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-50"
            onClick={() => setIsCartOpen(false)}
          >
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // stop click from closing
            >
              <Sidebar
                title="SHOPPING CART"
                onClose={() => setIsCartOpen(false)}
              >
                <div className="p-4 space-y-6">
                  {/* Free Shipping Msg */}
                  {cart?.items?.length > 0 && (
                    <p className="text-sm bg-blue-100 text-blue-600 px-3 py-2 rounded">
                      🎉 Congratulations! You get free shipping!
                    </p>
                  )}

                  {/* Cart Items */}
                  {cart?.items?.length > 0 ? (
                    cart.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-start">
                        {/* Product Image */}
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            item.product?.productImg
                              ? JSON.parse(item.product.productImg)[0]
                              : "/fallback.jpg"
                          }`}
                          alt={item.product?.name}
                          className="w-24 h-28 object-cover rounded"
                        />

                        {/* Product Details */}
                        <div className="flex-1">
                          <p className="font-semibold">{item.product?.name}</p>
                          <p className="text-green-600 text-sm">
                            {item.product?.stock_quantity ? "In Stock" : "N/A"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Rs.{Number(item.price).toFixed(2)}
                          </p>

                          {/* Quantity Control */}
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>

                          {/* ADD TO QUANTITY CODE */}
                        </div>
                      </div>
                    ))
                  ) : (
                    // ✅ Empty Cart Design
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Your Cart is Empty 🛒
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Looks like you haven’t added anything yet.
                      </p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate("/");
                        }}
                        className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}

                  {/* ✅ Buttons only when cart has items */}
                  {cart?.items?.length > 0 && (
                    <div className="space-y-3 mt-6">
                      {/* Subtotal */}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Subtotal:</span>
                          <span>
                            Rs.
                            {cart?.items
                              ?.reduce(
                                (sum, item) =>
                                  sum + item.quantity * Number(item.price),
                                0
                              )
                              .toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate("/cart")}
                        className="w-full bg-black text-white py-3 rounded-md"
                      >
                        VIEW CART
                      </button>
                      <button
                        onClick={() => navigate("/checkout")}
                        className="w-full bg-black text-white py-3 rounded-md"
                      >
                        CHECKOUT
                      </button>
                      <button
                        onClick={() => navigate("/")}
                        className="w-full bg-black text-white py-3 rounded-md"
                      >
                        CONTINUE SHOPPING
                      </button>
                    </div>
                  )}
                </div>
              </Sidebar>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Auth Sidebar */}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </header>
  );
};

export default Navbar;

// {/* <div className="flex items-center gap-3 mt-2">
//   <button
//     onClick={() => handleUpdateQuantity(item, -1)}
//     className="px-2 py-1 border rounded hover:bg-gray-200"
//   >
//     −
//   </button>
//   <span className="px-3">{item.quantity}</span>
//   <button
//     onClick={() => handleUpdateQuantity(item, 1)}
//     className="px-2 py-1 border rounded hover:bg-gray-200"
//   >
//     +
//   </button>

//   {/* Delete */}
//   <button onClick={() => handleRemoveItem(item)} className="text-red-500 ml-4">
//     🗑
//   </button>
// </div> */}
