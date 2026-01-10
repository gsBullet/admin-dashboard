import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Package,
  CheckCircle,
  Edit2,
  Save,
  ShoppingBag,
  Calendar,
  TrendingUp,
  Award,
  Crown,
  Star,
} from "lucide-react";
import { Modal } from "../ui/modal";

export default function CustomerProfile({isOpen,setIsOpen,selectUser}) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const customerInfo = selectUser || {};
  console.log(customerInfo);
  

  const [customer, setCustomer] = useState({
    name: "Alexandra Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    totalOrders: 42,
    verified: true,
    totalSpent: 3542.75,
    memberSince: "January 2021",
    loyaltyStatus: "Gold Member",
    image:
      "https://picsum.photos/seed/customer123/200/200.jpg",
  });

  const orders = [
    {
      id: "ORD-2023-089",
      product: "Premium Cotton T-Shirt",
      description: "Black, Size L, 100% Cotton",
      price: "129.99",
      date: "Jan 15, 2026",
      status: "delivered",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    },
    {
      id: "ORD-2023-088",
      product: "Denim Jacket",
      description: "Blue, Size M, Classic Fit",
      price: "249.99",
      date: "Jan 10, 2026",
      status: "delivered",
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=200&h=200&fit=crop",
    },
    {
      id: "ORD-2023-087",
      product: "Summer Dress",
      description: "Floral Print, Size S",
      price: "89.99",
      date: "Jan 05, 2026",
      status: "processing",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
    },
    {
      id: "ORD-2023-086",
      product: "Wool Sweater",
      description: "Gray, Size M, Merino",
      price: "79.99",
      date: "Dec 28, 2025",
      status: "processing",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&h=200&fit=crop",
    },
    {
      id: "ORD-2023-085",
      product: "Cargo Pants",
      description: "Khaki, Size 32",
      price: "64.99",
      date: "Dec 20, 2025",
      status: "cancelled",
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=200&fit=crop",
    },
    {
      id: "ORD-2023-084",
      product: "Leather Boots",
      description: "Brown, Size 10",
      price: "159.99",
      date: "Dec 15, 2025",
      status: "returned",
      image:
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&h=200&fit=crop",
    },
  ];

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const handleSave = () => {
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "returned":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const stats = [
    {
      label: "Total Orders",
      value: customer.totalOrders,
      icon: ShoppingBag,
      color: "from-violet-500 to-purple-600",
      bgGlow: "bg-violet-500/20",
    },
    {
      label: "Total Spent",
      value: `$${customer.totalSpent.toFixed(0)}`,
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
      bgGlow: "bg-emerald-500/20",
    },
    {
      label: "Years Active",
      value: "2.5",
      icon: Calendar,
      color: "from-blue-500 to-cyan-600",
      bgGlow: "bg-blue-500/20",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="max-w-[1200px] h-[85vh] overflow-y-auto m-4"
    >
      <div className="min-h-screen bg-gradient-to-br bg-gray-900    p-4 md:p-8">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-semibold">
                {customerInfo.name}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-4">
              Customer Profile
            </h1>
            <p className="text-purple-300 text-lg">
              Complete customer management and analytics
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                {/* Profile Image */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full animate-spin-slow blur-md"></div>
                  <img
                    src={customerInfo.avatar}
                    alt={customerInfo.name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-white/30 shadow-2xl"
                  />
                  {customer.verified && (
                    <div className="absolute bottom-2 right-2 bg-emerald-500 rounded-full p-2 border-4 border-slate-950 shadow-lg animate-bounce">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-white text-center mb-2">
                  {customerInfo.name}
                </h2>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 font-semibold">
                    {customerInfo.activeUserStatus}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="relative group">
                        <div
                          className={`absolute inset-0 ${stat.bgGlow} rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100`}
                        ></div>
                        <div className="relative bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all text-center">
                          <Icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs text-purple-300">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-5 h-5" /> Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-5 h-5" /> Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl h-full">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-purple-300 text-sm mb-2">
                            Email Address
                          </p>
                          {isEditing ? (
                            <input
                              type="email"
                              value={customer.email}
                              onChange={(e) =>
                                setCustomer({
                                  ...customer,
                                  email: e.target.value,
                                })
                              }
                              className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          ) : (
                            <p className="text-white font-medium break-all">
                              {customerInfo.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-purple-300 text-sm mb-2">
                            Phone Number
                          </p>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={customer.phone}
                              onChange={(e) =>
                                setCustomer({
                                  ...customer,
                                  phone: e.target.value,
                                })
                              }
                              className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          ) : (
                            <p className="text-white font-medium">
                              {customerInfo.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2 group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-purple-300 text-sm mb-2">
                            Shipping Address
                          </p>
                          {isEditing ? (
                            <textarea
                              value={customer.address}
                              onChange={(e) =>
                                setCustomer({
                                  ...customer,
                                  address: e.target.value,
                                })
                              }
                              className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                            />
                          ) : (
                            <p className="text-white font-medium">
                              {customer.address}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-purple-300 text-sm mb-2">
                            Member Since
                          </p>
                          <p className="text-white font-medium">
                            {customerInfo.createdAt.split("T")[0] || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Loyalty Status */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-purple-300 text-sm mb-2">
                            Loyalty Status
                          </p>
                          <p className="text-white font-medium">
                            {customerInfo.activeUserStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              Order History
            </h3>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-8 p-2 bg-white/5 rounded-2xl border border-white/10">
              {[
                { key: "all", label: `All Orders (${orders.length})` },
                { key: "delivered", label: "Delivered" },
                { key: "processing", label: "Processing" },
                { key: "cancelled", label: "Cancelled" },
                { key: "returned", label: "Returned" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                      : "text-purple-300 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="group relative bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all blur-xl"></div>

                  <div className="relative flex flex-col md:flex-row md:items-center gap-6 justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/10 shadow-lg">
                          <img
                            src={order.image}
                            alt={order.product}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="text-white font-bold text-xl mb-2">
                          {order.product}
                        </h4>
                        <p className="text-purple-300 text-sm mb-3">
                          {order.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-purple-400 font-medium">
                            {order.id}
                          </span>
                          <span className="text-purple-500">•</span>
                          <span className="text-purple-400">{order.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-purple-300 text-sm mb-1">Price</p>
                        <p className="text-white font-bold text-3xl">
                          ${order.price}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-5 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                            order.status
                          )} capitalize`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `}</style>
      </div>
    </Modal>
  );
}
