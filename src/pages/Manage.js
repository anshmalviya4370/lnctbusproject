import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { fetchData, updateData } from "../component/fetchData/FetchData";

const Manage = () => {
  const location = useLocation();
  const { route } = location.state || {}; // Get the selected route from state

  const [buses, setBuses] = useState({
    assignedBuses: [],
    unassignedBuses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bus data based on the selected route
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const data = await fetchData();
        const assignedBuses = data.record.buses[0].filter(
          (bus) => bus.routeName === route.routeName
        );
        const unassignedBuses = data.record.buses[0].filter(
          (bus) => !bus.routeName
        );
        console.log(unassignedBuses);

        setBuses({ assignedBuses, unassignedBuses });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching buses:", err);
        setError("Failed to load buses.");
        setLoading(false);
      }
    };

    fetchBuses();
  }, [route]);

  // Function to assign the top unassigned bus to the route
  const assignTopUnassignedBus = async () => {
    if (buses.unassignedBuses.length > 0) {
      const topBus = buses.unassignedBuses[0];
      const updatedBus = {
        ...topBus,
        routeName: route.routeName,
        status: "assigned",
      };

      try {
        // Log the payload to check the bus update details
        console.log("Payload to updateData:", {
          buses: buses.unassignedBuses.map((bus) =>
            bus.id === topBus.id ? updatedBus : bus
          ),
        });

        // Call the updateData function to assign the bus
        const response = await updateData({
          buses: buses.unassignedBuses.map((bus) =>
            bus.id === topBus.id ? updatedBus : bus
          ),
        });

        // Log the response to check if it's successful
        console.log("API response:", response);

        // Update local state after successful API call
        setBuses((prev) => ({
          assignedBuses: [...prev.assignedBuses, updatedBus],
          unassignedBuses: prev.unassignedBuses.slice(1),
        }));
      } catch (err) {
        console.error("Error assigning bus:", err);
        alert(`Failed to assign bus. Error: ${err.message}`);
      }
    } else {
      alert("No unassigned buses available.");
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="route-panel-container">
      <h1 className="route-name">{route.routeName}</h1>
      <div className="assigned-buses">
        <h2>Assigned Buses</h2>
        <ul className="bus-list">
          {buses.assignedBuses.map((bus) => (
            <li key={bus.id} className="bus-item">
              <p>
                <strong>Bus Number:</strong> {bus.name}
              </p>
              <p className="manageDelete">
                <strong>Driver Name:</strong> {bus.driverName}{" "}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="assign-bus-section">
        <h2>Assign Buses</h2>
        <button onClick={assignTopUnassignedBus}>
          Assign Top Unassigned Bus
        </button>
      </div>
    </div>
  );
};

export default Manage;
