import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const router= useRouter()
    const [phone, setPhone] = useState("");

    const isValidPhone =/^\+?\d{10,15}$/.test(phone);

  const handleNext = () => {
    if (!isValidPhone) {
      Alert.alert("Please enter a valid phone number.");
      return;
      // Handle navigation or validation
      
    } else {
      router.push({pathname:"/otp",params:{phone}})
    }
  };

  return (
 <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-yellow-700 text-2xl font-semibold mb-4">Enter your phone number</Text>

      <Text className="text-gray-500 text-base mb-6">
        WhatsApp will send you an SMS message to verify your number.
      </Text>

      <TextInput
        className="border border-yellow-500 rounded-full px-4 py-3 text-lg mb-4"
        placeholder="e.g. +94 77 123 4567"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity
        className="bg-yellow-500 rounded-full py-3 items-center"
        onPress={handleNext}
      >
        <Text className="text-white text-base font-semibold">Next</Text>
      </TouchableOpacity>
    </View>
  )
}