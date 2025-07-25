 import axios from "axios";
 import Constants from "expo-constants";
 
 
 const API_URL =
  Constants.expoConfig?.extra?.API_URL || "http://192.168.47.7:5000/api";

 
 // Fetches user data from API when component mounts
  export const fetchUser = async (phone: any) => {
    try {
      const response = await axios.get(`${API_URL}/users/${phone}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null; // Explicitly return null for better error handling
    }
  };

  // update user data from API when component mounts
  export const updateUser = async (formData:any,id:any) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      return response.data 
    
    } catch (error) {
      console.log("Update api failed", error); // Logs error if user doesn't exist
    }
  };
   // update user data from API when component mounts
  export const saveUser = async (formData:any,id:any) => {
    try {
      const response = await axios.post(`${API_URL}/users/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      return response.data 
    
    } catch (error) {
      console.log("Saving api failed", error); // Logs error if user doesn't exist
    }
  };