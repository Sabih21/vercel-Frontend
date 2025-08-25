import { useState, useEffect } from "react";
import { createProduct, getAllProducts } from "../../utils/product-api.js";
import { getAllCategories } from "../../utils/category-api.js";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Textarea } from "../../components/ui/textarea.jsx";
import { Switch } from "../../components/ui/switch.jsx";
import { Label } from "../../components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select.jsx";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import { X, Plus, Search } from "lucide-react";

// Options
const colorOptions = [
  "Red",
  "Blue",
  "Black",
  "White",
  "Green",
  "Yellow",
  "Pink",
  "Purple",
];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const fabricOptions = ["Cotton", "Silk", "Polyester", "Linen", "Wool", "Denim"];
const fitOptions = ["Slim", "Regular", "Loose", "Oversized", "Fitted"];

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
    whats_new: 0,
    is_special: 0,
    tags: "",
    trending_product: 0,
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getAllCategories();
        setCategories(res?.categories || []);
        setFilteredCategories(res?.categories || []);
      } catch (err) {
        console.error("Error in fetching categories", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Filter categories based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  // form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // tick group handler
  const handleCheckboxGroup = (field, option) => {
    setForm((prev) => {
      const current = prev[field];
      if (current.includes(option)) {
        return { ...prev, [field]: current.filter((c) => c !== option) };
      } else {
        return { ...prev, [field]: [...current, option] };
      }
    });
  };

  // image preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
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
    setForm({
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
      whats_new: 0,
      is_special: false,
      tags: "",
      trending_product: 0,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-sm rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-5 p-5 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Basic Information
          </h3>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Product Name *
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          {/* Category - Improved Searchable Dropdown */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category *</Label>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>

              <div className="mt-2 border border-gray-200 rounded-md bg-white max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading categories...
                  </div>
                ) : filteredCategories.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No categories found
                  </div>
                ) : (
                  filteredCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className={`p-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                        form.category_id === cat.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setForm((prev) => ({ ...prev, category_id: cat.id }));
                        setSearchQuery(cat.name);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{cat.name}</span>
                        {form.category_id === cat.id && (
                          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {form.category_id && (
                <div className="mt-2 flex items-center justify-between bg-blue-50 p-2 rounded-md">
                  <span className="text-sm text-blue-700">
                    Selected:{" "}
                    {
                      categories.find((cat) => cat.id === form.category_id)
                        ?.name
                    }
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, category_id: "" }));
                      setSearchQuery("");
                    }}
                    className="text-blue-700 hover:text-blue-900 text-sm"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SKU + Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku" className="text-sm font-medium">
                SKU
              </Label>
              <Input
                id="sku"
                type="text"
                name="sku"
                placeholder="Product SKU"
                value={form.sku}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand" className="text-sm font-medium">
                Brand
              </Label>
              <Input
                id="brand"
                type="text"
                name="brand"
                placeholder="Brand Name"
                value={form.brand}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Product description"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>

        {/* Pricing & Inventory Section */}
        <div className="space-y-5 p-5 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Pricing & Inventory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Price *
              </Label>
              <Input
                id="price"
                type="number"
                name="price"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock_quantity" className="text-sm font-medium">
                Stock Quantity *
              </Label>
              <Input
                id="stock_quantity"
                type="number"
                name="stock_quantity"
                placeholder="0"
                value={form.stock_quantity}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount" className="text-sm font-medium">
                Discount (%)
              </Label>
              <Input
                id="discount"
                type="number"
                name="discount"
                placeholder="0"
                value={form.discount}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Attributes Section */}
        <div className="space-y-5 p-5 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Product Attributes
          </h3>

          {/* Tick Selection (Colors / Sizes / Fabrics / Fits) */}
          <div className="grid grid-cols-1 gap-5">
            {[
              { label: "Colors", options: colorOptions, field: "colors" },
              { label: "Sizes", options: sizeOptions, field: "sizes" },
              { label: "Fabrics", options: fabricOptions, field: "fabrics" },
              { label: "Fits", options: fitOptions, field: "fits" },
            ].map(({ label, options, field }) => (
              <div key={field} className="space-y-3">
                <Label className="text-sm font-medium">{label}</Label>
                <div className="flex flex-wrap gap-3">
                  {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${field}-${option}`}
                        checked={form[field].includes(option)}
                        onCheckedChange={() =>
                          handleCheckboxGroup(field, option)
                        }
                      />
                      <Label
                        htmlFor={`${field}-${option}`}
                        className="text-sm cursor-pointer whitespace-nowrap"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Model Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
            <div className="space-y-2">
              <Label htmlFor="model_height" className="text-sm font-medium">
                Model Height
              </Label>
              <Input
                id="model_height"
                type="text"
                name="model_height"
                placeholder="e.g., 5'8\"
                value={form.model_height}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model_wears" className="text-sm font-medium">
                Model Wears Size
              </Label>
              <Input
                id="model_wears"
                type="text"
                name="model_wears"
                placeholder="e.g., M"
                value={form.model_wears}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Settings Section */}
        <div className="space-y-5 p-5 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Additional Settings
          </h3>

          {/* Switches */}
          <div className="flex items-center space-x-2">
            <Switch
              id="whats_new"
              checked={form.whats_new === 1} // ✅ boolean convert
              onCheckedChange={
                (val) => setForm({ ...form, whats_new: val ? 1 : 0 }) // ✅ DB me int save karna ho to
              }
            />
            <Label htmlFor="whats_new" className="cursor-pointer text-sm">
              What's New
            </Label>
            
            {/* Is special */}
            <div className="flex items-center space-x-2">
              <Switch
                id="is_special"
                checked={form.is_special === 1} // ✅ switch tab ON hoga jab value 1 ho
                onCheckedChange={
                  (val) => setForm({ ...form, is_special: val ? 1 : 0 }) // ✅ true → 1, false → 0
                }
              />
              <Label htmlFor="is_special" className="cursor-pointer text-sm">
                Is Special
              </Label>
            </div>
          </div>

          {/* Tags + Trending */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sm font-medium">
                Tags
              </Label>
              <Input
                id="tags"
                type="text"
                name="tags"
                placeholder="tag1, tag2, tag3"
                value={form.tags}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500">Separate tags with commas</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="trending_product" className="text-sm font-medium">
                Trending Product
              </Label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <input
                    type="radio"
                    id="trending_no"
                    name="trending_product"
                    value="0"
                    checked={form.trending_product == 0}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="trending_no" className="text-sm">
                    No
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <input
                    type="radio"
                    id="trending_yes"
                    name="trending_product"
                    value="1"
                    checked={form.trending_product == 1}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="trending_yes" className="text-sm">
                    Yes
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-5 p-5 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Product Images
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Upload Images</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-md cursor-pointer bg-white border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-4 pb-5">
                    <Plus className="w-6 h-6 mb-2 text-gray-400" />
                    <p className="mb-1 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <Input
                    id="dropzone-file"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            {previewUrls.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Image Previews</Label>
                <div className="flex gap-3 flex-wrap mt-2">
                  {previewUrls.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-md overflow-hidden border shadow-sm"
                    >
                      <img
                        src={url}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button type="submit" className="w-full py-4 text-base font-medium">
            Create Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
