import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Chart = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState("daily");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/data.json");
      setData(result.data);
    };
    fetchData();
  }, []);

  const handleClick = (data) => {
    alert(`Value: ${data.value}`);
  };

  const filteredData = data.filter((item) => {
    // Apply timeframe filtering logic here
    return true; // Placeholder for filtering logic
  });

  return (
    <div>
      <div>
        <button onClick={() => setTimeframe("daily")}>Daily</button>
        <button onClick={() => setTimeframe("weekly")}>Weekly</button>
        <button onClick={() => setTimeframe("monthly")}>Monthly</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData} onClick={handleClick}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const exportChart = () => {
  html2canvas(document.querySelector(".recharts-wrapper")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("chart.pdf");
  });
};

return (
  <div>
    {/* Other UI elements */}
    <button onClick={exportChart}>Export as PDF</button>
  </div>
);
