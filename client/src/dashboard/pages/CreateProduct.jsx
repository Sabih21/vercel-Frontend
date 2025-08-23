import { useState, useEffect } from "react";
import { createProduct, getAllProducts } from "../../utils/product-api.js";
import { getAllCategories } from "../../utils/category-api.js";
import { Button } from "../../components/ui/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover.jsx";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../components/ui/command.jsx";
// import { ChevronsUpDown, Check } from "lucide-react"
// import { cn } from "@/lib/utils"

const CreateProductForm = () => {
  const [form, setForm] = useState({
    category_id: "",
    name: "",
    sku: "",
    description: "",
    price: "",
    stock_quantity: "",
    discount: "",
    brand: "",
    colors: [],
    fabrics: [],
    fits: [],
    sizes: [],
    model_height: "",
    model_wears: "",
    whats_new: false,
    is_special: false,
    tags: "",
    trending_product: 0,
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]); // dropdown data
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getAllCategories();
        // console.log("Fetched Categories:", res?.categories);
        setCategories(res?.categories || []);
      } catch (err) {
        console.error("Error in fetching categories", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (["colors", "fabrics", "fits", "sizes"].includes(name)) {
      // comma separated input to array
      setForm({ ...form, [name]: value.split(",").map((v) => v.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (Array.isArray(form[key])) {
        formData.append(key, JSON.stringify(form[key]));
      } else {
        formData.append(key, form[key]);
      }
    });
    images.forEach((img) => formData.append("productImg", img));

    await createProduct(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="w-full">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                {selectedCategory
                  ? categories.find((cat) => cat.id === selectedCategory)?.name
                  : "Select Category"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((cat) => (
                      <CommandItem
                        key={cat.id}
                        onSelect={() => {
                          setSelectedCategory(cat.id);
                          setForm((prev) => ({ ...prev, category_id: cat.id }));
                          setOpen(false);
                        }}
                      >
                        {cat.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* SKU */}
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Stock Quantity */}
        <input
          type="number"
          name="stock_quantity"
          placeholder="Stock Quantity"
          value={form.stock_quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Discount */}
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={form.discount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Brand */}
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Colors, Sizes, Fabrics, Fits */}
        <input
          type="text"
          name="colors"
          placeholder="Colors (comma separated)"
          value={form.colors.join(", ")}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma separated)"
          value={form.sizes.join(", ")}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="fabrics"
          placeholder="Fabrics (comma separated)"
          value={form.fabrics.join(", ")}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="fits"
          placeholder="Fits (comma separated)"
          value={form.fits.join(", ")}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Model Height & Wears */}
        <input
          type="text"
          name="model_height"
          placeholder="Model Height"
          value={form.model_height}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="model_wears"
          placeholder="Model Wears"
          value={form.model_wears}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Whats New & Is Special */}
        <div className="flex space-x-4 items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="whats_new"
              checked={form.whats_new}
              onChange={handleChange}
            />
            <span>Whats New</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_special"
              checked={form.is_special}
              onChange={handleChange}
            />
            <span>Is Special</span>
          </label>
        </div>

        {/* Tags */}
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Trending Product */}
        <input
          type="number"
          name="trending_product"
          placeholder="Trending Product (0 or 1)"
          value={form.trending_product}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Images */}
        <input
          type="file"
          name="productImg"
          multiple
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
