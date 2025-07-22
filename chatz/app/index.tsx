import { useRouter } from "expo-router";
import { Text, View,Image,TouchableOpacity } from "react-native";

export default function Index() {

  const router=useRouter();


  return (
    <View className="bg-white  flex-1 items-center justify-center">
      <Image  className="rounded-md"
  style={{ width: 135, height: 135 }} source={require("../assets/images/whats2.png")}/>
      <Text className="text-yellow-800 mt-3 text-3xl font-bold">Welcome to Chatz!</Text>


      <View className="mt-25 flex items-center mt-10">
      <Text className="text-gray-500 text-sm text-center">
        By using this app, you agree to our{" "}
        <Text className="text-yellow-600 underline">Privacy Policy</Text> and{" "}
        <Text className="text-yellow-600 underline">Terms of Service</Text>.
      </Text>
      <Text className="text-gray-400 text-xs mt-2">© 2025 Chatz Inc. All rights reserved.</Text>
      </View>

       <View className="mt-6 w-full items-center px-6">
      <TouchableOpacity className="bg-yellow-500 px-6 py-3 rounded-full w-full items-center" onPress={()=>{router.push("/login")}}>
        <Text className="text-yellow-900 text-base font-semibold">Agree & Continue</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}
