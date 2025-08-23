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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // 👈 Mobile menu
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [authOpen, setAuthOpen] = useState(false); // 👈 Auth Sidebar

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
        <h1 className="text-4xl font-extrabold tracking-wide">SAPPHIRE</h1>

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
          <FaBus className="cursor-pointer hover:text-gray-600" />

          {/* 👇 FIX: This opens AuthModal instead of Sidebar */}
          <FaUser
            onClick={() => setAuthOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />

          <FaShoppingCart className="cursor-pointer hover:text-gray-600" />

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

      {/* ✅ Auth Sidebar */}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </header>
  );
};

export default Navbar;
