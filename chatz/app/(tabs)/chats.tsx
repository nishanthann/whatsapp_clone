import { View, Text, TouchableOpacity,  ScrollView  } from "react-native";
// import { useRouter } from "expo-router"; // For navigation
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect,useState } from "react";
import { getUser } from "@/util/storage";

export default function HomeScreen() {
  const [selected, setSelected] = useState('All');
  // const router = useRouter();

  // const handleLogout = () => {
  //   Alert.alert("Logout", "Are you sure you want to logout?", [
  //     {
  //       text: "Cancel",
  //       style: "cancel",
  //     },
  //     {
  //       text: "Logout",
  //       onPress: async () => {
  //         try {
  //           // Clear AsyncStorage
  //           await AsyncStorage.removeItem("user");

  //           // Optional: Clear other items if needed
  //           // await AsyncStorage.multiRemove(["token", "settings"]);

  //           console.log("User logged out successfully");
  //           router.replace("/"); // Navigate to login screen
  //         } catch (error) {
  //           console.error("Logout failed:", error);
  //           // Optional: Show error to user
  //           Alert.alert("Error", "Failed to logout properly");
  //         }
  //       },
  //     },
  //   ]);
  // };

  const getUserData = async () => {
    const userdata = await getUser();
    console.log(userdata, "USERDATA");
  };

  useEffect(() => {
    getUserData();
  });



  const categories = ['All', 'unread', 'favorites', 'groups', '+'];

 const onPressCategory = (item:any) => {
    setSelected(item);
  };


  return (
  <View className=" h-full bg-white">
    {/* Category Tabs */}
    <View className="h-13 pt-3">
   <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-2"
          contentContainerStyle={{ flexDirection: 'row', gap: 8 }}
        >
          {categories.map((item, index) => {
            const isSelected = selected === item;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => onPressCategory(item)}
                className={`px-4 py-2 rounded-full border ${
                  isSelected
                    ? 'bg-yellow-200 border-gray-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                <Text
                  className={`font-bold text-md ${
                    isSelected ? 'text-gray-700' : 'text-gray-500'
                  }`}
                >
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
    </View>

    {/* Logout Button */}
    {/* <View>
    <TouchableOpacity
      onPress={handleLogout}
      style={{
        backgroundColor: "#ff4444",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
        marginHorizontal: 16,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
    </TouchableOpacity>
    </View> */}


  </View>
);

}


