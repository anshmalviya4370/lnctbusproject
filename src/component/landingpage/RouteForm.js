import { Link } from "react-router-dom";
import { useState } from "react";
import "./css/form.css";

const BusRouteForm = () => {
  const [selectedRoute, setSelectedRoute] = useState("");

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
  };

  return (
    <form className="landing-page-from">
      <label htmlFor="route">Choose Route:</label>
      <select
        id="route"
        name="route"
        value={selectedRoute}
        onChange={handleRouteChange}
        required
      >
        <option value="">-- Select Route --</option>
        <option value="annandnagar">LNCT to Anand Nagar</option>
        <option value="indrapuri">LNCT to Indrapuri</option>
      </select>
      <br />
      {selectedRoute && (
        <Link to={`/bus-route?route=${selectedRoute}`}>
          <button className="landing-page-from-button " type="button">
            View Route
          </button>
        </Link>
      )}
    </form>
  );
};

export default BusRouteForm;
