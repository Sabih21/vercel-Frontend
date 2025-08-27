import { Package, ShoppingCart, Users } from "lucide-react"; // icons

export default function DashboardHome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Products */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition">
        <div>
          <h2 className="text-gray-500 text-sm font-medium">Total Products</h2>
          <p className="text-2xl font-bold text-gray-800">15</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <Package className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Total Orders */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition">
        <div>
          <h2 className="text-gray-500 text-sm font-medium">Total Orders</h2>
          <p className="text-2xl font-bold text-gray-800">20</p>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <ShoppingCart className="w-6 h-6 text-green-600" />
        </div>
      </div>

      {/* Total Users */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition">
        <div>
          <h2 className="text-gray-500 text-sm font-medium">Total Users</h2>
          <p className="text-2xl font-bold text-gray-800">3</p>
        </div>
        <div className="bg-purple-100 p-3 rounded-full">
          <Users className="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </div>
  );
}
