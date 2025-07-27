
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ color, size,focused  }) => {
          let iconName:keyof typeof Ionicons.glyphMap;

          // Choose icon based on route name
          if (route.name === 'chats') {
            iconName = 'chatbubble-ellipses';
          } else if (route.name === 'calls') {
            iconName = 'call';
          } else if (route.name === 'updates') {
            iconName = 'sync';
          } else if (route.name === 'community') {
            iconName = 'people';
          }else {
            // fallback value to prevent error
            iconName = 'ellipse';
          }
          const iconColor = focused ? '#EAB308' : 'gray';
          

          return (
        <View className=''> 
          <Ionicons name={iconName} size={ size + 5}  color={iconColor} />
        </View>
      );
    },
    // Optional: Set active and inactive tint colors for the whole tab bar
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
    tabBarLabelStyle: {
      fontSize: 14, // default is around 10–12
      fontWeight: '600', // optional: make it semi-bold
    }

  })}
>
     <Tabs.Screen 
  name="chats" 
  options={{ 
    title: 'ChatZ !', // Header title text
    tabBarLabel: 'Chats', // Bottom tab label (unchanged)
    headerTitleStyle: {
      fontSize: 38, // Larger size for Chatz! only
      fontWeight: 'bold', // Optional: Add boldness
      color: '#B45309'
    },
    headerStyle: {
      height: 120, // Set custom height (default is ~56-64px)
      backgroundColor: 'white', // Optional: Change background
    },headerRight: () => (
      <View style={{ flexDirection: 'row', marginRight: 15 }}>
        <Ionicons 
        name="camera-outline" 
        size={27} 
        color="black" 
        style={{ marginRight: 15 }}
      />
        <Ionicons 
          name="search" 
          size={27} 
          color="black" 
          style={{ marginRight: 20 }} 
        />
        <Ionicons 
          name="ellipsis-vertical" 
          size={24} 
          color="black" 
        />
      </View>
    ),
  }} 
/>


      <Tabs.Screen name="updates" options={{ title: 'Updates',headerStyle: {
      height: 120, // Set custom height (default is ~56-64px)
      backgroundColor: 'white', // Optional: Change background
    } , headerTitleStyle: {
      fontSize: 28, // Larger size for Chatz! only
      fontWeight: 'normal', // Optional: Add boldness
      color: 'black'
    }}} />
      <Tabs.Screen name="community" options={{ title: 'Community',headerStyle: {
      height: 120, // Set custom height (default is ~56-64px)
      backgroundColor: 'white', // Optional: Change background
    } , headerTitleStyle: {
      fontSize: 28, // Larger size for Chatz! only
      fontWeight: 'normal', // Optional: Add boldness
      color: 'black'
    } }} />
      <Tabs.Screen name="calls" options={{ title: 'Calls',headerStyle: {
      height: 120, // Set custom height (default is ~56-64px)
      backgroundColor: 'white', // Optional: Change background
    } , headerTitleStyle: {
      fontSize: 28, // Larger size for Chatz! only
      fontWeight: 'normal', // Optional: Add boldness
      color: 'black'
    } }} />

    </Tabs>
  );
}
