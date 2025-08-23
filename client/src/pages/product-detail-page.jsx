"use client";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductCarousel from "../components/ProductCarousel.jsx";
import { getSingleProduct } from "../utils/product-api.js";
import { createCart, getSingleCart, getAllCarts } from "../utils/cart-api.js";
import Navbar from "../components/Navbar.jsx";
import FooterSection from "../components/Footer.jsx";
import ProductCategoryCarousel from "../components/ProductCategoryCarousel.jsx";
import Sidebar from "../components/Sidebar.jsx";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false); // HANDLE SIDE BAR STATE

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getSingleProduct(id);
      if (res?.success) {
        const p = res.data;

        const parseSafe = (val) => {
          if (!val) return [];
          try {
            let parsed = typeof val === "string" ? JSON.parse(val) : val;
            if (typeof parsed === "string") parsed = JSON.parse(parsed);
            return parsed;
          } catch {
            return [];
          }
        };

        setProduct({
          ...p,
          productImg: Array.isArray(p.productImg)
            ? p.productImg
            : JSON.parse(p.productImg || "[]"),
          colors: parseSafe(p.colors),
          sizes: parseSafe(p.sizes),
          fabrics: parseSafe(p.fabrics),
          fits: parseSafe(p.fits),
        });
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const payload = {
        // user_id: 1, // TODO: agar user login hai toh actual user_id lo
        session_id: null, // TODO: agar user login nahi hai toh ek session_id use karo (localStorage se bhi le sakte ho)
        items: [
          {
            product_id: product.id || null,
            quantity: quantity || null,
            price: product.price || null,
            size: selectedSize || null,
            color: selectedColor || null,
          },
        ],
      };
   console.log("payload :", payload);
   
      const res = await createCart(payload);
      if (res?.success) {
        setIsCartOpen(true); // ✅ Sidebar khol do
      }
    } catch (error) {
      console.error("Add to Cart Error:", error);
    }
  };

  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Product Images */}
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {product.productImg.length > 0 ? (
                product.productImg.slice(0, 5).map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}${img}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="w-full md:w-1/2">
            <div className="mb-6">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {product.tags || "NEW IN"}
              </span>

              <div className="flex items-baseline gap-2 mt-2 mb-1">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="text-xl text-gray-500"
                >
                  {isWishlisted ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
              <p className="text-1xl font-bold text-black">
                Rs.{Number(product.price).toFixed(2)}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">SIZE</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">COLOR</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-4 py-2 border rounded-md ${
                        selectedColor === color
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector and Add to Cart */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-3 py-2 text-lg font-medium hover:bg-gray-100"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  className="px-3 py-2 text-lg font-medium hover:bg-gray-100"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`w-auto bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors ${
                  !selectedSize || !selectedColor
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!selectedSize || !selectedColor}
              >
                ADD TO BAG
              </button>
            </div>

            {/* Toggleable Product Details Section */}
            <div className="border-t border-b border-gray-200 py-4 mt-8">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleDetails}
              >
                <h2 className="text-lg font-semibold">PRODUCT DETAILS</h2>
                <span className="text-xl">{isDetailsOpen ? "−" : "+"}</span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isDetailsOpen ? "max-h-[600px]" : "max-h-0"
                }`}
              >
                <div className="pt-4 space-y-4 text-gray-700">
                  {/* Description */}
                  <p>{product.description || "N/A"}</p>

                  {/* Brand */}
                  {product.brand && (
                    <p>
                      <span className="font-semibold">Brand:</span>{" "}
                      {product.brand || "N/A"}
                    </p>
                  )}

                  {/* Colors */}
                  {product.colors?.length > 0 && (
                    <p>
                      <span className="font-semibold">Colors:</span>{" "}
                      {product.colors.join(", ") || "N/A"}
                    </p>
                  )}

                  {/* Fabrics */}
                  {product.fabrics?.length > 0 && (
                    <p>
                      <span className="font-semibold">Fabrics:</span>{" "}
                      {product.fabrics.join(", ") || "N/A"}
                    </p>
                  )}

                  {/* Fits */}
                  {product.fits?.length > 0 && (
                    <p>
                      <span className="font-semibold">Fits:</span>{" "}
                      {product.fits.join(", ") || "N/A"}
                    </p>
                  )}

                  {/* Sizes */}
                  {product.sizes?.length > 0 && (
                    <p>
                      <span className="font-semibold">Available Sizes:</span>{" "}
                      {product.sizes.join(", ") || "N/A"}
                    </p>
                  )}

                  {/* Model Info */}
                  {(product.model_height || product.model_wears) && (
                    <p>
                      <span className="font-semibold">Model Info:</span> Height
                      – {product.model_height}, Wearing –{" "}
                      {product.model_wears || "N/A"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Category Carousel */}
        <ProductCategoryCarousel category={product.category} />
      </div>
      <FooterSection />

      {/* ✅ Sidebar for Cart */}
      {isCartOpen && (
        <Sidebar title="SHOPPING CART" onClose={() => setIsCartOpen(false)}>
          <div className="p-4 space-y-6">
            {/* Free Shipping Msg */}
            <p className="text-sm bg-blue-100 text-blue-600 px-3 py-2 rounded">
              🎉 Congratulations! You get free shipping!
            </p>

            {/* Cart Item */}
            <div className="flex gap-4 items-start">
              {/* Product Image */}
              <img
                src={`${import.meta.env.VITE_API_URL}${product.productImg[0]}`}
                alt={product.name}
                className="w-24 h-28 object-cover rounded"
              />

              {/* Product Details */}
              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-green-600 text-sm">
                  {product.stock_quantity ? "In Stock" : "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Rs.{Number(product.price).toFixed(2)}
                </p>

                {/* Quantity Control */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={decreaseQuantity}
                    className="px-2 py-1 border rounded hover:bg-gray-200"
                  >
                    −
                  </button>
                  <span className="px-3">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-2 py-1 border rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                  {/* TODO IS PAR KAM KARNA HAI */}
                  {/* Delete */}
                  <button
                    onClick={() => {
                      setQuantity(0); // 👈 yaha delete k logic dal sakta hai
                    }}
                    className="text-red-500 ml-4"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            {/* Buttons */}
            <div className="space-y-3">
              {/* Subtotal */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Subtotal:</span>
                  <span>
                    Rs.{(quantity * Number(product.price)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-black text-white py-3 rounded-md"
              >
                VIEW CART
              </button>
              <button className="w-full bg-black text-white py-3 rounded-md">
                CHECKOUT
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-black text-white py-3 rounded-md"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </Sidebar>
      )}
    </>
  );
};

export default ProductDetailPage;
