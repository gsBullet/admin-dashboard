import React, { useContext, useEffect, useState } from "react";
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
  Loader,
} from "lucide-react";
import { Modal } from "../ui/modal";
import BdDateFormate from "./BdDateFormate";
import { getAllPaymentOrdersByUser } from "../../service/generalUsers";
import { AuthContext } from "../../context/AuthContext";
import bdTimeFormat from "./bdTimeFormat";
import TablePagination from "../../pages/Tables/TablePagination";

export default function CustomerProfile({ isOpen, setIsOpen, selectUser }) {
  const { auth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalOrders, setTotalOrders] = useState(0);

  const [statusCount, setStatusCount] = useState({
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });

  const customerInfo = selectUser || {};
  const customerAdress = customerInfo?.addresses?.[0] || {};
  // console.log(currentPage);
  useEffect(() => {
    if (!customerInfo?._id) return;
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await getAllPaymentOrdersByUser({
          token: auth.token,
          userId: customerInfo?._id,
          limit,
          currentPage,
          searchTerm,
          activeTab,
        });

        if (response?.success) {
          setOrders(response.data.orders);
          setTotalOrders(response.data.totalItems);
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
           setStatusCount(response.data.statusCount);
          console.log(currentPage);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [
    customerInfo?._id,
    auth?.token,
    currentPage,
    limit,
    searchTerm,
    activeTab,
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "pending":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "confirmed":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
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
      value: 14,
      icon: ShoppingBag,
      color: "from-violet-500 to-purple-600",
      bgGlow: "bg-violet-500/20",
    },
    {
      label: "Total Spent",
      value: 4500,
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (limit) => {
    setLimit(limit);
    setCurrentPage(1);
  };

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
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white rounded-full animate-spin-slow blur-md"></div>
                  <img
                    src={customerInfo.avatar}
                    alt={customerInfo.name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-white/30 shadow-2xl"
                  />
                  {customerInfo.isVerified && (
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
                    {customerInfo.activeUserStatus?.toUpperCase()}
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
                          <div className="text-xl font-bold text-white mb-1">
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

                          <p className="text-white font-medium break-all">
                            {customerInfo.email}
                          </p>
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

                          <p className="text-white font-medium">
                            {customerInfo.phone}
                          </p>
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
                          <p className="text-white font-medium">
                            {customerAdress.address +
                              ", " +
                              customerAdress.city +
                              ", " +
                              customerAdress.state +
                              ", " +
                              customerAdress.country}
                          </p>
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
                            {BdDateFormate(customerInfo.createdAt)}
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
                            {customerInfo.activeUserStatus?.toUpperCase()}
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
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500  rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              Order History
            </h3>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-8 p-2 bg-white/5 rounded-2xl border border-white/10">
              {[
                { key: "all", label: `All Orders (${statusCount.all || 0})` },
                {
                  key: "pending",
                  label: `Pending (${statusCount.pending || 0})`,
                },
                {
                  key: "confirmed",
                  label: `Confirmed (${statusCount.confirmed || 0})`,
                },
                {
                  key: "delivered",
                  label: `Delivered (${statusCount.delivered || 0})`,
                },
                {
                  key: "cancelled",
                  label: `Cancelled (${statusCount.cancelled || 0})`,
                },
                {
                  key: "returned",
                  label: `Returned (${statusCount.returned || 0})`,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500  text-white shadow-lg shadow-purple-500/30"
                      : "text-purple-300 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modern Table */}
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border-b border-white/10">
                          <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                            Serial
                          </th>{" "}
                          <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                            Transaction ID
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                            Total Amount
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                            Items
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                            Payment
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                            Order Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                            Execute Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {orders.map((order, idx) => (
                          <tr
                            key={order._id}
                            className="group hover:bg-white/5 transition-all duration-300 animate-fade-in"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                          >
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span className="text-white font-mono text-sm font-medium">
                                {(currentPage - 1) * limit + idx + 1}
                              </span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                  <Package className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-white font-mono text-sm font-medium">
                                  {order.trxId}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span className="text-emerald-400 font-bold text-lg">
                                ৳{order.totalAmount}
                              </span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                                  <span className="text-purple-300 font-bold text-sm">
                                    {order.quantity}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-purple-200 text-sm font-medium border border-white/20">
                                {order.paymentMethod}
                              </span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span
                                className={`px-4 py-2 rounded-xl text-sm font-bold border backdrop-blur-sm ${getStatusColor(
                                  order.status
                                )} shadow-lg`}
                              >
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center justify-center gap-2 text-purple-300 flex-wrap">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {bdTimeFormat(order.createdAt)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center justify-center  gap-2 text-purple-300 flex-wrap">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium ">
                                  {bdTimeFormat(order.updatedAt)}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Empty State */}
                  {orders?.length === 0 && (
                    <div className="py-16 text-center">
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-10 h-10 text-purple-400" />
                      </div>
                      <p className="text-purple-300 text-lg font-medium">
                        No orders found
                      </p>
                      <p className="text-purple-400 text-sm mt-2">
                        Try adjusting your filters
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <TablePagination
                    totalItems={totalOrders}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={limit}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                  />
                </div>
              </>
            )}
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
