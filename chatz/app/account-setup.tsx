import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUser, updateUser,saveUser as saveUserApi } from "@/util/api";
import { saveUser } from "@/util/storage";

// Base API URL - uses Expo config if available, falls back to local development server
const API_URL =
  Constants.expoConfig?.extra?.API_URL || "http://192.168.43.249:5000/api";

export default function AccountSetupScreen() {
  // State management for user profile data
  const [profileImage, setProfileImage] = useState(""); // Stores the profile image URI
  const [name, setName] = useState(""); // Stores user's name
  const [id, setId] = useState(""); // Stores user ID for updates
  const { phone } = useLocalSearchParams(); // Gets phone number from navigation params
  const [loading, setLoading] = useState(false); // Loading state for API calls

  const router = useRouter(); // Navigation router instance

  // Fetches user data from API when component mounts
  const loadUser = async () => {
    try {
      const data = await fetchUser(phone)
      if (data) {
        setName(data.name || ""); // Sets name from response
        setId(data._id); // Sets user ID
        setProfileImage(data.profileImage || null); // Sets profile image if exists
      }
    } catch (error) {
      console.log("User not found", error); // Logs error if user doesn't exist
    }
  };

  // Handles image selection from device gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // Restricts to only images
      allowsEditing: true, // Allows image cropping
      aspect: [4, 3], // Aspect ratio for cropping
      quality: 1, // Maximum image quality
    });

    // If user didn't cancel selection
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Sets the selected image URI
    }
  };

  // Saves profile data to backend
  const saveProfile = async () => {
    // Validates name field
    if (!name.trim()) {
      Alert.alert("Name required");
      return;
    }

    try {
      // Creates FormData for multipart upload (supports image)
      const formData = new FormData();
      formData.append("phone", phone as string);
      formData.append("name", name);

      // Only append image if it's a local file URI
      if (profileImage && profileImage.startsWith("file://")) {
        formData.append("profileImage", {
          uri: profileImage,
          type: "image/jpeg",
          name: "profile.jpeg",
        } as any);
      }

      setLoading(true); // Starts loading indicator

      let response;
      // Determines if this is an update or create operation
      if (id) {
        // Update existing user
        response = await updateUser(formData,id)
      } else {
        // Create new user
        response = await saveUserApi(formData,id)
      }

      // On successful response
      if (response) {
        // Save user data to local storage
        await saveUser(response)
        // Navigate to chats screen
        router.push("/chats");
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (error) {
      console.log("Error saving profile", error); // Logs any errors
    } finally {
      setLoading(false); // Stops loading indicator
    }
  };

  // Effect hook for component lifecycle events
  useEffect(() => {
    loadUser(); // Fetch user data on component mount

    // Handles Android hardware back button press
    const handleBackPress = () => {
      router.replace("/"); // Navigates to home screen
      return true; // Prevents default back behavior
    };

    // Adds event listener for back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    // Cleanup function - removes event listener
    return () => backHandler.remove();
  }, []); // Empty dependency array means this runs once on mount

  // Shows loading indicator while API calls are in progress
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#eab308" // Tailwind's yellow-500 color
        className="flex-1 justify-center"
      />
    );
  }

  // Main component render
  return (
    <View className="flex-1 bg-white p-6 justify-center">
      {/* Screen title */}
      <Text className="text-2xl font-bold text-center mb-8">
        Complete Your Profile
      </Text>

      {/* Profile picture upload section */}
      <View className="items-center mb-8">
        <TouchableOpacity
          onPress={pickImage}
          style={{ width: 175, height: 175 }}
          className="rounded-full bg-gray-100 items-center justify-center border-2 border-yellow-500"
        >
          {/* Shows selected image or placeholder */}
          {profileImage && profileImage !== "null" ? (
            <Image
              source={{ uri: profileImage }}
              className="w-full h-full rounded-full"
            />
          ) : (
            <View className="items-center p-4">
              <Text className="text-gray-400 text-center">
                Tap to upload photo
              </Text>
              <Text className="text-yellow-500 text-4xl mt-1">+</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Name input field */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Full Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName} // Updates name state on change
          autoCapitalize="words" // Capitalizes first letter of each word
        />
      </View>

      {/* Save button */}
      <TouchableOpacity
        onPress={saveProfile}
        className="bg-yellow-500 py-4 rounded-lg items-center opacity-100"
      >
        <Text className="text-yellow-950 font-bold text-lg">
          Save & Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}