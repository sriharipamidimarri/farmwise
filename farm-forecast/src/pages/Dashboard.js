import React, { useState } from "react";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const commodities = [
    { name: "Paddy", icon: "🌾" },
    { name: "Wheat", icon: "🌾" },
    { name: "Barley", icon: "🌾" },
    { name: "Coconut", icon: "🥥" },
    { name: "Soybean", icon: "🌱" },
    { name: "Mustard Seeds", icon: "🌱" },
    { name: "Sugarcane", icon: "🍬" },
    { name: "Ragi", icon: "🌾" },
    { name: "Moong", icon: "🌱" },
    { name: "Maize", icon: "🌽" },
    { name: "Sunflower", icon: "🌻" },
  ];

  const filteredCommodities = commodities.filter((commodity) =>
    commodity.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Top Section */}
      <div className="bg-gray-200 p-6">
        <h1 className="text-3xl font-bold text-center">Commodity Dashboard</h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 shadow rounded flex justify-between items-center">
            <span>Copra</span>
            <span className="text-green-500 font-semibold">₹5814.0 (+2.89%)</span>
          </div>
          <div className="bg-white p-4 shadow rounded flex justify-between items-center">
            <span>Barley</span>
            <span className="text-red-500 font-semibold">₹1117.2 (-2.89%)</span>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50">
        {/* Top Gainers */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Top Gainers (Current Trends)</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">Item Name</th>
                <th className="border-b p-2">Price (per Qt.)</th>
                <th className="border-b p-2">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Niger</td>
                <td className="p-2">₹4889.5</td>
                <td className="p-2 text-green-500">+6.72%</td>
              </tr>
              <tr>
                <td className="p-2">Sesamum</td>
                <td className="p-2">₹5934.6</td>
                <td className="p-2 text-green-500">+5.53%</td>
              </tr>
              <tr>
                <td className="p-2">Jute</td>
                <td className="p-2">₹3043.48</td>
                <td className="p-2 text-green-500">+5.21%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Top Losers */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Top Losers (Current Trends)</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">Item Name</th>
                <th className="border-b p-2">Price (per Qt.)</th>
                <th className="border-b p-2">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Copra</td>
                <td className="p-2">₹10822.2</td>
                <td className="p-2 text-red-500">-2.97%</td>
              </tr>
              <tr>
                <td className="p-2">Soybean</td>
                <td className="p-2">₹3143.8</td>
                <td className="p-2 text-red-500">-2.86%</td>
              </tr>
              <tr>
                <td className="p-2">Gram</td>
                <td className="p-2">₹3710.0</td>
                <td className="p-2 text-red-500">-2.36%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-6 mx-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Explore by Commodity</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for a commodity..."
            className="w-full p-3 border rounded shadow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredCommodities.map((commodity, index) => (
            <div
              key={index}
              className="bg-gray-300 hover: p-4 py-10 shadow rounded flex justify-center items-center text-center"
            >
              <span className="text-2xl mr-2">{commodity.icon}</span>
              <span className="font-semibold">{commodity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
