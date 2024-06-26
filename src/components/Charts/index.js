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
  Brush,
} from "recharts";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ButtonItem from "../ButtonItem";

import "./index.css";

const buttonslist = [
  {
    displayText: "Daily",
    msg: "daily",
    id: 0,
  },
  {
    displayText: "Weekly",
    msg: "weekly",
    id: 1,
  },
  {
    displayText: "Monthly",
    msg: "monthly",
    id: 2,
  },
  {
    displayText: "Export as PDF",
    msg: "pdf",
    id: 3,
  },
];

const Chart = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState("daily");
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/data.json");
      setData(result.data);
    };
    fetchData();
  }, []);

  const exportChart = () => {
    html2canvas(document.querySelector(".recharts-wrapper")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("chart.pdf");
    });
  };

  const filteredData = data.filter((item) => {
    return true;
  });

  const timeFrameButton = (msg, id) => {
    if (msg === "pdf") {
      exportChart();
      setActiveId(id);
    }
    setTimeframe(msg);
    setActiveId(id);
  };

  return (
    <div className="bg-container">
      <div className="header">
        <h1>ChartinGo</h1>
        <div className="buttons-container medium-cont">
          {buttonslist.map((each) => {
            return (
              <ButtonItem
                each={each}
                key={each.id}
                isActive={each.id === activeId}
                timeFrameButton={timeFrameButton}
              />
            );
          })}
        </div>
      </div>

      <div className="buttons-container small-cont">
        {buttonslist.map((each) => {
          return (
            <ButtonItem
              each={each}
              key={each.id}
              isActive={each.id === activeId}
              timeFrameButton={timeFrameButton}
            />
          );
        })}
      </div>

      <div className="responsive-cont">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
