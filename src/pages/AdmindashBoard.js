import React, { useState, useEffect } from "react";
import "./pagecss/AdminDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../component/fetchData/FetchData";

const AdminDashboard = () => {
  const [busData, setBusData] = useState([]); // State for bus data
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // React Router's navigate function

  // Fetch data from the API
  useEffect(() => {
    const getBuses = async () => {
      try {
        const data = await fetchData();

        // Check if 'routes' exists and is an array
        if (data && Array.isArray(data.record.routes)) {
          setBusData(data.record.routes[0]);
          setLoading(false); // Data is loaded, set loading to false
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

  // Filter buses based on search query
  const filteredRoutes = busData.filter(
    (route) =>
      route.routeName && // Ensure routeName is defined
      route.routeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="management-panel">
        <h2 className="panel-title">Bus Management</h2>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Route Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Routes List */}
        <ul className="bus-list">
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <li key={route.id} className="bus-item">
                <div className="bus-details">
                  <p>
                    <strong>Route:</strong> {route.routeName}
                  </p>
                  <p>
                    <strong>Total Buses:</strong> {route.totalBuses}
                  </p>
                </div>
                <div className="status-and-action">
                  <div className={`status-circle ${route.status}`}></div>
                  <button
                    className="manage-button"
                    onClick={() => navigate(`/manage`, { state: { route } })}
                  >
                    Manage
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="no-results">No routes found for the given search.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
