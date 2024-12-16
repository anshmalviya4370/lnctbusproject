import axios from "axios";

// Base URL for JSONBin
const baseURL = "https://api.jsonbin.io/v3/b/67600b41acd3cb34a8ba7176";

// API Key (replace with your actual key for private bins, if required)
const apiKey = "YOUR_API_KEY"; // Omit if your bin is public

// Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "X-Master-Key": apiKey, // Add if bin requires authentication
  },
});

// Function to fetch data (GET)
export const fetchData = async () => {
  try {
    const response = await axiosInstance.get();
    console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to create data (POST)
export const createData = async (newData) => {
  try {
    const response = await axiosInstance.post("/", newData);
    console.log("Data created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

// Function to update data (PUT)
export const updateData = async (data) => {
  try {
    const API_KEY = "your_jsonbin_api_key"; // Replace with your actual API key
    const BIN_ID = "675d4866e41b4d34e46539a1"; // Replace with your bin ID

    const response = await axios.put(
      `https://api.jsonbin.io/v3/b/${BIN_ID}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          // Include the API key in the header
        },
      }
    );

    return response.data; // Return the response from the API
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Rethrow the error for handling in the caller
  }
};

// Function to delete data (DELETE)
export const deleteData = async () => {
  try {
    const response = await axiosInstance.delete();
    console.log("Data deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
