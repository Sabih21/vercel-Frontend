import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Upload, ArrowLeft } from "lucide-react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample product data - in real app you would fetch this
  const sampleProduct = {
    id: 1,
    name: "Classic White T-Shirt",
    sku: "TSH-WHT-001",
    productImg: [
      "https://example.com/images/tshirt1.jpg",
      "https://example.com/images/tshirt2.jpg"
    ],
    category: "Clothing",
    price: "15",
    discount: "10",
    stock_quantity: "75",
    description: "Soft cotton white t-shirt, perfect for casual wear.",
    brand: "FashionHub",
    colors: ["White", "Black"],
    fabrics: ["Cotton"],
    fits: ["Regular"],
    sizes: ["S", "M"],
    model_height: "5'11\"",
    model_wears: "M",
    tags: ["Summer", "Casual"]
  };

  const [product, setProduct] = useState(sampleProduct);
  const [newColor, setNewColor] = useState("");
  const [newFabric, setNewFabric] = useState("");
  const [newFit, setNewFit] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newTag, setNewTag] = useState("");
  const [productImages, setProductImages] = useState(sampleProduct.productImg);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the product data here
    // fetchProduct();
  }, [id]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setProductImages([...productImages, ...imageUrls]);
  };

  const removeImage = (index) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
  };

  const addColor = () => {
    if (newColor.trim() && !product.colors.includes(newColor.trim())) {
      setProduct({
        ...product,
        colors: [...product.colors, newColor.trim()]
      });
      setNewColor("");
    }
  };

  const addFabric = () => {
    if (newFabric.trim() && !product.fabrics.includes(newFabric.trim())) {
      setProduct({
        ...product,
        fabrics: [...product.fabrics, newFabric.trim()]
      });
      setNewFabric("");
    }
  };

  const addFit = () => {
    if (newFit.trim() && !product.fits.includes(newFit.trim())) {
      setProduct({
        ...product,
        fits: [...product.fits, newFit.trim()]
      });
      setNewFit("");
    }
  };

  const addSize = () => {
    if (newSize.trim() && !product.sizes.includes(newSize.trim())) {
      setProduct({
        ...product,
        sizes: [...product.sizes, newSize.trim()]
      });
      setNewSize("");
    }
  };

  const addTag = () => {
    if (newTag.trim() && !product.tags.includes(newTag.trim())) {
      setProduct({
        ...product,
        tags: [...product.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeItem = (field, index) => {
    const updatedList = [...product[field]];
    updatedList.splice(index, 1);
    setProduct({
      ...product,
      [field]: updatedList
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, you would submit the form data here
    console.log("Submitting:", {
      ...product,
      productImg: productImages
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/products");
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate("/dashboard/manage-products")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>
        <Button 
          variant="outline"
          onClick={() => navigate("/dashboard/manage-products")}
        >
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name" 
                  required
                />
              </div>

              <div>
                <Label htmlFor="sku">SKU *</Label>
                <Input 
                  id="sku" 
                  name="sku"
                  value={product.sku}
                  onChange={handleChange}
                  placeholder="Enter SKU" 
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={product.category}
                  onValueChange={(value) => setProduct({...product, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Footwear">Footwear</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Input 
                  id="brand" 
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  placeholder="Enter brand" 
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter product description" 
                  rows={4} 
                  required
                />
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="0.00" 
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input 
                    id="discount" 
                    type="number" 
                    name="discount"
                    value={product.discount}
                    onChange={handleChange}
                    placeholder="0" 
                    min="0" 
                    max="100" 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="stock_quantity">Stock Quantity *</Label>
                <Input 
                  id="stock_quantity" 
                  type="number" 
                  name="stock_quantity"
                  value={product.stock_quantity}
                  onChange={handleChange}
                  placeholder="0" 
                  min="0"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="model_height">Model Height</Label>
                  <Input 
                    id="model_height" 
                    name="model_height"
                    value={product.model_height}
                    onChange={handleChange}
                    placeholder="5'11\" 
                  />
                </div>
                <div>
                  <Label htmlFor="model_wears">Model Wears Size</Label>
                  <Input 
                    id="model_wears" 
                    name="model_wears"
                    value={product.model_wears}
                    onChange={handleChange}
                    placeholder="M" 
                  />
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="md:col-span-2">
              <Label>Product Images *</Label>
              <div className="mt-2">
                <div className="flex flex-wrap gap-4 mb-4">
                  {productImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${index}`}
                        className="h-32 w-32 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB each)</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            {/* Variants */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Colors */}
              <div>
                <Label>Colors</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Add color"
                  />
                  <Button type="button" onClick={addColor}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span>{color}</span>
                      <button
                        type="button"
                        onClick={() => removeItem('colors', index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fabrics */}
              <div>
                <Label>Fabrics</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newFabric}
                    onChange={(e) => setNewFabric(e.target.value)}
                    placeholder="Add fabric"
                  />
                  <Button type="button" onClick={addFabric}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.fabrics.map((fabric, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span>{fabric}</span>
                      <button
                        type="button"
                        onClick={() => removeItem('fabrics', index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fits */}
              <div>
                <Label>Fits</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newFit}
                    onChange={(e) => setNewFit(e.target.value)}
                    placeholder="Add fit"
                  />
                  <Button type="button" onClick={addFit}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.fits.map((fit, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span>{fit}</span>
                      <button
                        type="button"
                        onClick={() => removeItem('fits', index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <Label>Sizes</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Add size"
                  />
                  <Button type="button" onClick={addSize}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map((size, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span>{size}</span>
                      <button
                        type="button"
                        onClick={() => removeItem('sizes', index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                  />
                  <Button type="button" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeItem('tags', index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end gap-4">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => navigate("/dashboard/products")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}