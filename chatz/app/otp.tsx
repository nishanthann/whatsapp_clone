import { View, Text, TextInput, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function OtpScreen() {
  const [userEnteredOtp, setUserEnteredOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [error,setError]=useState("")
  const { phone } = useLocalSearchParams();
 const router=useRouter()
 
  const resendOtp=()=>{
    generateRandomOtp()
    setCountdown(30)
    setError('')
  }


  const generateRandomOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    console.log("Generated OTP:", randomOtp);
  };

  useEffect(() => {
    generateRandomOtp();
    const interval= setInterval(()=>{setCountdown((prev)=> prev> 0 ? prev- 1 :0)},1000)
    return ()=>clearInterval(interval)
  }, []);

  const handleVerify = () => {
  // Clear previous errors
  setError("");

  // Validation checks
  if (userEnteredOtp.length !== 6) {
    setError("OTP must be 6 digits");
    return; // Exit early
  }

  if (userEnteredOtp !== generatedOtp) {
    setError("Incorrect OTP, please try again");
    return; // Exit early
  }

  // Only reaches here if OTP is valid
  console.log("OTP Verified Successfully!");
  router.push({ pathname: "/account-setup", params: { phone } });
};

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-yellow-700 text-2xl font-semibold mb-4">
        Enter verification code
      </Text>

      <Text className="text-gray-500 mb-6">
        We’ve sent a 6-digit code to your {phone}(Type this {generatedOtp}).
      </Text>

      <TextInput
        className="border border-yellow-500 rounded-xl text-center text-2xl tracking-[30px] py-3 mb-6"
        placeholder="______"
        placeholderTextColor="gray"
        keyboardType="number-pad"
        maxLength={6}
        value={userEnteredOtp}
        onChangeText={setUserEnteredOtp}
      />

      {/* error messages */}
      {error ? <Text className="text-red-500 text-center text-sm -mt-3 px-3 py-2  rounded-lg">{error}</Text>:null}


      <TouchableOpacity
        className="bg-yellow-500 rounded-xl py-3 items-center"
        onPress={handleVerify}
      >
        <Text className="text-white text-base font-semibold">Verify</Text>
      </TouchableOpacity>

      
      {/* resend otp */}
      <Text className="text-gray-400 text-sm text-center mt-6">
        Didn’t receive a code?{" "}
        <TouchableOpacity 
        disabled={countdown>0}
        onPress={resendOtp}><Text className="text-yellow-700 underline">
          {countdown>0 ? `Resend OTP in ${countdown}sec` : "Resend"}</Text></TouchableOpacity>
      </Text>
    </View>
  );
}