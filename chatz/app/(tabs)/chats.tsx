import { View, Text, TouchableOpacity,  ScrollView,FlatList ,Image,StyleSheet,Alert } from "react-native";
import { useRouter } from "expo-router"; // For navigation
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect,useState } from "react";
import { getUser, } from "@/util/storage";
import { FontAwesome } from '@expo/vector-icons';
import { fetchChats } from "@/util/api";

export default function HomeScreen() {
  const[chats,serChats]=useState([])
  const [selected, setSelected] = useState('All');
  const[user,setUser]=useState(null)
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
    setUser(userdata)
    console.log(userdata, "USERDATA");
  };

  useEffect(() => {
    getUserData();
  },[]);

const loadChats = async () => {
  if (user?._id) return; // guard clause

  const response = await fetchChats(user._id);
  serChats(response);
  console.log(response, "hi");
};

useEffect(() => {
  if (user?._id) return;  // if user._id doesn't exist, don't load chats
  loadChats();
}, [user]);
  



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
    <View className="flex-1  pt-2">
     <MyFlatList data={chats} user={user} />
     </View>
    {/* Logout Button */}
    <View>
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
    </View>


  </View>
);

}



//   {
//     id: '1',
//     name: 'Amit Sharma',
//     lastMessage: 'Hey! What’s up?',
//     time: '9:30 AM',
//     avatar: 'https://i.pravatar.cc/150?img=1',
//      unreadCount: 2,
//   },
//   {
//     id: '2',
//     name: 'Neha Raj',
//     lastMessage: 'Call me when you’re free.',
//     time: 'Yesterday',
//     avatar: 'https://i.pravatar.cc/150?img=2',
//      unreadCount: 2,
//   },
//   {
//     id: '3',
//     name: 'Family Group',
//     lastMessage: 'Dinner at 8 PM?',
//     time: 'Monday',
//     avatar: 'https://i.pravatar.cc/150?img=3',
//      unreadCount: 1,
//   },
//   {
//     id: '4',
//     name: '+9475856541',
//     lastMessage: 'Got the files, thanks!',
//     time: 'Sunday',
//     avatar: 'https://i.pravatar.cc/150?img=4',
//      unreadCount: 0,
//   },{
//     id: '5',
//     name: 'College Friends',
//     lastMessage: 'Check out these old pics!',
//     time: '11:45 AM',
//     avatar: 'https://i.pravatar.cc/150?img=5',
//     unreadCount: 51,
//   },
//   {
//     id: '6',
//     name: 'Work Group',
//     lastMessage: 'Meeting moved to 3 PM.',
//     time: 'Today',
//     avatar: 'https://i.pravatar.cc/150?img=6',
//     unreadCount: 0,
//   },
//   {
//     id: '7',
//     name: 'Sana Khan',
//     lastMessage: 'I’m at the café.',
//     time: '8:15 AM',
//     avatar: 'https://i.pravatar.cc/150?img=7',
//     unreadCount: 0,
//   },
//   {
//     id: '8',
//     name: 'Ankit Joshi',
//     lastMessage: 'Let’s play tonight!',
//     time: 'Yesterday',
//     avatar: 'https://i.pravatar.cc/150?img=8',
//     unreadCount: 0,
//   },
//   {
//     id: '9',
//     name: 'Gym Buddies',
//     lastMessage: 'Leg day tomorrow 💪',
//     time: 'Monday',
//     avatar: 'https://i.pravatar.cc/150?img=9',
//     unreadCount: 0,
//   },
//   {
//     id: '10',
//     name: 'Maya Rao',
//     lastMessage: 'Happy Birthday! 🎉',
//     time: '2 days ago',
//     avatar: 'https://i.pravatar.cc/150?img=10',
//     unreadCount: 0,
//   },
//   {
//     id: '11',
//     name: 'Book Club',
//     lastMessage: 'Next book: The Alchemist',
//     time: 'Last Week',
//     avatar: 'https://i.pravatar.cc/150?img=11',
//     unreadCount: 0,
//   },
//   {
//     id: '12',
//     name: 'Kabir Mehta',
//     lastMessage: 'See you soon!',
//     time: '1 min ago',
//     avatar: 'https://i.pravatar.cc/150?img=12',
//     unreadCount: 0,
//   },
// ];

function MyFlatList({data,user}) {


  const formatConvo =(conv)=>{
  const otherParticipants= conv && conv.participants.find(u=>u._id !==user._id)
  console.log("Profile Image Path:", otherParticipants?.profileImage);
  return{
    ...conv,
    name:otherParticipants?.phone,
    lastMessage:conv?.lastMessage,
    time: new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    avatar: otherParticipants?.profileImage 
      ? `http://192.168.47.7:5000${otherParticipants.profileImage}` 
      : 'https://i.pravatar.cc/150',
    unreadCount: conv.unreadCounts?.[user._id] || 0,
  }
}
const formattedChats=data.map(chat=>formatConvo(chat))
  return (
    <FlatList
  data={formattedChats}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.time}>{item.time}</Text>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
       <Text style={styles.lastMessage} numberOfLines={1}>
  {item.lastMessage?.text || ""}
</Text>
      </View>
    </TouchableOpacity>
  )}
   ListFooterComponent={() => (
    <View className="px-6 pb-10 mb-40 py-4 items-center justify-center bg-white">
      <Text className="text-sm font-medium text-gray-500 mb-1">Tap and hold for more options</Text>
      <View className="flex-row items-center space-x-2 mt-4">
        <FontAwesome name="lock" size={12} color="#9e9e9e" />
        <Text className="text-xs text-gray-400 ml-1">
          Your personal messages are 
        </Text>
         <Text className="text-xs font-bold text-yellow-600 ml-1">
           end-to-end encrypted
        </Text>
      </View>
    </View>
  )}
/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffde7', // very light yellow
    paddingTop: 10,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
    backgroundColor: '#fbc02d',
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  time: {
    fontSize: 14,
    color: '#616161', // yellow timestamp
  },
  lastMessage: {
    fontSize: 14,
    color: '#616161',
  },
  unreadBadge: {
  marginTop: 4,
  backgroundColor: '#fbc02d',
  borderRadius: 12,
  minWidth: 24,
  height: 24,
  paddingHorizontal: 6,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-end',
},
unreadText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 12,
},
});

// const dummyChats = [