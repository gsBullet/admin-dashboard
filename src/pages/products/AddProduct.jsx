import React, { useState, useRef } from "react";
import SweetAlert from "../../components/common/SweetAlert";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Axios from "../../service/Axios";
import { fetchAllCategoryForProduct } from "../../service/category";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Refs for file inputs
  const thumbnailInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const res = await fetchAllCategoryForProduct();
      setCategories(res || []);
    } catch (err) {
      console.error(err);
      SweetAlert({ icon: "error", title: "Failed to load categories" });
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  // Handle thumbnail preview
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
  };

  // Handle multiple images preview
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === files.length) {
            setImagePreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setImagePreviews([]);
    }
  };

  // Remove single image from preview
  const removeImagePreview = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);

    // Also update the files input
    if (imagesInputRef.current) {
      const input = imagesInputRef.current;
      const dt = new DataTransfer();

      Array.from(input.files).forEach((file, i) => {
        if (i !== index) {
          dt.items.add(file);
        }
      });

      input.files = dt.files;
    }
  };

  // Clear all image previews
  const clearAllImages = () => {
    setImagePreviews([]);
    if (imagesInputRef.current) {
      imagesInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Text fields
    formData.append("id", e.target.id.value);
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("old_price", e.target.old_price.value);
    formData.append("new_price", e.target.new_price.value);
    formData.append("category", e.target.category.value);
    formData.append("quantity", e.target.quantity.value);
    formData.append("available", e.target.available.value);
    formData.append("status", e.target.status.value);

    // Thumbnail
    if (thumbnailInputRef.current && thumbnailInputRef.current.files[0]) {
      formData.append("thumbnail", thumbnailInputRef.current.files[0]);
    }

    // Images
    if (imagesInputRef.current) {
      const related_images = imagesInputRef.current.files;
      for (let i = 0; i < related_images.length; i++) {
        formData.append("related_images", related_images[i]);
      }
    }

    try {
      const response = await Axios.post("/product/add-product", formData, {
        timeout: 30000,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      

      if (response?.data?.success) {
        SweetAlert({
          icon: "success",
          title: response.data.message,
        });
        e.target.reset();
        setThumbnailPreview(null);
        setImagePreviews([]);
        setSelectedCategory("");
        // Reset file inputs
        if (thumbnailInputRef.current) {
          thumbnailInputRef.current.value = "";
        }
        if (imagesInputRef.current) {
          imagesInputRef.current.value = "";
        }
      } else {
        SweetAlert({
          icon: "error",
          title: "Error",
          text: response?.data?.message || "Failed to add product",
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      SweetAlert({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to add product",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta
        title="Add Product"
        description="Add product page for ecommerce dashboard"
      />
      <PageBreadcrumb pageTitle="Add Product" />
      <ComponentCard title="Add Product" className="max-w-2xl m-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product ID */}
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product ID *
            </label>
            <Input
              type="text"
              name="id"
              id="id"
              placeholder="Enter unique product ID"
              required
            />
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name *
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description *
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter product description"
              rows="3"
              required
              className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent  dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900  dark:focus:border-brand-800"
            />
          </div>

          {/* Price Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Old Price */}
            <div>
              <label
                htmlFor="old_price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Original Price *
              </label>
              <Input
                type="number"
                name="old_price"
                id="old_price"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* New Price */}
            <div>
              <label
                htmlFor="new_price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sale Price *
              </label>
              <Input
                type="number"
                name="new_price"
                id="new_price"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category *
            </label>
            <select
              className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                selectedCategory
                  ? "text-gray-800 dark:text-white/90"
                  : "text-gray-400 dark:text-gray-400"
              } `}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              name="category"
              required
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Thumbnail with Preview */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Thumbnail *
            </label>
            <input
              ref={thumbnailInputRef}
              className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900  dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/3 dark:file:text-gray-400 dark:placeholder:text-gray-400 `}
              accept="image/*"
              type="file"
              name="thumbnail"
              id="thumbnail"
              onChange={handleThumbnailChange}
              required
            />

            {/* Thumbnail Preview */}
            {thumbnailPreview && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Preview:
                </p>
                <div className="relative inline-block">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnailPreview(null);
                      if (thumbnailInputRef.current) {
                        thumbnailInputRef.current.value = "";
                      }
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Product Images with Preview */}
          <div>
            <label
              htmlFor="related_images"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Images *
            </label>
            <input
              ref={imagesInputRef}
              accept="image/*"
              type="file"
              multiple
              name="related_images"
              id="related_images"
              onChange={handleImagesChange}
              required
              className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900  dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/3 dark:file:text-gray-400 dark:placeholder:text-gray-400 `}
            />

            {/* Images Preview */}
            {imagePreviews.length > 0 && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    Images Preview ({imagePreviews.length}):
                  </p>
                  <button
                    type="button"
                    onClick={clearAllImages}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Clear All
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImagePreview(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity *
            </label>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="0"
              min="0"
              required
            />
          </div>

          {/* Availability */}
          <div>
            <label
              htmlFor="available"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Availability
            </label>
            <select
              className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`}
              name="available"
              id="available"
              defaultValue="true"
            >
              <option value="true">Available</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`}
              name="status"
              id="status"
              defaultValue="true"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </Button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
};

export default AddProduct;