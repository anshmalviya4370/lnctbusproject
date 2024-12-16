import React, { useState, useEffect } from "react";
import "./pagecss/BusDetails.css";
import { fetchData } from "../component/fetchData/FetchData";

const BusDetails = () => {
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBuses = async () => {
      try {
        const data = await fetchData();

        if (data && Array.isArray(data.record.buses[0])) {
          setBuses(data.record.buses[0]);
          setLoading(false);
        } else {
          setError("Invalid bus data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching bus data");
        setLoading(false);
      }
    };

    getBuses();
  }, []);

  const filteredBuses = buses.filter((bus) => {
    const busName = bus.routeName?.toLowerCase() || ""; // Handle undefined safely
    const busStatus = bus.status?.toLowerCase() || ""; // Handle undefined safely
    return (
      busName.includes(searchTerm.toLowerCase()) ||
      busStatus.includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="bus-details-container">
      <h1 className="title">Bus Details</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by route name or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="bus-table">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Status</th>
            <th>Route Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuses.map((bus) => (
            <tr key={`${bus.id}-${bus.name}`}>
              <td>{bus.name || "Unknown"}</td>
              <td
                className={`status ${
                  bus.status === "assigned" ? "assigned" : "not-assigned"
                }`}
              >
                {bus.status === "assigned" ? "Assigned" : "Not Assigned"}
              </td>
              <td>{bus.routeName || "N/A"}</td>
            </tr>
          ))}
          {filteredBuses.length === 0 && (
            <tr>
              <td colSpan="3" className="no-results">
                No buses found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BusDetails;
