// import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import SalesTable from './components/SalesTable';
import { useEffect, useState } from 'react';
import { Product } from './util/Product';

export default function App() {
  const [sortedData, setSortedData] = useState<Product>();


  // Load data like fetching from an API. 
  useEffect(() => {
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        setSortedData(data[0]);
      });

  }, []);

  return (
    <div className="flex-row min-h-screen flex w-full bg-gray-50 gap-4 p-10">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md min-h-screen">
      <div className="p-10 justify-center text-center">
        <img
          src={sortedData?.image}
          alt="Magic Bullet NutriBullet"
          className="w-full rounded-lg mb-4"
        />
        <h1 className="text-xl font-bold text-gray-800">{sortedData?.title}</h1>
        <p className="text-gray-600">{sortedData?.subtitle}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {sortedData?.tags.map((tag) => (
            <span
              key={tag}
              className="border border-gray-300 text-gray-600 text-sm px-3 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Draw a line here */}

        </div>
        <hr className="border-gray-300" />

      </div>

      {/* Main Content */}
      <div className="w-3/4">
        {/* Retail Sales Graph */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Retail Sales</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sortedData?.sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weekEnding" />
                <Tooltip />
                <Line type="monotone" dataKey="retailSales" stroke="#4680ff" strokeWidth={2} />
                <Line type="monotone" dataKey="wholesaleSales" stroke="#a0aec0" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Table */}
        <SalesTable sales={sortedData?.sales || []} />
      </div>
    </div>
  );
}
