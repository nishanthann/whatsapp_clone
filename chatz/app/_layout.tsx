import { Stack } from "expo-router";
import "../global.css"

export default function RootLayout() {
  return <Stack screenOptions={{
        headerShown: false,  // Hide the header for all screens
      }}/>;
}
