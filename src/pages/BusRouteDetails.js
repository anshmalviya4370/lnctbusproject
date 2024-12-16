import React, { useEffect, useState } from "react";
import { fetchData } from "../component/fetchData/FetchData"; // Adjust import path accordingly
import "./pagecss/BusRouteDetails.css"; // Custom CSS for styling

const BusRouteDetails = () => {
  const [routeInfo, setRouteInfo] = useState(null); // Store selected route details
  const [assignedBuses, setAssignedBuses] = useState([]); // Store buses assigned to the route
  const [loading, setLoading] = useState(true); // Loading state for API data
  const [error, setError] = useState(null); // Error state for API calls

  useEffect(() => {
    const fetchRouteData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const selectedRoute = urlParams.get("route");

      if (!selectedRoute) {
        setError("No route selected");
        setLoading(false);
        return;
      }

      try {
        const response = await fetchData();

        const routes = response?.record?.routes?.[0] || [];
        const buses = response?.record?.buses?.[0] || [];

        const route = routes.find((r) => r.routeName === selectedRoute);

        if (route) {
          // Find buses assigned to this route
          const busesForRoute = buses.filter(
            (bus) => bus.routeName === selectedRoute
          );
          setAssignedBuses(busesForRoute);

          // Update total buses dynamically
          setRouteInfo({
            ...route,
            totalBuses: busesForRoute.length, // Dynamically calculated total
          });
        } else {
          setError("Route not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching route data");
      } finally {
        setLoading(false);
      }
    };

    fetchRouteData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !routeInfo) {
    return (
      <div className="error-message">{error || "Route data not found"}</div>
    );
  }

  return (
    <div className="route-details-container">
      <header className="route-header">
        <h1>{routeInfo.name}</h1>
        <p className="bus-number">Total Buses: {routeInfo.totalBuses}</p>
        <p className="route-status">
          Status:{" "}
          <span className={`status ${routeInfo.status}`}>
            {routeInfo.status}
          </span>
        </p>
      </header>

      <div className="route-info">
        <div className="route-time">
          <p>
            <strong>Pickup Time:</strong> {routeInfo.pickupTime}
          </p>
          <p>
            <strong>Drop Time:</strong> {routeInfo.dropTime}
          </p>
        </div>

        <div className="bus-stops">
          <h3>Bus Stops:</h3>
          <ul>
            {routeInfo.stops.map((stop, index) => (
              <li key={index}>{stop}</li>
            ))}
          </ul>
        </div>

        <div className="assigned-buses">
          <h3>Assigned Buses:</h3>
          {assignedBuses.length > 0 ? (
            <ul>
              {assignedBuses.map((bus) => (
                <li key={bus.id}>
                  {bus.name} (Driver: {bus.driverName || "Unassigned"})
                </li>
              ))}
            </ul>
          ) : (
            <p>No buses assigned to this route.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusRouteDetails;
