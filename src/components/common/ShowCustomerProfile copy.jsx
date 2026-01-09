import React from "react";
import {
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  Star,
  Package,
  CreditCard,
  Shield,
  TrendingUp,
  Edit,
  Send,
  Bell,
  Award,
} from "lucide-react";
import { Modal } from "../ui/modal";
import { useState } from "react";

const CustomerProfile = ({ isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [customerData, setCustomerData] = useState({
    name: "Alexandra Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    image: "https://picsum.photos/seed/customer123/200/200.jpg",
    verified: true,
    totalOrders: 42,
    totalSpent: 3542.75,
    memberSince: "January 2021",
  });

  const [orders, setOrders] = useState([
    {
      id: "ORD-2023-089",
      name: "Premium Wireless Headphones",
      date: "2023-11-15",
      price: 129.99,
      status: "delivered",
      image: "https://picsum.photos/seed/headphones/60/60.jpg",
    },
    {
      id: "ORD-2023-088",
      name: "Smart Watch Series 5",
      date: "2023-11-10",
      price: 249.99,
      status: "delivered",
      image: "https://picsum.photos/seed/watch/60/60.jpg",
    },
    {
      id: "ORD-2023-087",
      name: "Organic Coffee Beans",
      date: "2023-11-05",
      price: 24.99,
      status: "delivered",
      image: "https://picsum.photos/seed/coffee/60/60.jpg",
    },
    {
      id: "ORD-2023-086",
      name: "Yoga Mat Premium",
      date: "2023-10-28",
      price: 39.99,
      status: "delivered",
      image: "https://picsum.photos/seed/yoga/60/60.jpg",
    },
    {
      id: "ORD-2023-087",
      name: "Bluetooth Speaker",
      date: "2023-10-20",
      price: 79.99,
      status: "cancelled",
      image: "https://picsum.photos/seed/speaker/60/60.jpg",
    },
    {
      id: "ORD-2023-088",
      name: "Bluetooth Speaker",
      date: "2023-10-20",
      price: 79.99,
      status: "cancelled",
      image: "https://picsum.photos/seed/speaker/60/60.jpg",
    },
    {
      id: "ORD-2023-089",
      name: "Bluetooth Speaker",
      date: "2023-10-20",
      price: 79.99,
      status: "returned",
      image: "https://picsum.photos/seed/speaker/60/60.jpg",
    },
    {
      id: "ORD-2023-090",
      name: "Bluetooth Speaker",
      date: "2023-10-20",
      price: 79.99,
      status: "returned",
      image: "https://picsum.photos/seed/speaker/60/60.jpg",
    },
    {
      id: "ORD-2023-091",
      name: "Bluetooth Speaker",
      date: "2023-10-20",
      price: 79.99,
      status: "processing",
      image: "https://picsum.photos/seed/speaker/60/60.jpg",
    },
    {
      id: "ORD-2023-092",
      name: "Bluetooth Speaker",
      date: "2023-10-20",
      price: 79.99,
      status: "processing",
      image: "https://picsum.photos/seed/speaker/60/60.jpg",
    },
  ]);

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-[1200px] h-[95vh] overflow-y-auto m-4"
      >
        <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-5 md:p-8 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 text-gray-800 dark:text-white/90">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                Customer Profile
              </h1>
              <p className="text-lg opacity-90">
                Manage customer information and view order history
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-1">
                <div className="border border-indigo-700 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <img
                      src={customerData.image}
                      alt={customerData.name}
                      className="w-full h-full rounded-full object-cover border-4 border-gray-100"
                    />
                    {customerData.verified && (
                      <div className="absolute bottom-3 right-3 w-10 h-10 bg-success rounded-full flex items-center justify-center shadow-lg bg-success-600">
                        <i className="fas fa-check text-white"></i>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2 dark:text-white/90">
                    {customerData.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mb-6 text-success font-medium dark:text-gray-400">
                    <i className="fas fa-check-circle text-success-800"></i>
                    <span>Verified Customer</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 transition-colors dark:hover:bg-gray-700">
                      <div className="text-2xl font-bold text-primary dark:text-white/90">
                        {customerData.totalOrders}
                      </div>
                      <div className="text-xs text-gray-800 dark:text-white/90 mt-1">
                        Total Orders
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 transition-colors dark:hover:bg-gray-700">
                      <div className="text-2xl font-bold text-primary dark:text-white/90">
                        ${customerData.totalSpent.toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 dark:text-white/90">
                        Total Spent
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 transition-colors dark:hover:bg-gray-700">
                      <div className="text-2xl font-bold text-primary dark:text-white/90">
                        2.5
                      </div>
                      <div className="text-xs text-gray-500 mt-1 dark:text-white/90">
                        Years
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    <i className="fas fa-edit"></i> Edit Profile
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="border border-indigo-700 rounded-2xl shadow-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3 dark:text-white/90">
                    <i className="fas fa-user-circle dark:text-white/90"></i>
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary dark:text-white/90 text-gray-800 rounded-lg flex items-center justify-center">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <div className="text-xs dark:text-white/90 text-gray-800 mb-1">
                          Email
                        </div>
                        <div className="font-medium text-gray-800 dark:text-white/90 ">
                          {customerData.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary dark:text-white/90 text-gray-800 rounded-lg flex items-center justify-center">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div>
                        <div className="text-xs dark:text-white/90 text-gray-800 mb-1">
                          Phone
                        </div>
                        <div className="font-medium text-gray-800 dark:text-white/90">
                          {customerData.phone}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary dark:text-white/90 text-gray-800 rounded-lg flex items-center justify-center">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <div className="text-xs text-gray-800 mb-1 dark:text-white/90">
                          Address
                        </div>
                        <div className="font-medium text-gray-800 dark:text-white/90">
                          {customerData.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary dark:text-white/90 text-gray-800 rounded-lg flex items-center justify-center">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <div>
                        <div className="text-xs text-gray-800 dark:text-white/90 mb-1">
                          Member Since
                        </div>
                        <div className="font-medium text-gray-800 dark:text-white/90">
                          {customerData.memberSince}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary dark:text-white/90 text-gray-800 rounded-lg flex items-center justify-center">
                        <i className="fas fa-star"></i>
                      </div>
                      <div>
                        <div className="text-xs text-gray-800 dark:text-white/90 mb-1">
                          Loyalty Status
                        </div>
                        <div className="font-medium text-gray-800 dark:text-white/90">
                          Gold Member
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" border border-indigo-700 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <i className="fas fa-shopping-bag text-primary"></i>
                Order History
              </h3>
              <div className="flex gap-3 mb-6 border-b border-gray-200">
                <button
                  className={`pb-3 px-5 font-medium transition-colors ${
                    activeTab === "all"
                      ? "text-primary border-b-3 border-primary dark:text-white/90 dark:hover:text-white/70"
                      : "text-gray-600 hover:text-gray-700 "
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Orders ({orders.length})
                </button>
                <button
                  className={`pb-3 px-5 font-medium transition-colors ${
                    activeTab === "delivered"
                      ? "text-primary border-b-3 border-primary dark:text-white/90 dark:hover:text-white/70"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("delivered")}
                >
                  Delivered
                </button>
                <button
                  className={`pb-3 px-5 font-medium transition-colors ${
                    activeTab === "processing"
                      ? "text-primary border-b-3 border-primary dark:text-white/90 dark:hover:text-white/70"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("processing")}
                >
                  Processing
                </button>
                <button
                  className={`pb-3 px-5 font-medium transition-colors ${
                    activeTab === "cancelled"
                      ? "text-primary border-b-3 border-primary dark:text-white/90 dark:hover:text-white/70"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("cancelled")}
                >
                  Cancelled
                </button>
                <button
                  className={`pb-3 px-5 font-medium transition-colors ${
                    activeTab === "returned"
                      ? "text-primary border-b-3 border-primary dark:text-white/90 dark:hover:text-white/70"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("returned")}
                >
                  Returned
                </button>
              </div>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 transition-all cursor-pointer hover:translate-x-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={order.image}
                        alt={order.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white/90">
                          {order.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-white/90">
                          {order.id} • {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-xl font-semibold text-primary dark:text-white/90">
                      ${order.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerProfile;
