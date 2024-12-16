import React from "react";
import "./pagecss/Profile.css";
import logo from "./images/icons8-user-50.png";
import { Link } from "react-router-dom";

// This is a placeholder for the user data.
// In a real app, you would fetch this from a server or use context to track the current user's role.
const user = {
  role: "admin", // "admin" or "driver"
  profilePicture: { logo }, // Placeholder image
};

const Profile = () => {
  const { name, email, role, profilePicture } = user;

  return (
    <div className="profile-container">
      <div className="profile-header">
        {/* Profile Photo with Hover Effect */}
        <div className="profile-photo-wrapper">
          <img src={logo} alt="Profile" className="profile-photo" />
          <div className="profile-options">
            {role === "admin" ? (
              <div className="admin-options">
                <button>
                  <Link to="/admin-dashboard"> admin dashboard</Link>
                </button>
                <button>
                  <Link to="/login">Login </Link>
                </button>
                <button>
                  <Link to="/driver">Driver Page </Link>
                </button>
                <button>
                  <Link to="/BusDetails">BusDetails</Link>
                </button>
              </div>
            ) : role === "driver" ? (
              <div className="driver-options">
                <button>View Assigned Routes</button>
                <button>Rate Crowd</button>
                <button>Submit Feedback</button>
              </div>
            ) : (
              <p>Unknown role</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
