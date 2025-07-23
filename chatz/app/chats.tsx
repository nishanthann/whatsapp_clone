import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router"; // For navigation
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { getUser } from "@/util/storage";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            // Clear AsyncStorage
            await AsyncStorage.removeItem("user");

            // Optional: Clear other items if needed
            // await AsyncStorage.multiRemove(["token", "settings"]);

            console.log("User logged out successfully");
            router.replace("/"); // Navigate to login screen
          } catch (error) {
            console.error("Logout failed:", error);
            // Optional: Show error to user
            Alert.alert("Error", "Failed to logout properly");
          }
        },
      },
    ]);
  };

  const getUserData = async () => {
    const userdata = await getUser();
    console.log(userdata, "USERDATA");
  };

  useEffect(() => {
    getUserData();
  });

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#ff4444",
          padding: 15,
          borderRadius: 8,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
