import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import Constants from "expo-constants"
import { useLocalSearchParams } from "expo-router";


const API_URL=Constants.expoConfig?.extra?.API_URL || "http://192.168.43.249:5000";

export default function AccountsetupScreen() {
     const profileImage=""
     const [name, setName] = useState("");
     const { phone } = useLocalSearchParams();

     const fetchUser=async () => {
        try {
            const response=await axios.get(`${API_URL}/users/${phone}`)
            if(response.data){
                setName(response.data.name||"")
            }
        } catch (error) {
            console.log("User not found");
        }
     }

     useEffect(()=>{
        fetchUser();
     },[])

  return (
     <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-2xl font-bold text-center mb-8">Complete Your Profile</Text>
      
      {/* Profile Picture Upload */}
      <View className="items-center mb-8">
        <TouchableOpacity 
          style={{ width: 175, height: 175 }}
          className=" rounded-full bg-gray-100 items-center justify-center border-2 border-dashed border-yellow-500"
        >
          {profileImage ? (
            <Image 
              source={{ uri: profileImage }} 
              className="w-full h-full rounded-full" 
            />
          ) : (
            <View className="items-center p-4">
              <Text className="text-gray-400 text-center">Tap to upload photo</Text>
              <Text className="text-yellow-500 text-4xl mt-1">+</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Name Input Field */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Full Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          
          autoCapitalize="words"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-yellow-500 py-4 rounded-lg items-center opacity-70"
       
      >
        <Text className="text-yellow-950 font-bold text-lg">
          Save & Continue
        </Text>
      </TouchableOpacity>
    </View>
  )
}