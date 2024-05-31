import React from "react";
import { Line } from "react-chartjs-2";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const months = [
  { month_name: "January", counts: 0 },
  { month_name: "February", counts: 0 },
  { month_name: "March", counts: 0 },
  { month_name: "April", counts: 0 },
  { month_name: "May", counts: 0 },
  { month_name: "June", counts: 0 },
  { month_name: "July", counts: 0 },
  { month_name: "August", counts: 0 },
  { month_name: "September", counts: 0 },
  { month_name: "October", counts: 0 },
  { month_name: "November", counts: 0 },
  { month_name: "December", counts: 0 },
];

console.log(months);

export default function App({ data }) {
  // Merge the initial months array with additional data
  const mergedData = [...months];
  data.forEach((item) => {
    const index = months.findIndex((month) => month.month_name === item.month_name);
    if (index !== -1) {
      mergedData[index] = item;
    }
  });

  console.log("merged data", mergedData);

  return (
    <ResponsiveContainer width="100%" height="95%">
      <BarChart width={150} height={40} data={mergedData}>
        <XAxis dataKey="month_name" scale="band" />
        <YAxis />
        <Line type="monotone" dataKey="counts" stroke="#ff7300" />
        <Tooltip />
        <Legend />
        <Bar dataKey="counts" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
