import { getUser } from "@/util/storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 🔁 Runs on first load to check if user is already logged in
  const redirectUser = async () => {
    try {
      setLoading(true); // Show loading spinner
      const user = await getUser(); // ⬅️ Tries to get saved user from AsyncStorage

      if (user) {
        // ✅ User found, navigate to chat screen
        router.replace("/chats");
      } else {
        // ❌ No user found, stay on welcome screen
        console.log("No user in storage");
      }
    } catch (error) {
      console.log("Error redirecting user", error);
    } finally {
      setLoading(false); // Remove loading spinner either way
    }
  };

  // 🟡 IMPORTANT: Add [] so this only runs once
  useEffect(() => {
    redirectUser();
  }, []); // ✅ Without this, it would re-run on every render (infinite loop)

  // ⏳ Show loading spinner while checking user
  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#eab308" />
      </View>
    );

  // 👋 Main Welcome Screen
  return (
    <View className="bg-white flex-1 items-center justify-center">
      {/* Logo */}
      <Image
        className="rounded-md"
        style={{ width: 135, height: 135 }}
        source={require("../assets/images/whats3.png")}
      />

      {/* App Title */}
      <Text className="text-yellow-800 mt-3 text-3xl font-bold">
        Welcome to Chatz!
      </Text>

      {/* Privacy Info */}
      <View className="mt-25 flex items-center mt-10">
        <Text className="text-gray-500 text-sm text-center">
          By using this app, you agree to our{" "}
          <Text className="text-yellow-600 underline">Privacy Policy</Text> and{" "}
          <Text className="text-yellow-600 underline">Terms of Service</Text>.
        </Text>
        <Text className="text-gray-400 text-xs mt-2">
          © 2025 Chatz Inc. All rights reserved.
        </Text>
      </View>

      {/* Agree Button */}
      <View className="mt-6 w-full items-center px-6">
        <TouchableOpacity
          className="bg-yellow-500 px-6 py-3 rounded-full w-full items-center"
          onPress={() => {
            router.push("/login"); // ➡️ Go to login
          }}
        >
          <Text className="text-yellow-900 text-base font-semibold">
            Agree & Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
