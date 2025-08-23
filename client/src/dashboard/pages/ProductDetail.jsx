import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetail = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const trendingCategories = [
    {
      name: "Women Fashion",
      brand: "RTW Pehchan Edit",
      price: "Rs. 5,490.00",
      tag: "NEW IN",
      img: "https://media.istockphoto.com/id/505534803/photo/young-beautiful-women-shopping-at-the-weekly-cloth-market.jpg?s=612x612&w=0&k=20&c=cedc1imhUYnc6hw7tgd0pHXA_gMe2-cNmpTRJ_63g7w=",
    },
    {
      name: "Men Fashion",
      brand: "RTW Classic Edition",
      price: "Rs. 8,990.00",
      tag: "TRENDING",
      img: "https://scontent.fkhi2-2.fna.fbcdn.net/v/t39.30808-6/482962273_660301246378121_288575350348661627_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=B0gOYzA4ZZAQ7kNvwEt1BZ8&_nc_oc=AdndFYWUhahCLgdiVRum7ETxsUIP1muRoXP-p202OXQZ7_69vSiBJ_dnjfB7G092c4o&_nc_zt=23&_nc_ht=scontent.fkhi2-2.fna&_nc_gid=wMUaZ1ZDNGVHJgyRS79rFQ&oh=00_AfUYP5i8uJs_racazCq6BP-xN-yp5wCEGzQ31Pba1lpTzA&oe=68A37437",
    },
    {
      name: "Accessories",
      brand: "Luxury Accents",
      price: "Rs. 5,990.00",
      tag: "BEST SELLER",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1920&auto=format&fit=crop",
    },
    {
      name: "Jewelry",
      brand: "Royal Elegance",
      price: "Rs. 5,990.00",
      tag: "HOT",
      img: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=800&auto=format&fit=crop&q=60",
    },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White"];

  const productImages = [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  ];

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);
  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleColorSelect = (color) => setSelectedColor(color);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Product Images */}
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {productImages.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img src={image} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="w-full md:w-1/2">
          <div className="mb-6">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">NEW IN</span>
            <div className="flex items-baseline gap-2 mt-2 mb-1">
              <h1 className="text-2xl font-bold">SPIEGE - EMBROIDERED NET SUIT</h1>
              <button onClick={toggleWishlist} className="text-xl text-gray-500">
                {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
            </div>
            <p className="text-1xl font-bold text-black">RS.3,990.00</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">
              Make a particular statement with our three-piece plasticite enterprise featuring a blended mix of all flavors with a soft organic quotata and woven mix all textures.
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">SIZE</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size ? "bg-black text-white border-black" : "border-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && <p className="mt-2 text-sm text-gray-600">Selected size: <span className="font-medium">{selectedSize}</span></p>}
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">COLOR</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 border rounded-md ${
                    selectedColor === color ? "bg-black text-white border-black" : "border-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => handleColorSelect(color)}
                >
                  {color}
                </button>
              ))}
            </div>
            {selectedColor && <p className="mt-2 text-sm text-gray-600">Selected color: <span className="font-medium">{selectedColor}</span></p>}
          </div>

          {/* Quantity Selector and Add to Cart */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button className="px-3 py-2 text-lg font-medium hover:bg-gray-100" onClick={decreaseQuantity}>-</button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button className="px-3 py-2 text-lg font-medium hover:bg-gray-100" onClick={increaseQuantity}>+</button>
            </div>

            <button
              className={`flex-1 bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors ${
                !selectedSize || !selectedColor ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedSize || !selectedColor}
            >
              {selectedSize && selectedColor
                ? `ADD TO BAG (${quantity}) - ${selectedSize} / ${selectedColor}`
                : "SELECT SIZE & COLOR"}
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
                isDetailsOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="pt-4 space-y-4">
                <div>
                  <h3 className="font-medium">Unutilized 2-Piece Slain</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-2">
                    <li>Door! Promoted! Spiced Net Slain from 100m</li>
                    <li>Door Bracelet Net Slain: Record & Back 2.5m</li>
                    <li>Door Thai Slain: Ro 2.0m</li>
                    <li>Paddle Broccoli Net</li>
                    <li>Geliver Pistolino</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium">Deputies</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-2">
                    <li>Zur Original Deputie 2.20m</li>
                    <li>Paddle Zure Dryerza</li>
                    <li>Geliver Pistolino</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium">Trouser</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-2">
                    <li>Door Voodoo Blue Slit Project 3.50m</li>
                    <li>Paddle Voodoo Slit</li>
                    <li>Geliver Pistolino</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;