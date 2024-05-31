import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function GovernmentSalesChart({ government }) {
  // Assuming `government` is an array of objects where each object has a `gov` property for the name
  // and a `totalSales` property for the total sales figure.
  console.log(government);
  let data = [];
  if (government) {
    data = government?.map((gov) => ({
      name: gov.gov, // name used for x-axis
      totalOrder: gov.totalOrder ? gov.totalOrder : 0,
    }));
  }

  return (
    <ResponsiveContainer width="100%" height={600}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" /> {/* Using government names for the x-axis */}
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="totalOrder" stroke="#8884d8" fill="#8884d8" />
        <Legend />
        {/* <Line type="monotone" dataKey="totalOrder" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}
