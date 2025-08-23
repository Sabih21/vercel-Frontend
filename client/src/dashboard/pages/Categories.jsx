import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../utils/category-api.js";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState([]);
  const [editCategoryImage, setEditCategoryImage] = useState([]);
  const [currentCategoryImages, setCurrentCategoryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Preview state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // 🔹 Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await getAllCategories();
        setCategories(
          Array.isArray(response?.categories) ? response.categories : []
        );
      } catch (error) {
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Edit click
  const handleEditClick = (category) => {
    setCurrentCategory(category);
    const images =
      typeof category.category_img === "string"
        ? JSON.parse(category.category_img)
        : category.category_img || [];
    setCurrentCategoryImages(images);
    setEditCategoryImage([]);
    setIsEditDialogOpen(true);
  };

  // 🔹 Delete click
  const handleDeleteClick = (category) => {
    setCurrentCategory(category);
    setIsDeleteAlertOpen(true);
  };

  // 🔹 Confirm delete
  const handleDeleteConfirm = async () => {
    try {
      await deleteCategory(currentCategory.id);
      setCategories(categories.filter((cat) => cat.id !== currentCategory.id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteAlertOpen(false);
      setCurrentCategory(null);
    }
  };

  // 🔹 Create category
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newCategoryName);
      newCategoryImage.forEach((file) => formData.append("category_img", file));

      const response = await createCategory(formData);
      const newCat = response?.newCategory;

      if (newCat) setCategories([...categories, newCat]);

      setNewCategoryName("");
      setNewCategoryImage([]);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // 🔹 Edit category
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", currentCategory.name);

      if (editCategoryImage.length > 0) {
        editCategoryImage.forEach((file) => formData.append("category_img", file));
      } else {
        formData.append("existing_images", JSON.stringify(currentCategoryImages));
      }

      const response = await updateCategory(currentCategory.id, formData);
      const updatedCat = response?.updatedCategory;

      if (updatedCat)
        setCategories(
          categories.map((cat) => (cat.id === updatedCat.id ? updatedCat : cat))
        );

      setEditCategoryImage([]);
      setCurrentCategoryImages([]);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // 🔹 Preview click
  const handlePreviewClick = (img) => {
    setPreviewImage(img);
    setIsPreviewOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>Add a new product category</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setNewCategoryImage(Array.from(e.target.files))
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Category</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No categories found. Create one to get started.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => {
                      const images =
                        typeof category.category_img === "string"
                          ? JSON.parse(category.category_img)
                          : category.category_img;

                      const imageUrl =
                        Array.isArray(images) && images.length > 0
                          ? `${import.meta.env.VITE_API_URL}${images[0]}`
                          : null;

                      return (
                        <TableRow key={category.id}>
                          <TableCell>{category.id}</TableCell>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>
                            {imageUrl ? (
                              <>
                                <img
                                  src={imageUrl}
                                  alt={category.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <Button
                                  variant="outline"
                                  size="xs"
                                  className="mt-1"
                                  onClick={() => handlePreviewClick(imageUrl)}
                                >
                                  Preview
                                </Button>
                              </>
                            ) : (
                              <span className="text-gray-400 italic">No Image</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditClick(category)}
                              >
                                <Edit className="w-4 h-4" /> Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteClick(category)}
                              >
                                <Trash2 className="w-4 h-4" /> Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {categories.map((category) => {
                  const images =
                    typeof category.category_img === "string"
                      ? JSON.parse(category.category_img)
                      : category.category_img;
                  const imageUrl =
                    Array.isArray(images) && images.length > 0
                      ? `${import.meta.env.VITE_API_URL}${images[0]}`
                      : null;

                  return (
                    <Card key={category.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium">ID: {category.id}</h3>
                          <h3 className="font-medium">{category.name}</h3>
                          {imageUrl && (
                            <>
                              <img
                                src={imageUrl}
                                alt={category.name}
                                className="w-16 h-16 object-cover rounded mt-2"
                              />
                              <Button
                                variant="outline"
                                size="xs"
                                className="mt-1"
                                onClick={() => handlePreviewClick(imageUrl)}
                              >
                                Preview
                              </Button>
                            </>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(category)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(category)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category details below.</DialogDescription>
          </DialogHeader>
          {currentCategory && (
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">Name</Label>
                  <Input
                    id="edit-name"
                    value={currentCategory.name}
                    onChange={(e) =>
                      setCurrentCategory({ ...currentCategory, name: e.target.value })
                    }
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-image" className="text-right">Image</Label>
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setEditCategoryImage(Array.from(e.target.files))}
                    className="col-span-3"
                  />
                  <div className="flex gap-2 mt-2 col-span-3 ml-auto">
                    {currentCategoryImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={`${import.meta.env.VITE_API_URL}${img}`}
                        alt={`img-${idx}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the "{currentCategory?.name}" category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md p-0">
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto object-contain rounded"
            />
          )}
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
