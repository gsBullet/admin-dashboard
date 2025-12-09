import React, { useContext, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import SweetAlert from "../../components/common/SweetAlert";
import { AuthContext } from "../../context/AuthContext";
import { addHeroBanner } from "../../service/heroBanner";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";

const HeroBanner = () => {
  const { auth } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("token", auth.token);
    formData.append("title", e.target.title.value);
    formData.append("desc", e.target.desc.value);
    formData.append("heroImg", e.target.heroImg.files[0]);

    const data = await addHeroBanner(formData);

    setIsSubmitting(false);

    if (data?.data) {
      SweetAlert({
        icon: "success",
        title: data.message,
      });
      e.target.reset();
      setImagePreview(null);
    } else {
      SweetAlert({
        icon: "error",
        title: data.response.data.message,
      });
    }
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <PageMeta
        title="Add Hero Banner"
        description="Create stunning hero banners for your ecommerce platform"
      />

      <div className="max-w-4xl mx-auto">
        <PageBreadcrumb pageTitle="Add Hero Banner" />

        <div className="mt-8  rounded-2xl shadow-xl overflow-hidden border">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-10 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Create Hero Banner</h1>
                <p className="text-indigo-100 text-sm">
                  Design eye-catching banners that convert visitors into
                  customers
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Title Input */}
            <div className="group">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                Banner Title
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Enter a captivating title..."
                className="w-full px-4 py-3 rounded-lg border-2"
                required
              />
            </div>

          

            {/* Full Description Textarea */}
            <div className="group">
              <Label
                htmlFor="desc"
                className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Full Description
              </Label>
              <textarea
                name="desc"
                id="desc"
                placeholder="Provide a detailed description of your banner..."
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 text-slate-700 resize-none dark:text-white/90"
                
              />
            </div>

            {/* Image Upload with Preview */}
            <div className="group">
              <Label
                htmlFor="heroImg"
                className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Hero Image
              </Label>

              <div className="relative">
                <input
                  type="file"
                  name="heroImg"
                  id="heroImg"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />

                <label
                  htmlFor="heroImg"
                  className="flex flex-col items-center justify-center w-full h-64 border-3 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 overflow-hidden group"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          Click to change image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-16 h-16 mb-4 text-slate-400 group-hover:text-indigo-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm font-semibold text-slate-600">
                        <span className="text-indigo-600">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, WEBP (MAX. 5MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Banner...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Create Hero Banner
                  </>
                )}
              </Button>

              <button
                type="reset"
                onClick={() => setImagePreview(null)}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 dark:text-white/90 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8  dark:border-blue-800 dark:bg-slate-800 dark:text-white/90 dark:p-10">
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2 dark:text-white/60">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>
                Use high-resolution images (1920x1080px recommended) for best
                quality
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>
                Keep titles concise and action-oriented to grab attention
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>
                Ensure text is readable with good contrast against the image
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
