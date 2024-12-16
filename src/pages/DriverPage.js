import React, { useState } from "react";

const DriverPage = () => {
  // assigned route and bus
  const [route] = useState("Annandnagar");
  const [bus] = useState("Bus 2002");

  //rating
  const [crowdRating, setCrowdRating] = useState("");

  //  handle crowd rating
  const rateCrowd = (rating) => {
    setCrowdRating(rating);
  };

  return (
    <div className="driver">
      <div className="container">
        <div className="assigned-info">
          <h2>Your Assigned Route:</h2>
          <p>
            Route: <span>{route}</span>
          </p>
          <p>
            Bus: <span>{bus}</span>
          </p>
        </div>

        <div className="crowd-rating">
          <h2>Rate the Crowd on Your Route:</h2>
          <div className="rating">
            <button
              className={`rating-btn green ${
                crowdRating === "green" ? "active" : ""
              }`}
              onClick={() => rateCrowd("green")}
            >
              Green
            </button>
            <button
              className={`rating-btn orange ${
                crowdRating === "orange" ? "active" : ""
              }`}
              onClick={() => rateCrowd("orange")}
            >
              Orange
            </button>
            <button
              className={`rating-btn red ${
                crowdRating === "red" ? "active" : ""
              }`}
              onClick={() => rateCrowd("red")}
            >
              Red
            </button>
          </div>
          {crowdRating && (
            <p>
              Your Crowd Rating: <strong>{crowdRating}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverPage;
